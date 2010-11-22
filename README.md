# JS3 - An insane integration of RDF in ECMAScript-262 V5 (Javascript) #

In short, with this library, all your javascript is also RDF, there are no special types or classes,
each variable and value is also an RDF Node, List or Graph.

All values are both the standard javascript values you expect (no extension or suchlike), and are the RDF types you expect

## Example ##

This library doesn't inspect objects and then generate RDF, rather each value *is* RDF, and javascript:

    true.toNT();         // "true"^^<http://www.w3.org/2001/XMLSchema#boolean>
    (12 * 1.4).toNT();   // "12.3"^^<http://www.w3.org/2001/XMLSchema#decimal>
    
Here's a complicated yet simple example to illustrate, this is just a standard Object in js:

    var me = {
      a: 'foaf:Person',                                         // a String, a CURIE and a full IRI
      name: 'Nathan',                                           // a String, and an RDF Plain Literal
      age: new Date().getFullYear() - 1981,                     // a Number, and a Typed Literal with the type xsd:integer
      homepage: 'http://webr3.org',                             // a String, and an IRI, 
      holdsAccount: {                                           // an Object, with a BlankNode reference for the .id
        label: "Nathan's twitter account".l('en'),              // a String, and a Literal with a .language
        accountName: 'webr3',                                   // noticed that you don't need the prefixes yet?
        homepage: 'http://twitter.com/webr3'          
      },
      knows: bob,                                               // works with variables too of course
      nick: ['webr3','nath']                                    // an Array, also a list of values, like in turtle and n3
    }.ref(":me");                                               // still an Object, but also has a .id now, it's subject is set.

