(function(api) {
  api.loadEmbeds = function() {
    var i = 0, scripts = document.getElementsByTagName('script'), script;
    while(i < scripts.length) {
      script = scripts.item(i++);
      if(['text/turtle','application/turtle'].indexOf(script.type) > -1) {
        api.parseTurtle(script.text, function(graph) {
          api.data.graph.merge(graph);
        })
      }
    }
    api.data.objects = api.data.graph.objectify();
  };
  api.describe = function(thing) {
    return api.data.objects[thing.resolve()];
  };
  return api;
})( js3 );

document.data = js3.data;
document.js3 = js3;