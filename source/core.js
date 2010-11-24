/**
 * JS3 Core
 */
(function( js3 ) {
  var bn = 0;
  function _(v) { return { writable: false, configurable : false, enumerable: false, value: v }}
  function pad(n){ return n<10 ? '0'+n : n }
  function prop(p,l) {
    if(p == 'a') return 'rdf:type';
    p = p.replace('$',':');
    if(p.indexOf(':') == -1) p = propertymap.resolve(p,l);
    return p;
  };
  // N-Triples encoder
  js3.encodeString = encodeString = function(s) {
    var out = "";
    var skip = false;
    var _g1 = 0, _g = s.length;
    while(_g1 < _g) {
      var i = _g1++;
      if(!skip) {
        var code = s.charCodeAt(i);
        if(55296 <= code && code <= 56319) {
          var low = s.charCodeAt(i + 1);
          code = (code - 55296) * 1024 + (low - 56320) + 65536;
          skip = true
        }
        if(code > 1114111) { throw new Error("Char out of range"); }
        var hex = "00000000".concat((new Number(code)).toString(16).toUpperCase());
        if(code >= 65536) {
          out += "\\U" + hex.slice(-8)
        } else {
          if(code >= 127 || code <= 31) {
            switch(code) {
              case 9:  out += "\\t"; break;
              case 10: out += "\\n"; break;
              case 13: out += "\\r"; break;
              default: out += "\\u" + hex.slice(-4); break
            }
          } else {
            switch(code) {
              case 34: out += '\\"'; break;
              case 92: out += "\\\\"; break;
              default: out += s.charAt(i); break
            }
          }
        }
      } else {
        skip = !skip
      }
    }
    return out
  };
  // Let the magic begin
  Object.defineProperties( Object.prototype, {
    equals: _(function(other) {
      if( this.nodeType() != other.nodeType() ) return false;
      switch(this.nodeType()) {
        case "PlainLiteral":
          if((this.language && !other.language) || (!this.language && other.language)) return false;
          if(this.language && other.language) return this.language == other.language && this == other;
          return this == other;
        case "TypedLiteral":
          return this.type.equals(other.type) && this == other;
      }
      return this.toNT() == other.toNT()
    }),
    ref: _( function(id) {
      Object.defineProperties(this, {
        id: _( id ? id.resolve() : '_:b' +(++bn) ),
        n3: _( function(a) {
          var outs = [], o = this, map = o.aliasmap || a;
          Object.keys(this).forEach(function(p) {
            if(typeof o[p] == 'function') return;
            if(o[p].id && o[p].id.nodeType() == 'IRI') return outs.push( prop(p,map) + ' ' + o[p].id.n3() );
            if(!o[p].nodeType && !o[p].id) o[p].ref();
            outs.push( prop(p, map) + ' ' + o[p].n3(map) );
          });
          outs = outs.join(";\n  ");
          return id.nodeType() == 'IRI' ? this.id.n3() + ' ' + outs + ' .' : '[ ' + outs + ' ]';
        }),
        toNT: _( function(a) {
          return this.graphify(a).toArray().join("\n");
        }),
        graphify: _( function(a) {
          var graph = new js3.Graph, o = this, map = o.aliasmap || a;
          function graphify(s1,p1,o1) {
            if(typeof o1 == 'function') return;
            if(!o1.nodeType && !o1.id) o1.ref();
            if(o1.id) {
              graph.add( new js3.RDFTriple(s1, prop(p1,map), o1.id ) );
              graph.merge( o1.graphify() );
            } else if(!Array.isArray(o1)) {
              graph.add( new js3.RDFTriple(s1, prop(p1,map), o1 ) );
            } else if(Array.isArray(o1)) {
              if(!o1.list) {
                o1.forEach( function(i) { graphify(s1,p1,i) });
              } else {
                if(o1.length == 0) {
                  graph.add( new js3.RDFTriple(s1, prop(p1,map), "rdf:nil".resolve() ) );
                } else {
                  var b = {}.ref();
                  graph.add( new js3.RDFTriple(s1, prop(p1,map), b.id ) );
                  o1.forEach( function(i,x) {
                    graphify(b.id, 'rdf:first'.resolve(), i );
                    var n = {}.ref();
                    graph.add( new js3.RDFTriple(b.id, 'rdf:rest'.resolve(), (x == o1.length-1) ? 'rdf:nil'.resolve() : n.id ) );
                    b = n;
                  });
                }
              }
            }
          }
          Object.keys(this).forEach(function(p) { graphify(o.id, p, o[p]) });
          return graph;
        }),
        using: _( function() {
          Object.defineProperty(this,'aliasmap',_(Array.prototype.slice.call(arguments)));
          return this;
        }),
        alsoUsing: _( function() {
          if(!this.aliasmap) {
            Object.defineProperty(this,'aliasmap',_(Array.prototype.slice.call(arguments)));
          }
          var _$ = this;
          Array.prototype.slice.call(arguments).forEach(function(a) { _$.aliasmap.push(a) });
          return this;
        })
      });
      return this;
    }),
  });
  Object.defineProperties( String.prototype, {
    tl: _( function(t) {
      Object.defineProperty(this,'type', _(t.resolve()) );
      Object.defineProperty(this,'language', _(null) );
      return this;
    }),
    l: _( function(l) {
      Object.defineProperty(this,'type', _(null) );
      Object.defineProperty(this,'language', _(l) );
      return this;
    }),
    resolve: _( function() {
      return curiemap.resolve(this);
    }),
    value: { configurable : false, enumerable: false, get: function() { return this.nodeType() == 'IRI' ? this.resolve() : this; } },
    nodeType: _( function() { 
      if(this.type) return 'TypedLiteral';
      if(this.language || this.indexOf(' ') >= 0 || this.indexOf(':') == -1 ) return 'PlainLiteral';
      if(this.substr(0,2) == '_:') return 'BlankNode';
      return 'IRI';
    }),
    n3: _( function() {
      switch(this.nodeType()) {
        case 'PlainLiteral': return ('"' + encodeString(this) + '"' + ( this.language ? '@' + this.language : '')).toString(); 
        case 'IRI':
          return (this.resolve() == this) ? "<" + encodeString(this.resolve()) + ">" : this.toString();
        case 'BlankNode': return this.toString();
        case 'TypedLiteral':
          if(this.type.resolve() == "rdf:PlainLiteral".resolve()) return '"' + encodeString(this) + '"'; 
          return '"' + encodeString(this) + '"^^' + this.type.n3();
      }
    }),
    toNT: _( function() {
      switch(this.nodeType()) {
        case 'PlainLiteral': return ('"' + encodeString(this) + '"' + ( this.language ? '@' + this.language : '')).toString(); 
        case 'IRI': return "<" + encodeString(this.resolve()) + ">";
        case 'BlankNode': return this.toString();
        case 'TypedLiteral':
          if(this.type.resolve() == "rdf:PlainLiteral".resolve()) return '"' + encodeString(this) + '"'; 
          return '"' + encodeString(this) + '"^^' + this.type.n3();
      }
    }),
    toCanonical: _( function() { return this.n3() } )
  });
  Object.defineProperties( Array.prototype, {
    list: _(false),
    toList: _(function() {
      this.list = true;
      return this;
    }),
    nodeType: _("Collection"),
    n3: _( function(a) {
      var outs = [];
      this.forEach( function(i) {
        if(typeof i == 'function') return;
        if(i.id && i.id.nodeType() == 'IRI') return outs.push( i.id.n3() );
        if(!i.nodeType && !i.id) i.ref();
        outs.push(i.n3(a))
      });
      return this.list ? "( " + outs.join(" ") + " )" : outs.join(", ");
    }),
    remove: _(function(obj) {
      var idx = this.indexOf(obj);
      if(idx == -1) { return false }
      this.splice(idx, 1);
      return true
    })
  });
  Object.defineProperties( Boolean.prototype, {
    type: _( "xsd:boolean".resolve() ),
    value: { configurable : false, enumerable: false, get: function() { return this; } },
    nodeType: _( function() { return "TypedLiteral"} ),
    n3: _( function() { return this.valueOf() } ),
    toNT: _( function() { return '"' + this.valueOf() + '"' + "^^<" + this.type + '>' } ),
    toCanonical: _( function() { return this.toNT() } )
  });
  Object.defineProperties( Date.prototype, {
    type: _( "xsd:dateTime".resolve() ),
    value: { configurable : false, enumerable: false, get: function() { return this; } },
    nodeType: _( function() { return "TypedLiteral"} ),
    n3: _( function() {
      return '"' + this.getUTCFullYear()+'-' + pad(this.getUTCMonth()+1)+'-' + pad(this.getUTCDate())+'T'
      + pad(this.getUTCHours())+':' + pad(this.getUTCMinutes())+':' + pad(this.getUTCSeconds())+'Z"^^<' + this.type + '>';
    }),
    toNT: _( function() { return this.n3() } ),
    toCanonical: _( function() { return this.n3() } )
  });
  var INTEGER = new RegExp("^(-|\\+)?[0-9]+$", "");
  var DOUBLE = new RegExp("^(-|\\+)?(([0-9]+\\.[0-9]*[eE]{1}(-|\\+)?[0-9]+)|(\\.[0-9]+[eE]{1}(-|\\+)?[0-9]+)|([0-9]+[eE]{1}(-|\\+)?[0-9]+))$", "");
  var DECIMAL = new RegExp("^(-|\\+)?[0-9]*\\.[0-9]+?$", "");
  Object.defineProperties( Number.prototype, {
    type: {
      configurable : false, enumerable: false,
      get: function() {
        if(this == Number.POSITIVE_INFINITY) return 'xsd:double'.resolve();
        if(this == Number.NEGATIVE_INFINITY) return 'xsd:double'.resolve();
        if(this == Number.NaN) return 'xsd:double'.resolve();
        var n = this.toString();
        if(INTEGER.test(n)) return 'xsd:integer'.resolve();
        if(DECIMAL.test(n)) return 'xsd:decimal'.resolve();
        if(DOUBLE.test(n)) return 'xsd:double'.resolve();
      }
    },
    value: { configurable : false, enumerable: false, get: function() { return this; } },
    nodeType: _( function() { return "TypedLiteral" } ),
    n3: _( function() {
      if(this == Number.POSITIVE_INFINITY) return '"INF"^^<' + 'xsd:double'.resolve() + '>';
      if(this == Number.NEGATIVE_INFINITY) return '"-INF"^^<' + 'xsd:double'.resolve() + '>';
      if(this == Number.NaN) return '"NaN"^^<' + 'xsd:double'.resolve() + '>';
      return this.toString();
    }),
    toNT: _( function() {
      if(this == Number.POSITIVE_INFINITY) return '"INF"^^<' + 'xsd:double'.resolve() + '>';
      if(this == Number.NEGATIVE_INFINITY) return '"-INF"^^<' + 'xsd:double'.resolve() + '>';
      if(this == Number.NaN) return '"NaN"^^<' + 'xsd:double'.resolve() + '>';
      return '"' + this.toString() + '"' + "^^<" + this.type + '>';
    }),
    toCanonical: _( function() { return this.nt() } )
  });
  js3.graphify = function() {
    var a = Array.prototype.slice.call(arguments), gout = new js3.Graph;
    function graphify(o) {
      if(typeof o == 'object' && !o.nodeType) {
        if(!o.id) o.ref();
        gout.merge( o.graphify() );
      }
    };
    a.forEach( function(o) {
      if(Array.isArray(o)) o.forEach(function(x){graphify(x)});
      else graphify(o);
    });
    return gout;
  };
  js3.Graph.prototype.objectify = function() {
    var os = {}, _$ = this;
    var lists = {};
    function addRef(ref) {
      if(!os[ref.value]) os[ref.value] = {}.ref(ref.value);
      return os[ref.value];
    };
    function juggle(node) {
      switch( node.nodeType() ) {
        case 'BlankNode':
          return lists[node] ? lists[node].toList() : addRef(node);
      }
      if(node.equals('rdf:nil')) return [].toList();
      return node.value;
    }
    var remove = [];
    this.filter(js3.filters.o('rdf:nil')).forEach(function(t) {
      if(!t.property.equals('rdf:rest')) return;
      var l = [];
      while(true) {
        remove.push(t.subject);
        l.unshift( _$.filter(js3.filters.sp(t.subject,'rdf:first')).toArray().shift().object );
        var previous = _$.filter( js3.filters.po('rdf:rest',t.subject) );
        if(previous.length == 0) {
          lists[t.subject] = l.slice();
          return;
        }
        t = previous.toArray().shift();
      }
    });
    this.apply( function(t) { return remove.indexOf(t.subject) == -1; });
    this.forEach( function(t) {
      var s = addRef(t.subject.value), cp, p;
      p = js3.propertymap.shrink( cp = js3.curiemap.shrink(t.property.value) );
      s.alsoUsing(cp.substring(0,cp.indexOf(':')));
      if(!s[p]) {
        s[p] = juggle(t.object);
        return;
      }
      if(!Array.isArray(s[p])) s[p] = [s[p]]; 
      s[p].push( juggle(t.object) );
    });
    return os;
  };
  return js3;
})( js3 );