If we now call *me.n3()* we'll get the following output:

    <http://webr3.org/nathan#me> rdf:type foaf:Person;
      foaf:name "Nathan";
      foaf:age 29;
      foaf:homepage <http://webr3.org>;
      foaf:holdsAccount [
        rdfs:label "Nathan's twitter account"@en;
        foaf:accountName "webr3";
        foaf:homepage <http://twitter.com/webr3> ];
      foaf:knows <http://example.com/bob#me>;
      foaf:nick "webr3", "nath" .

It's just that simple, your javascript is your RDF, it's just plain old javascript:

    me.gender = "male";                   // .gender will resolve to foaf:gender to http://xmlns.com/foaf/0.1/gender 
    if(me.age > 18) return true;          // it's all native values, just use like normal!

### Implementation Notice ###

This library requires ECMAScript-262 V5, specifically it makes heavy usage of Object.defineProperties.

You can check the [compatibility chart](http://kangax.github.com/es5-compat-table/) to see if your platform / browser supports it.
The short version is that chrome 5+, ff4, webkit (safari) and ie9 all support this script, and on the server side node.js, rhino and besen are all fine.

Objects and values are not modified in the usual manner and they are not converted in to different types, rather this library automagically redefines
the property descriptors on objects to allow each value to be both a native javascript value, and an RDF compatible value.

## Nodes & Values ##

All values of type string, number, boolean and date are also RDF Nodes, and are fully aligned (and compatible) with the Interfaces
from the RDFa API.

### Standard Methods ####
All of the basic js types (string, number, boolean and date) are augmented with the following methods:

*   **.nodeType()** - returns one of PlainLiteral, TypedLiteral, BlankNode or IRI
    
        true.nodeType();                  // TypedLiteral
        (12 * 1.4).nodeType();            // TypedLiteral
        new Date().nodeType();            // TypedLiteral
        "hello world".nodeType();         // PlainLiteral
        "_:b12".nodeType();               // BlankNode
        "foaf:name".nodeType();           // IRI
        "http://webr3.org/".nodeType();   // IRI
    
*   **.equals(other)** - returns boolean

    RDF type safe equality test.
    
        "hello" == "hello".l('en')        // true
        "hello".equals( "hello".l('en') ) // false

*   **.toNT()** - returns string

    Does what it says on the tin, returns the N-Triples formatted value.
    
        true.toNT();                      // "true"^^<http://www.w3.org/2001/XMLSchema#boolean>
        (12 * 1.4).toNT();                // "12.3"^^<http://www.w3.org/2001/XMLSchema#decimal>
        new Date().toNT();                // "2010-11-20T21:06:42Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>
        "hello world".toNT();             // "hello world"
        "hello world".l('en').toNT();     // "hello world"@en
        "_:b12".toNT();                   // _:b12
        "foaf:name".toNT();               // <http://xmlns.com/foaf/0.1/name>
        "http://webr3.org/".toNT();       // <http://webr3.org/>  

*   **.toCanonical()**

    Alias of .toNT(), RDFa API compatibility method.

*   **.n3()** returns string

    Returns the value formatted for N3/Turtle.

        true.n3();                        // true
        (12 * 1.4).n3();                  // 12.3
        new Date().n3();                  // "2010-11-20T21:06:42Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>
        "hello world".n3();               // "hello world"
        "hello world".l('en').n3();       // "hello world"@en
        "_:b12".n3();                     // _:b12
        "foaf:name".n3();                 // foaf:name
        "http://webr3.org/".n3();         // <http://webr3.org/> 


### String Methods ####
A string can represent any of the RDF Node types, PlainLiteral (+language), TypedLiteral, BlankNode or IRI.
In js3 string exposes the following methods (in addition to the standard methods outlined above):

*   **.l()** - returns this

    Set the language of a PlainLiteral - exposes the **.language** attribute after calling. (.language is non-enumerable, read-only)

        var s = "Hello World".l('en');                        
        s.language                        // 'en'
        s.nodeType();                     // PlainLiteral
        s.toNT();                         // "Hello World"@en
 
*   **.tl()** - returns this

    Set the type of a TypedLiteral - exposes the **.type** attribute after calling. (.type is non-enumerable, read-only)

        var s = "0FB7".tl('xsd:hexBinary');
        s.type                            // http://www.w3.org/2001/XMLSchema#hexBinary
        s.nodeType();                     // TypedLiteral
        s.toNT();                         // "0FB7"^^<http://www.w3.org/2001/XMLSchema#hexBinary>
        
    Note: this method also caters for the situations when you want a PlainLiteral to be an xsd:string, or an IRI to be a PlainLiteral
    
        var u = "http://webr3.org/";      // <http://webr3.org/>
        u.tl("rdf:PlainLiteral);          // "http://webr3.org/"
        
        var h = "hello";                  // "hello"
        "hello".tl('xsd:string');         // "hello"^^<http://www.w3.org/2001/XMLSchema#string>
 
*   **.resolve()** - returns string IRI

    Resolve a CURIE to a full IRI - note this is done automatically by .n3 and .toNT methods.

        "foaf:name".resolve()             // returns string "http://xmlns.com/foaf/0.1/name" with nodeType IRI

Remember, all javascript values and types remain unchanged, so it's entirely backwards compatible with all existing data, and will not modify any js values,
"Hello World".l('en') is still a String, properties like .language and .type are non-enumerable, so they won't show up in for loops or when you JSON.stringify
the values. You cannot implement this library in non v5 ecmascript by simply adding a .language property to the String object, that simply won't work.

### Numbers ####

js3 is fully aware of number types, it knows when a number is an integer, a double or a decimal.

    12 .toNT()                            // "12"^^<http://www.w3.org/2001/XMLSchema#integer>
    12.1 .toNT()                          // "12.1"^^<http://www.w3.org/2001/XMLSchema#decimal>
    1267.43233E32 .toNT()                 // "1.26743233e+35"^^<http://www.w3.org/2001/XMLSchema#double>

**Gotcha:** do note that you need to add a space between the number and the .method, or wrap the number in braces *(12.1).toNT()*,
since js expects any integer followed immediately by a period to be a decimal, like 12.145 - this only applies to hard coded in the source-code numbers, and not
those in variables or returned from functions, so generally isn't noticable, in the same way that you don't normally write 12.toString()!


## Arrays and Lists ##

JS3 uses arrays for both lists of objects in property-object chains { name: ['nathan','nath'] } and as rdf Lists.

You can determine whether an array is a list or not by inspecting the boolean property **.list** on any array. To specify that an array is a list you simply call .toList() on it.

### Array Methods and Properties ###

*   **.list** - boolean

    Boolean flag indicating whether an array is an RDF list. 
    
*   **.toList()** - returns this

    Specifies that an array is to be used as an RDF list, sets the .list property to true.

*   **.n3()** returns string

    Returns the value formatted for N3/Turtle.

        [1,2,3,4].n3()                        // 1, 2, 3, 4
        [1,2,3,4].toList().n3()               // ( 1 2 3 4 )
        
Note that there are no .toNT or .nodeType methods, or related, arrays and lists are not RDF Nodes.

## Objects and Descriptions ##

In js3 each Object is by default just an Object with a single additional method exposed **.ref()**. When you call this method the object is RDF enabled,
whereby it is set to denote the description of something - identified by a blanknode or an IRI - the keys (properties) are mapped to RDF Properties,
a **.id** attribute is exposed on the object, and four methods are also exposed: **.n3()**, **.toNT()**, **.using()** and **.graphify()**.

### The Basics ###
It's all really simple tbh, the properties on each object can either be:

- obj['http://xmlns.com/foaf/0.1/name'] - a full IRI
- obj['foaf:name'] - a normal CURIE
- obj.foaf$name - a more javascript friendly CURIE where the : is swapped for a $
- obj.name - a single property which maps up to a CURIE, which maps to an IRI

Each value can be a single value (of any type covered), or an array of values (which might be a list), or an object (which can be named with an IRI or a blanknode identifier).

And thus, just like normal javascript or JSON you can make an object structure as simple or as complicated as you like.

Objects can also have methods on them, and these are stripped from any output, so any existing object whether dumb or a full class with properties can be used.

They're just javascript objects with a .id set on them (non-enumerable and read-only), and where the properties are mapped to RDF properties. So, each object can be seen to describe one thing, one subject, the .id is the subject.
To set the .id all you do is call **.ref()** on the object, if you pass in a CURIE or an IRI as a param then that is set as the subject/.id, if you call .ref() with no argument then it is given a blanknode identifier as the .id.

The methods exposed after .ref'ing are also simple, .n3 dumps an n3 string of the object, .toNT dumps it out as ntriples, and .graphify gives you back an RDFGraph from the RDFa API, making it completely compatible and exposing all the functionality of my [rdfa-api](http://github.org/webr3/rdfa-api) library (and other compatible implementations of the RDFa API).

**.using()** is a bit more subtle, you can throw in the names of ontologies which properties your using come from, in order to provide an unambiguous mapping, for instance:

    var article = {
      description: "A dc11:, not dc:, description",
      label: "An rdfs:label"
    }.ref(':me').using('dc11','rdfs');

If you don't pass in any names, then they are mapped up on a first-hit-first-used basis. This is covered more in the section about *propertymap* and *curiemap*.

### Syntax, Variables and References ###

There is no special syntax, and variables + references are part of javascript, so they "just work". which means you can do things like this:

    article.maker = me;
    me.made = article;
    article.maker.knows = bob;     // the same as me.knows
    article.created = new Date();
    { a: 'foaf:Document', primaryTopicOf: article }.ref(':this').graphify().turtle();
    
Because we referenced article by value then it'll be in the output graph too, we could use article.id instead then it won't be included.

You can also have X many Objects with the same .id, then when you .graphify them they all get smashed together as one - which is nice.

As for migrating IRIs or renaming subjects, that's as simple as calling .ref(':newid') on any object, no complex rdf replace routines needed.

### Data Structures ###
 
When Objects are nested, they are by default considered to be blanknodes, *however!*, you can of course call .ref() on them in place, and thus
describe things in context, and name them there too.

So in this case the object in holdsAccount will be a blanknode:

    var me = {
      name: 'Nathan',
      holdsAccount: {
        label: "Nathan's twitter account".l('en'),
        accountName: 'webr3',
        homepage: 'http://twitter.com/webr3'          
      },
    }.ref(":me");

But in this case it'll have it's own IRI:
    
    var me = {
      name: 'Nathan',
      holdsAccount: {
        label: "Nathan's twitter account".l('en'),
        accountName: 'webr3',
        homepage: 'http://twitter.com/webr3'          
      }.ref(':twitter'),                                        // here's where we named it
    }.ref(":me");

... of course we can code this however we want to get the same results, for example:

    var me = { name: 'Nathan' }.ref(":me");
    var account = { accountName: 'webr3' };
    account.label = "Nathan's twitter account";
    account.label.l('en');
    me.holdsAccount = account;
    me.holdsAccount.foaf$homepage = "twitter:webr3".resolve();
    me.holdsAccount.ref(':twitter');

... or create structures just as complex as we like:

    { deep: [
      "item1",
      [1, 2.745, [me,bob,"x:mary"].toList(), new Date(), bob].toList(),
      "something".substr(3,4).l('en'),
      [bob.id, me.id].toList(), { foo: "bar" }
    ]};

... and interact with our data however we want:

    var somedata = {
      values: [1,10,25,50].toList(),
      created: new Date()
    }.ref(':results'); 
    with(Math) {
      somedata.result = somedata.values.map(sqrt).reduce(function(p,c) { return max(p,c) });
    }

... and then call .n3():

    :results
      dc:created "2010-11-20T21:06:42Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>;
      seq:values ( 1 10 25 50 );
      seq:result 7.0710678118654755 .
      
It's all very flexible - as you can see as we just map reduced an RDF List and updated a graph in one line :)

### Object Methods and Properties - after .ref()'ing ###

*   **.id** - string (read-only, non-enumerable)

    BlankNode or IRI in a string, the subject / .id of this object. 
    
*   **.n3()** returns string

    Returns the object as N3/Turtle.

*   **.toNT()** returns string

    Returns the object as NTriples.

*   **.graphify()** - returns RDFGraph

    Returns the structure as an RDFGraph of RDFTriples as per the RDFa API core interfaces - compat++.

*   **.using(arg1, arg2 ... argN)** - returns this

    Pass in string prefixes for ontologies to consider when mapping simple properties.
    
    Do see the [wiki page on .using() js3.propertymap](https://github.com/webr3/js3/wiki/using-and-propertymap) for more details.


## js3.curiemap and js3.propertymap ##

**js3.curiemap** is a simple object which maps prefixes to IRIs.

*   to add a CURIE mapping:
    
        js3.curiemap.foaf = "http://xmlns.com/foaf/0.1/";
        
*   to get an IRI for a prefix:
    
        var iri = js3.curiemap.foaf;
        
*   **.setDefault(iri)** - to set the default prefix "**:**" :
    
        js3.curiemap.setDefault('http://webr3.org/nathan#');

*   **.getPrefix(iri)** - get the registered prefix for an IRI, returns null if no prefix is found:
    
        js3.curiemap.getPrefix('http://xmlns.com/foaf/0.1/'); // 'foaf'
        
*   **.shrink(iri)** - turn an IRI in to a CURIE :

    This method returns either a CURIE or the original IRI if no prefix is found.
    
        js3.curiemap.shrink('http://xmlns.com/foaf/0.1/name'); // 'foaf:name'
        

**js3.propertymap** is a simple object which makes the lib aware of properties in ontologies.

*   to add the properties for an ontology:
    
        js3.propertymap.foaf = ['name','mbox','page', ...];

note: the value must always be an array.

*   to get the properties for an ontology:
    
        var properties = js3.propertymap.foaf;
        
*   **.ambiguities()** - returns an array of ambiguous properties:
    
        var gotchas = js3.propertymap.ambiguities();

Do see the [wiki page on .using() js3.propertymap](https://github.com/webr3/js3/wiki/using-and-propertymap) for more details.

## js3.graphify() ##

A simple method which can accept any number of objects, or an array of objects, and will return back an RDFGraph.


# Coming Soon #

*   **IRI.deref( callback )**

    A web aware function that will get the description of a subject from the web (negotiating formats) and return back a js3 object to work with:
    
        "http://webr3.org/nathan#me".deref( function(me) {
          print( me.name ); // etc
        });
        
*   **Obj.save()**

    A web aware function that will PUT an updated description:
    
        "http://webr3.org/nathan#me".deref( function(me) {
          me.friends.push( "somebody:new );
          me.save();
        });
        
*   **Full rdfa-api integration**

    From the other side, so you can do graph.describe(subject) and get back an object, and suchlike.
    
Probably much more..

# Feedback #

All feedback, bugs etc via issues here, or, well you can get all my details from my FOAF profile using this lib if you like ;)
