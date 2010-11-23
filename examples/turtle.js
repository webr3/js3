var js3 = require('../js3.node');

js3.curiemap.setDefault('http://webr3.org/nathan#');

var bob = {
  a: 'foaf:Person',
  foaf$name: 'Bob'
}.ref('http://example.com/bob#me');

var me = {
  a: 'foaf:Person',
  name: 'Nathan',
  age: new Date().getFullYear() - 1981,
  homepage: 'http://webr3.org',
  holdsAccount: {     
    label: "Nathan's twitter account".l('en'),
    accountName: 'webr3',
    homepage: 'http://twitter.com/webr3'          
  },
  knows: bob,
  nick: ['webr3','nath']
}.ref(":me"); 

console.log(
   js3.turtle(me.graphify())
);

/* outputs:
@prefix : <http://webr3.org/nathan#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .

:me a foaf:Person;
  foaf:age 29;
  foaf:holdsAccount [ foaf:accountName "webr3";
      foaf:homepage <http://twitter.com/webr3>;
      rdfs:label "Nathan's twitter account"@en ];
  foaf:homepage <http://webr3.org>;
  foaf:knows <http://example.com/bob#me>;
  foaf:name "Nathan";
  foaf:nick "webr3", "nath" .

<http://example.com/bob#me> a foaf:Person;
  foaf:name "Bob" .
*/