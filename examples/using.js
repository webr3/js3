var js3 = require('../js3.node');

var article = {
  label: "rdfs: should work",
  title: "Something about using",
  description: "Just a little bit of text here",
}.ref();

with(console) {
  log( article.n3() );                  // dc:title, dc:description
  log( article.using('dc11').n3() );    // dc11:title, dc11:description
}