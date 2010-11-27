/**
 * Basic HTTP
 */
(function(api) {
  api.get = function(iri, cback, async) {
    if(async == null) { async = true }
    var xhr = new api.XMLHttpRequest;
    xhr.onreadystatechange = function(e) {
      if(e.target.readyState == 4) {
        if(e.target.status == 200) cback(e.target);
      }
    };
    xhr.open("GET", iri, async);
    xhr.followRedirects = true;
    xhr.timeout = 40000;
    xhr.setRequestHeader("Accept", "application/rdf+xml;q=0.9, application/x-turtle;q=0.9, application/turtle;q=0.9, text/rdf+n3;q=0.9, text/turtle;q=0.9, text/rdf;q=0.9, application/n3;q=0.8, text/n3;q=0.8, application/xml;q=0.7, text/*;q=0.6, */*;q=0");
    xhr.send();
    return
  };
  api.parse = function(iri, cb, filter, graph) {
    api.get(iri, function(xhr) {
      api.parseTurtle(xhr.responseText, cb, filter, graph);
    });
  };
  api.load = function(iri,cb) {
    api.parse(iri, function(graph) {
      api.data.graph.merge(graph);
      api.data.objects = api.data.graph.objectify();
      cb();
    });
  };
  api.describe = function(thing) {
    return api.data.objects[thing.resolve()];
  };
})( js3 );
