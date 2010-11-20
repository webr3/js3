# JS3 - An insane integration of RDF in ECMAScript-262 V5 (Javascript) #

In short, with this library, all your javascript is also RDF, there are no special types or classes,
each variable and value is also an RDF Node, List or Graph.

All values are both the standard javascript values you expect (no extension or suchlike), and are the RDF types you expect

== Example ==

Here's a complicated yet simple example to illustrate, this is just a standard Object in js:

    var me = {
      a: 'foaf:Person',                                         // a String, a CURIE and a full IRI
      name: 'Nathan',                                           // a String, and an RDF Plain Literal
      age: new Date().getFullYear() - 1981,                     // a Number, and a Typed Literal with the type xsd:integer
      homepage: 'http://webr3.org',                             // a String, and an IRI, 
      holdsAccount: {                                           // an Object, and a BlankNode
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

