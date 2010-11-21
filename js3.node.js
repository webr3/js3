/**
 * CURIE Map
 */
var curiemap = (function(map) {
  return Object.defineProperties(map, {
    resolve: {
      writable: false, configurable : false, enumerable: false,
      value: function(o) {
        var index = o.indexOf(":");
        if(index < 0 || o.indexOf("//") >= 0 ) { return o }
        var prefix = o.slice(0, index).toLowerCase();
        if(!this[prefix]) return o;
        return this[prefix].concat( o.slice(++index) );
      }
    },
    setDefault: {
      writable: false, configurable : false, enumerable: false,
      value: function(o) { this[''] = o; return this; }
    }
  });
})({
  owl: "http://www.w3.org/2002/07/owl#",
  rdf: "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
  rdfs: "http://www.w3.org/2000/01/rdf-schema#",
  rdfa: "http://www.w3.org/ns/rdfa#",
  xhv: "http://www.w3.org/1999/xhtml/vocab#",
  xml: "http://www.w3.org/XML/1998/namespace",
  xsd: "http://www.w3.org/2001/XMLSchema#",
  grddl: "http://www.w3.org/2003/g/data-view#",
  powder: "http://www.w3.org/2007/05/powder#",
  powders: "http://www.w3.org/2007/05/powder-s#",
  rif: "http://www.w3.org/2007/rif#",
  atom: "http://www.w3.org/2005/Atom/",
  xhtml: "http://www.w3.org/1999/xhtml#",
  formats: "http://www.w3.org/ns/formats/",
  xforms: "http://www.w3.org/2002/xforms/",
  xhtmlvocab: "http://www.w3.org/1999/xhtml/vocab/",
  xpathfn: "http://www.w3.org/2005/xpath-functions#",
  http: "http://www.w3.org/2006/http#",
  link: "http://www.w3.org/2006/link#",
  time: "http://www.w3.org/2006/time#",
  acl: "http://www.w3.org/ns/auth/acl#",
  cert: "http://www.w3.org/ns/auth/cert#",
  rsa: "http://www.w3.org/ns/auth/rsa#",
  crypto: "http://www.w3.org/2000/10/swap/crypto#",
  list: "http://www.w3.org/2000/10/swap/list#",
  log: "http://www.w3.org/2000/10/swap/log#",
  math: "http://www.w3.org/2000/10/swap/math#",
  os: "http://www.w3.org/2000/10/swap/os#",
  string: "http://www.w3.org/2000/10/swap/string#",
  doc: "http://www.w3.org/2000/10/swap/pim/doc#",
  contact: "http://www.w3.org/2000/10/swap/pim/contact#",
  p3p: "http://www.w3.org/2002/01/p3prdfv1#",
  swrl: "http://www.w3.org/2003/11/swrl#",
  swrlb: "http://www.w3.org/2003/11/swrlb#",
  exif: "http://www.w3.org/2003/12/exif/ns#",
  earl: "http://www.w3.org/ns/earl#",
  ma: "http://www.w3.org/ns/ma-ont#",
  sawsdl: "http://www.w3.org/ns/sawsdl#",
  sd: "http://www.w3.org/ns/sparql-service-description#",
  skos: "http://www.w3.org/2004/02/skos/core#",
  fresnel: "http://www.w3.org/2004/09/fresnel#",
  gen: "http://www.w3.org/2006/gen/ont#",
  timezone: "http://www.w3.org/2006/timezone#",
  skosxl: "http://www.w3.org/2008/05/skos-xl#",
  org: "http://www.w3.org/ns/org#",
  ical: "http://www.w3.org/2002/12/cal/ical#",
  wgs84: "http://www.w3.org/2003/01/geo/wgs84_pos#",
  vcard: "http://www.w3.org/2006/vcard/ns#",
  turtle: "http://www.w3.org/2008/turtle#",
  pointers: "http://www.w3.org/2009/pointers#",
  dcat: "http://www.w3.org/ns/dcat#",
  imreg: "http://www.w3.org/2004/02/image-regions#",
  rdfg: "http://www.w3.org/2004/03/trix/rdfg-1/",
  swp: "http://www.w3.org/2004/03/trix/swp-2/",
  rei: "http://www.w3.org/2004/06/rei#",
  wairole: "http://www.w3.org/2005/01/wai-rdf/GUIRoleTaxonomy#",
  states: "http://www.w3.org/2005/07/aaa#",
  wn20schema: "http://www.w3.org/2006/03/wn/wn20/schema/",
  httph: "http://www.w3.org/2007/ont/httph#",
  act: "http://www.w3.org/2007/rif-builtin-action#",
  common: "http://www.w3.org/2007/uwa/context/common.owl#",
  dcn: "http://www.w3.org/2007/uwa/context/deliverycontext.owl#",
  hard: "http://www.w3.org/2007/uwa/context/hardware.owl#",
  java: "http://www.w3.org/2007/uwa/context/java.owl#",
  loc: "http://www.w3.org/2007/uwa/context/location.owl#",
  net: "http://www.w3.org/2007/uwa/context/network.owl#",
  push: "http://www.w3.org/2007/uwa/context/push.owl#",
  soft: "http://www.w3.org/2007/uwa/context/software.owl#",
  web: "http://www.w3.org/2007/uwa/context/web.owl#",
  content: "http://www.w3.org/2008/content#",
  vs: "http://www.w3.org/2003/06/sw-vocab-status/ns#",
  air: "http://dig.csail.mit.edu/TAMI/2007/amord/air#",
  ex: "http://example.org/",
  
  dc: "http://purl.org/dc/terms/",
  dc11: "http://purl.org/dc/elements/1.1/",
  dctype: "http://purl.org/dc/dcmitype/",
  foaf: "http://xmlns.com/foaf/0.1/",
  cc: "http://creativecommons.org/ns#",
  opensearch: "http://a9.com/-/spec/opensearch/1.1/",
  'void': "http://rdfs.org/ns/void#",
  sioc: "http://rdfs.org/sioc/ns#",
  sioca: "http://rdfs.org/sioc/actions#",
  sioct: "http://rdfs.org/sioc/types#",
  lgd: "http://linkedgeodata.org/vocabulary#",
  moat: "http://moat-project.org/ns#",
  days: "http://ontologi.es/days#",
  giving: "http://ontologi.es/giving#",
  lang: "http://ontologi.es/lang/core#",
  like: "http://ontologi.es/like#",
  status: "http://ontologi.es/status#",
  og: "http://opengraphprotocol.org/schema/",
  protege: "http://protege.stanford.edu/system#",
  dady: "http://purl.org/NET/dady#",
  uri: "http://purl.org/NET/uri#",
  audio: "http://purl.org/media/audio#",
  video: "http://purl.org/media/video#",
  gridworks: "http://purl.org/net/opmv/types/gridworks#",
  hcterms: "http://purl.org/uF/hCard/terms/",
  bio: "http://purl.org/vocab/bio/0.1/",
  cs: "http://purl.org/vocab/changeset/schema#",
  geographis: "http://telegraphis.net/ontology/geography/geography#",
  doap: "http://usefulinc.com/ns/doap#",
  daml: "http://www.daml.org/2001/03/daml+oil#",
  geonames: "http://www.geonames.org/ontology#",
  sesame: "http://www.openrdf.org/schema/sesame#",
  cv: "http://rdfs.org/resume-rdf/",
  wot: "http://xmlns.com/wot/0.1/",
  media: "http://purl.org/microformat/hmedia/",
  ctag: "http://commontag.org/ns#"
});
/**
 * Property Map
 */
