# JS3 - An insane integration of RDF in ECMAScript-262 V5 (Javascript) #

In short, with this library, all your javascript is also RDF, there are no special types or classes,
each variable and value is also an RDF Node, List or Graph.

All values are both the standard javascript values you expect (no extension or suchlike), and are the RDF types you expect

## Example ##

Here's a complicated yet simple example to illustrate, this is just a standard Object in js:

    var me = {
      a: 'foaf:Person',                                         // a String, a CURIE and a full IRI
      name: 'Nathan',                                           // a String, and an RDF Plain Literal
      age: new Date().getFullYear() - 1981,                     // a Number, and a Typed Literal with the type xsd:integer
      homepage: 'http://webr3.org',                             // a String, and an IRI, 
      holdsAccount: {                                           // an Object, with a BlankNode reference for the .id
        label: 'Nathan's twitter account'.l('en'),              // a String, and a Literal with a .language
        accountName: 'webr3',                                   // noticed that you don't need the prefixes yet?
        accountProfilePage: 'http://twitter.com/webr3'          
      },
      knows: bob,                                               // works with variables too of course
      nick: ['webr3','nath']                                    // an Array, also a list of values, like in turtle and n3
    }.ref(":me");                                               // still an Object, but also has a .id now, it's subject is set.
    
That's just my prefered syntax for these things though, there's no limits, any javascript is also RDF:

    me.name = "Nathan".l('en');           // you can use the . notation to get or set (nothings different, honest)
    me.gender = "male";                   // .gender will resolve to foaf:gender to http://xmlns.com/foaf/0.1/gender 
    if(me.age > 18) return true;          // it's all native values, just use like normal!


## Literals & Values ##

All values of type string, number, boolean and date are also RDF Literals, and are fully aligned (and compatible) with the Interfaces
from the RDFa API.

### Standard Literal Methods ####
All of the js basic literal types (string, number, boolean and date) are augmented with the following methods:

*   **.nodeType()**
    returns one of PlainLiteral, TypedLiteral, BlankNode or IRI
    
        true.nodeType();                  // TypedLiteral
        (12 * 1.4).nodeType();            // TypedLiteral
        new Date().nodeType();            // TypedLiteral
        "hello world".nodeType();         // PlainLiteral
        "_:b12".nodeType();               // BlankNode
        "foaf:name".nodeType();           // IRI
        "http://webr3.org/".nodeType();   // IRI
    
*   **.equals(other)**
    RDF type safe equality test.
    
        "hello" == "hello".l('en')        // true
        "hello".equals( "hello".l('en') ) // false

*   **.toNT()**
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

*   **.n3()** 
    Returns the value formatted for N3/Turtle.

        true.n3();                        // true
        (12 * 1.4).n3();                  // 12.3
        new Date().n3();                  // "2010-11-20T21:06:42Z"^^<http://www.w3.org/2001/XMLSchema#dateTime>
        "hello world".n3();               // "hello world"
        "hello world".l('en').n3();       // "hello world"@en
        "_:b12".n3();                     // _:b12
        "foaf:name".n3();                 // foaf:name
        "http://webr3.org/".n3();         // <http://webr3.org/> 


If the nodeType is TypedLiteral, then the following property is also exposed:

- **.type** - returns a String (which has a nodeType of IRI) 




