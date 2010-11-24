/**
 * Core API implementing RDFa API interfaces
 */
js3 = (function(curiemap, propertymap) {
  api = { curiemap: curiemap, propertymap: propertymap };
  api.RDFTriple = function(s, p, o) { this.subject = s; this.property = p; this.object = o; };
  api.RDFTriple.prototype = {
    object: null, property: null, subject: null,
    toString: function() { return this.subject.toNT() + " " + this.property.toNT() + " " + this.object.toNT() + " ." },
    equals: function(t) { return this.subject.equals(t.subject) && this.property.equals(t.property) && this.object.equals(t.object) }
  };
  api.Graph = function(a) {
    this.length = 0;
    this.graph = [];
    this.index = {};
    if(Array.isArray(a)) this.importArray(a);
  };
  api.Graph.prototype = {
    length: null, graph: null,
    importArray: function(a) { while( a.length > 0) { this.add(a.pop()) } },
    get: function(index) { return this.graph[index] },
    add: function(triple) {
      if(!this.index[triple.subject.value]) this.index[triple.subject.value] = {};
      if(!this.index[triple.subject.value][triple.property.value]) this.index[triple.subject.value][triple.property.value] = [];
      if(this.index[triple.subject.value][triple.property.value].some(function(o){return o.equals(triple.object)})) return;
      this.length++;
      this.index[triple.subject.value][triple.property.value].push(triple.object);
      this.graph.push(triple);
    },
    merge: function(s) {
      var _g1 = 0, _g = s.length;
      while(_g1 < _g) {
        var i = _g1++;
        this.add(s.get(i))
      }
    },
    every: function(filter) { return this.graph.every(filter) },
    some: function(filter) { return this.graph.some(filter) },
    forEach: function(callbck) { this.graph.forEach(callbck) },
    filter: function(filter) { return new js3.Graph(this.graph.filter(filter)); },
    apply: function(filter) {
      var g = new api.Graph(this.graph.filter(filter));
      this.graph = g.graph;
      this.index = g.index;
      this.length = g.length;
    },
    toArray: function() { return this.graph.slice() }
  };
  return api;
})(curiemap, propertymap);