var propertymap = (function(map) {
  return Object.defineProperties(map, {
    resolve: {
      writable: false, configurable : false, enumerable: false,
      value: function(t,l) {
        t = t.toString();
        l = Array.isArray(l) && l.length > 0 ? l : Object.keys(this);
        for(i in l) if(this[l[i]].indexOf(t) >= 0) return l[i] + ':' + t;
        return t;
      }
    }
  });
})({
  owl: ['allValuesFrom','annotatedProperty','annotatedSource','annotatedTarget','assertionProperty','backwardCompatibleWith',
        'bottomDataProperty','bottomObjectProperty','cardinality','complementOf','datatypeComplementOf','deprecated','differentFrom',
        'disjointUnionOf','disjointWith','distinctMembers','equivalentClass','equivalentProperty','hasKey','hasSelf','hasValue',
        'imports','incompatibleWith','intersectionOf','inverseOf','maxCardinality','maxQualifiedCardinality','members','minCardinality',
        'minQualifiedCardinality','onClass','onDataRange','onDatatype','oneOf','onProperties','onProperty','priorVersion','propertyChainAxiom',
        'propertyDisjointWith','qualifiedCardinality','sameAs','someValuesFrom','sourceIndividual','targetIndividual','targetValue',
        'topDataProperty','topObjectProperty','unionOf','versionInfo','versionIRI','withRestrictions'],
  rdf: ['type','subject','predicate','object','value','first','rest'],
  rdfs: ['subClassOf','subPropertyOf','comment','label','domain','range','seeAlso','isDefinedBy','member'],
  grddl: ['namespaceTransformation','transformation','transformationProperty','result','profileTransformation'],
  wdrs: ['text','issuedby','matchesregex','notmatchesregex','hasIRI','tag','notknownto','describedby','authenticate',
         'validfrom','validuntil','logo','sha1sum','certified','certifiedby','supportedby','data_error','proc_error','error_code'],
         
  dc: ['title','creator','subject','description','publisher','contributor','date','type','format','identifier','source',
       'language','relation','coverage','rights','audience','alternative','tableOfContents','abstract','created','valid',
       'available','issued','modified','extent','medium','isVersionOf','hasVersion','isReplacedBy','replaces','isRequiredBy',
       'requires','isPartOf','hasPart','isReferencedBy','references','isFormatOf','hasFormat','conformsTo','spatial','temporal',
       'mediator','dateAccepted','dateCopyrighted','dateSubmitted','educationLevel','accessRights','bibliographicCitation',
       'license','rightsHolder','provenance','instructionalMethod','accrualMethod','accrualPeriodicity','accrualPolicy'],
  dc11: ['title','creator','subject','description','publisher','contributor','date','type','format','identifier','source',
         'language','relation','coverage','rights'],
  foaf: ['mbox','mbox_sha1sum','gender','geekcode','dnaChecksum','sha1','based_near','title','nick','jabberID','aimChatID',
         'skypeID','icqChatID','yahooChatID','msnChatID','name','firstName','lastName','givenName','givenname','surname',
         'family_name','familyName','phone','homepage','weblog','openid','tipjar','plan','made','maker','img','depiction',
         'depicts','thumbnail','myersBriggs','workplaceHomepage','workInfoHomepage','schoolHomepage','knows','interest',
         'topic_interest','publications','currentProject','pastProject','fundedBy','logo','topic','primaryTopic','focus',
         'isPrimaryTopicOf','page','theme','account','holdsAccount','accountServiceHomepage','accountName','member',
         'membershipClass','birthday','age','status'],
  cc: ['requires','prohibits','jurisdiction','useGuidelines','deprecatedOn','attributionName','license','attributionURL',
       'morePermissions','permits','legalcode'],
 'void': ['statItem','feature','subset','target','sparqlEndpoint','linkPredicate','exampleResource','vocabulary',
          'subjectsTarget','objectsTarget','dataDump','uriLookupEndpoint','uriRegexPattern'],
});
/**
 * JS3 Core
 */
