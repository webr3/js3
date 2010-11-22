rdfapi = (function(api) {
  /**
   * Hash (fast kv hash)
   */
  api.Hash = function(p) { this.empty() };
  api.Hash.prototype = {
    h: null,
    get: function(k) { return this.h[k] },
    set: function(k, v) { this.h[k] = v },
    empty: function() { this.h = {} },
    exists: function(k) { return this.h.hasOwnProperty(k) },
    keys: function(proto) {
      var keys = [];
      proto = !proto;
      for(var i in this.h) {
        if(proto && Object.prototype[i]) { continue }
        keys.push(i)
      }
      return keys
    },
    remove: function(k) {
      var r = this.get(k);
      delete this.h[k];
      return r
    },
    toArray: function() {
      var a = new Array;
      var _ = this;
      this.keys().forEach(function(k) { a.push(_.get(k)) });
      return a
    },
    toString: function() { return JSON.stringify(this.h) }
  };
  /**
   * IRI
   */
  api.IRI = function(iri) { this.value = iri };
  api.IRI.SCHEME_MATCH = new RegExp("^[a-z0-9-.+]+:", "i");
  api.IRI.prototype = {
    nodeType: function() { return "IRI" },
    toNT: function() { return this.value.toNT() },
    defrag: function() {
      var i = this.value.indexOf("#");
      return (i < 0) ? this : new api.IRI(this.value.slice(0, i))
    },
    isAbsolute: function() {
      return this.scheme() != null && this.heirpart() != null && this.fragment() == null
    },
    toAbsolute: function() {
      if(this.scheme() == null && this.heirpart() == null) { throw new Error("IRI must have a scheme and a heirpart!"); }
      return this.resolveReference(this.value).defrag()
    },
    authority: function() {
      var heirpart = this.heirpart();
      if(heirpart.substring(0, 2) != "//") { return null }
      var authority = heirpart.slice(2);
      var q = authority.indexOf("/");
      return q >= 0 ? authority.substring(0, q) : authority
    },
    fragment: function() {
      var i = this.value.indexOf("#");
      return (i < 0) ? null : this.value.slice(i)
    },
    heirpart: function() {
      var heirpart = this.value;
      var q = heirpart.indexOf("?");
      if(q >= 0) {
        heirpart = heirpart.substring(0, q)
      } else {
        q = heirpart.indexOf("#");
        if(q >= 0) { heirpart = heirpart.substring(0, q) }
      }
      var q2 = this.scheme();
      if(q2 != null) { heirpart = heirpart.slice(1 + q2.length) }
      return heirpart
    },
    host: function() {
      var host = this.authority();
      var q = host.indexOf("@");
      if(q >= 0) { host = host.slice(++q) }
      if(host.indexOf("[") == 0) {
        q = host.indexOf("]");
        if(q > 0) {  return host.substring(0, q) }
      }
      q = host.lastIndexOf(":");
      return q >= 0 ? host.substring(0, q) : host
    },
    path: function() {
      var q = this.authority();
      if(q == null) { return this.heirpart() }
      return this.heirpart().slice(q.length + 2)
    },
    port: function() {
      var host = this.authority();
      var q = host.indexOf("@");
      if(q >= 0) { host = host.slice(++q) }
      if(host.indexOf("[") == 0) {
        q = host.indexOf("]");
        if(q > 0) { return host.substring(0, q) }
      }
      q = host.lastIndexOf(":");
      if(q < 0) { return null }
      host = host.slice(++q);
      return host.length == 0 ? null : host
    },
    query: function() {
      var q = this.value.indexOf("?");
      if(q < 0) { return null }
      var f = this.value.indexOf("#");
      if(f < 0) { return this.value.slice(q) }
      return this.value.substring(q, f)
    },
    removeDotSegments: function(input) {
      var output = "";
      var q = 0;
      while(input.length > 0) {
        if(input.substr(0, 3) == "../" || input.substr(0, 2) == "./") {
          input = input.slice(input.indexOf("/"))
        }else {
          if(input == "/.") {
            input = "/"
          }else {
            if(input.substr(0, 3) == "/./") {
              input = input.slice(2)
            }else {
              if(input.substr(0, 4) == "/../" || input == "/..") {
                (input == "/..") ? input = "/" : input = input.slice(3);
                q = output.lastIndexOf("/");
                (q >= 0) ? output = output.substring(0, q) : output = "";
              }else {
                if(input.substr(0, 2) == ".." || input.substr(0, 1) == ".") {
                  input = input.slice(input.indexOf("."));
                  q = input.indexOf(".");
                  if(q >= 0) { input = input.slice(q) }
                }else {
                  if(input.substr(0, 1) == "/") {
                    output += "/";
                    input = input.slice(1)
                  }
                  q = input.indexOf("/");
                  if(q < 0) {
                    output += input;
                    input = ""
                  }else {
                    output += input.substring(0, q);
                    input = input.slice(q)
                  }
                }
              }
            }
          }
        }
      }
      return output
    },
    resolveReference: function(ref) {
      var reference;
      if(typeof ref == "string") {
        reference = new api.IRI(ref)
      }else if(ref.nodeType && ref.nodeType() == "IRI") {
        reference = ref
      }else {
        throw new Error("Expected IRI or String");
      }
      var T = {scheme:"", authority:"", path:"", query:"", fragment:""};
      var q = "";
      if(reference.scheme() != null) {
        T.scheme = reference.scheme();
        q = reference.authority();
        T.authority += q != null ? "//" + q : "";
        T.path = this.removeDotSegments(reference.path());
        q = reference.query();
        T.query += q != null ? q : ""
      }else {
        q = reference.authority();
        if(q != null) {
          T.authority = q != null ? "//" + q : "";
          T.path = this.removeDotSegments(reference.path());
          q = reference.query();
          T.query += q != null ? q : ""
        }else {
          q = reference.path();
          if(q == "" || q == null) {
            T.path = this.path();
            q = reference.query();
            if(q != null) {
              T.query += q
            }else {
              q = this.query();
              T.query += q != null ? q : ""
            }
          }else {
            if(q.substring(0, 1) == "/") {
              T.path = this.removeDotSegments(q)
            }else {
              if(this.path() != null) {
                var q2 = this.path().lastIndexOf("/");
                if(q2 >= 0) {
                  T.path = this.path().substring(0, ++q2)
                }
                T.path += reference.path()
              }else {
                T.path = "/" + q
              }
              T.path = this.removeDotSegments(T.path)
            }
            q = reference.query();
            T.query += q != null ? q : ""
          }
          q = this.authority();
          T.authority = q != null ? "//" + q : ""
        }
        T.scheme = this.scheme()
      }
      q = reference.fragment();
      T.fragment = q != null ? q : "";
      return new api.IRI(T.scheme + ":" + T.authority + T.path + T.query + T.fragment)
    },
    scheme: function() {
      var scheme = this.value.match(api.IRI.SCHEME_MATCH);
      return (scheme == null) ? null : scheme.shift().slice(0, -1)
    },
    userinfo: function() {
      var authority = this.authority();
      var q = authority.indexOf("@");
      return (q < 0) ? null : authority.substring(0, q)
    }
  };
  /**
   * Context implements DataContext
   */
  api.Context = function() {
    this.converterMap = new api.Hash;
    this._loadDefaultTypeConverters()
  };
  api.Context.prototype = {
    base: null, converterMap: null,
    createBlankNode: function() { return {}.ref().id; },
    createIRI: function(iri) {
      var resolved = new api.IRI(iri);
      if(resolved.scheme() == null && this.base != null) { resolved = this.base.resolveReference(resolved) }
      return resolved
    },
    createPlainLiteral: function(value, language) { return value.l(language); },
    createTypedLiteral: function(value, type) {
      return this.convertTypedLiteral(value.tl(type));
    },
    createTriple: function(s, p, o) { return new api.RDFTriple(s, p, o) },
    createGraph: function(a) { return new api.Graph(a) },
    getMapping: function() {
      var m = new api.Hash;
      m.h = api.curiemap;
      return m;
    },
    setMapping: function(prefix, iri) {
      if(prefix.slice(-1) == ":") { prefix = prefix.slice(0, -1) }
      api.curiemap[prefix] = iri;
      return function(suffix) { return iri + suffix };
    },
    resolveCurie: function(curie) {
      return api.curiemap.resolve(curie);
    },
    convertTypedLiteral: function(tl) {
      var converter = this.converterMap.get(tl.type.resolve());
      if(converter != null) {
        try {
          return converter(tl, tl.type)
        } catch(e) { }
      }
      return tl;
    },
    registerTypeConversion: function(iri, converter) {
      var type = iri.resolve();
      var oldConverter = this.converterMap.get(type);
      this.converterMap.remove(type);
      if(converter != null) this.converterMap.set(type, converter);
      return oldConverter ? oldConverter : null;
    },
    _loadDefaultTypeConverters: function() {
      var stringConverter = function(value, inputType) { return new String(value) };
      this.registerTypeConversion("xsd:string", stringConverter);
      var booleanConverter = function(value, inputType) { return(new Boolean(value)).valueOf() };
      this.registerTypeConversion("xsd:boolean", booleanConverter);
      var numberConverter = function(value, inputType) { return(new Number(value)).valueOf() };
      this.registerTypeConversion("xsd:float", numberConverter);
      this.registerTypeConversion("xsd:integer", numberConverter);
      this.registerTypeConversion("xsd:long", numberConverter);
      this.registerTypeConversion("xsd:double", numberConverter);
      this.registerTypeConversion("xsd:decimal", numberConverter);
      this.registerTypeConversion("xsd:nonPositiveInteger", numberConverter);
      this.registerTypeConversion("xsd:nonNegativeInteger", numberConverter);
      this.registerTypeConversion("xsd:negativeInteger", numberConverter);
      this.registerTypeConversion("xsd:int", numberConverter);
      this.registerTypeConversion("xsd:unsignedLong", numberConverter);
      this.registerTypeConversion("xsd:positiveInteger", numberConverter);
      this.registerTypeConversion("xsd:short", numberConverter);
      this.registerTypeConversion("xsd:unsignedInt", numberConverter);
      this.registerTypeConversion("xsd:byte", numberConverter);
      this.registerTypeConversion("xsd:unsignedShort", numberConverter);
      this.registerTypeConversion("xsd:unsignedByte", numberConverter);
      var dateConverter = function(value, inputType) { return new Date(value) };
      this.registerTypeConversion("xsd:dateTime", dateConverter)
    }
  };
  /**
   * Data implements DocumentData
   */
  api.Data = function() { this.graph = new api.Graph; this.context = new api.Context };
  api.Data.prototype = {
    context: null, graph: null,
    createContext: function() { return new api.Context }
  };
  api.data = new api.Data;
  return api;
})( js3 );