js3 = (function( curiemap, propertymap ) {
  var bn = 0;
  function _(v) { return { writable: false, configurable : false, enumerable: false, value: v }}
  function pad(n){ return n<10 ? '0'+n : n }
  function prop(p,l) {
    if(p == 'a') return 'rdf:type';
    p = p.replace('$',':');
    if(p.indexOf(':') == -1) p = propertymap.resolve(p,l);
    return p;
  };
  // Temporary import of RDFa API RDFTriple and Graph for graphification. 
  RDFTriple = function(s, p, o) { this.subject = s; this.property = p; this.object = o; };
  RDFTriple.prototype = {
    object: null, property: null, subject: null,
    toString: function() { return this.subject.toNT() + " " + this.property.toNT() + " " + this.object.toNT() + " ." },
    equals: function(t) { return this.subject.equals(t.subject) && this.property.equals(t.property) && this.object.equals(t.object) }
  };
  Graph = function(a) {
    this.length = 0;
    this.graph = [];
    this.index = {};
    if(Array.isArray(a)) this.importArray(a);
  };
  Graph.prototype = {
    length: null, graph: null,
    importArray: function(a) { while( a.length > 0) { this.add(a.pop()) } },
    get: function(index) { return this.graph[index] },
    add: function(triple) {
      if(!this.index[triple.subject.toNT()]) this.index[triple.subject.toNT()] = {};
      if(!this.index[triple.subject.toNT()][triple.property.toNT()]) this.index[triple.subject.toNT()][triple.property.toNT()] = [];
      if(this.index[triple.subject.toNT()][triple.property.toNT()].some(function(o){return o.equals(triple.object)})) return;
      this.length++;
      this.index[triple.subject.toNT()][triple.property.toNT()].push(triple.object);
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
    filter: function(filter) { return new Graph(this.graph.filter(filter)); },
    apply: function(filter) { this.graph = this.graph.filter(filter); this.length = this.graph.length; },
    toArray: function() { return this.graph.slice() }
  };
  // N-Triples encoder
  function encodeString(s) {
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
        case "IRI": case "BlankNode":
          return this == other;
        case "PlainLiteral":
          if((this.language && !other.language) || (!this.language && other.language)) return false;
          if(this.language && other.language) return this.language == other.language && this == other;
          return this == other;
        case "TypedLiteral":
          return this.type.equals(other.type) && this == other;
      }
      return this.n3() == other.n3()
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
            outs.push( prop(map && map[p] ? map[p] : p) + ' ' + o[p].n3(map) );
          });
          outs = outs.join(";\n  ");
          return id ? this.id.n3() + ' ' + outs + ' .' : '[ ' + outs + ' ]';
        }),
        toNT: _( function(a) {
          return this.graphify(a).toArray().join("\n");
        }),
        graphify: _( function(a) {
          var graph = new Graph, o = this, map = o.aliasmap || a;
          function graphify(s1,p1,o1) {
            if(typeof o1 == 'function') return;
            if(!o1.nodeType && !o1.id) o1.ref();
            if(o1.id) {
              graph.add( new RDFTriple(s1, prop(p1,map), o1.id ) );
              graph.merge( o1.graphify() );
            } else if(!Array.isArray(o1)) {
              graph.add( new RDFTriple(s1, prop(p1,map), o1 ) );
            } else if(Array.isArray(o1)) {
              if(!o1.list) {
                o1.forEach( function(i) { graphify(s1,p1,i) });
              } else {
                if(o1.length == 0) {
                  graph.add( new RDFTriple(s1, prop(p1,map), "rdf:nil".resolve() ) );
                } else {
                  var b = {}.ref();
                  graph.add( new RDFTriple(s1, prop(p1,map), b.id ) );
                  o1.forEach( function(i,x) {
                    graphify(b.id, 'rdf:first'.resolve(), i );
                    var n = {}.ref();
                    graph.add( new RDFTriple(b.id, 'rdf:rest'.resolve(), (x == o1.length-1) ? 'rdf:nil'.resolve() : n.id ) );
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
          var a = arguments, aliasmap = {};
          Object.keys(this).forEach(function(p) {
            if( p.indexOf(":") == -1 && p.indexOf("$") == -1 ) aliasmap[p] = propertymap.resolve(p,a);
          });
          if(Object.keys(aliasmap).length > 0) Object.defineProperty(this,'aliasmap',_(aliasmap));
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
        if(!i.nodeType) i.ref();
        outs.push(i.n3(a))
      });
      return this.list ? "( " + outs.join(" ") + " )" : outs.join(", ");
    })
  });
  Object.defineProperties( Boolean.prototype, {
    type: _( "xsd:boolean".resolve() ),
    nodeType: _( function() { return "TypedLiteral"} ),
    n3: _( function() { return this.valueOf() } ),
    toNT: _( function() { return '"' + this.valueOf() + '"' + "^^<" + this.type + '>' } ),
    toCanonical: _( function() { return this.toNT() } )
  });
  Object.defineProperties( Date.prototype, {
    type: _( "xsd:dateTime".resolve() ),
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
  return {
    curiemap: curiemap, propertymap: propertymap,
    graphify: function() {
      var a = Array.prototype.slice.call(arguments), gout = new Graph;
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
    }
  };
})( curiemap, propertymap );module.exports = js3;
