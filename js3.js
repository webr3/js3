/**
 * CURIE Map
 */
var curiemap = (function(map) {
  function oflip(o) {
    var out = {};
    Object.keys(o).forEach(function(k) { out[o[k]] = k });
    return out;
  };
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
    },
    getPrefix: {
      writable: false, configurable : false, enumerable: false,
      value: function(o) { return oflip(this)[o]; }
    },
    shrink: {
      writable: false, configurable : false, enumerable: false,
      value: function(iri) {
        for(pref in this)
          if(iri.substr(0,this[pref].length) == this[pref])
            return pref + ':' + iri.slice(this[pref].length);
        return iri;
      }
    },
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
        l = Array.isArray(l) && l.length > 0 ? l.concat(Object.keys(this)) : Object.keys(this);
        for(i in l) if(this[l[i]].indexOf(t) >= 0) return l[i] + ':' + t;
        return t;
      }
    },
    ambiguities: {
      writable: false, configurable : false, enumerable: false,
      value: function() {
        var _ = this, map = {}, out = [];
        Object.keys(this).forEach(function(ont) {
          _[ont].forEach(function(prop) { if(!map[prop]) map[prop] = [ont + ':' + prop]; else map[prop].push(ont + ':' + prop) })
        });
        Object.keys(map).forEach(function(prop) {
          if(map[prop].length > 1) out = out.concat(map[prop]);
        });
        return out;
      }
    },
    shrink: {
      writable: false, configurable : false, enumerable: false,
      value: function(curie) {
        if(curie == 'rdf:type') return 'a';
        var p = curie.indexOf(':');
        var prefix = curie.substring(0,p);
        var suffix = curie.substring(++p);
        if(!this[prefix]) this[prefix] = [];
        if(this[prefix].indexOf(suffix) == -1) this[prefix].push(suffix);
        return suffix;
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
  sioc: ['about','account_of','addressed_to','administrator_of','attachment','avatar','container_of','content','creator_of',
         'earlier_version','email','email_sha1','embeds_knowledge','feed','follows','function_of','has_administrator',
         'has_container','has_creator','has_discussion','has_function','has_host','has_member','has_moderator','has_modifier',
         'has_owner','has_parent','has_reply','has_scope','has_space','has_subscriber','has_usergroup','host_of','id',
         'ip_address','last_activity_date','last_item_date','last_reply_date','later_version','latest_version','link',
         'links_to','member_of','moderator_of','modifier_of','name','next_by_date','next_version','note','num_authors',
         'num_items','num_replies','num_threads','num_views','owner_of','parent_of','previous_by_date','previous_version',
         'related_to','reply_of','scope_of','sibling','space_of','subscriber_of','topic','usergroup_of'],
  sioca: ['byproduct','creates','deletes','modifies','object','product','source','uses'], // may remove..
  link: ['listDocumentProperty','uri'],
  acl: ['accessControl','accessTo','accessToClass','agent','agentClass','defaultForNew','mode'],
  skos: ['inScheme','hasTopConcept','topConceptOf','prefLabel','altLabel','hiddenLabel','notation','note','changeNote',
         'definition','editorialNote','example','historyNote','scopeNote','semanticRelation','broader','narrower','related',
         'broaderTransitive','narrowerTransitive','member','memberList','mappingRelation','broadMatch','narrowMatch',
         'relatedMatch','exactMatch','closeMatch'],
  wgs84: ['lat','location','long','alt','lat_long'],
  org: ['subOrganizationOf','transitiveSubOrganizationOf','hasSubOrganization ','purpose','hasUnit','unitOf','classification',
        'identifier','linkedTo','memberOf','hasMember','reportsTo','member','organization','role','hasMembership','memberDuring',
        'roleProperty','headOf','remuneration','siteAddress','hasSite','siteOf','hasPrimarySite','hasRegisteredSite','basedAt ',
        'location','originalOrganization','changedBy','resultedFrom','resultingOrganization'],
});
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
        '@': _( id ? id.resolve() : '_:b' +(++bn) ),
        n3: _( function(a) {
          var outs = [], o = this, map = o['#'] || a;
          Object.keys(this).forEach(function(p) {
            if(typeof o[p] == 'function') return;
            if(o[p]['@'] && o[p]['@'].nodeType() == 'IRI') return outs.push( prop(p,map) + ' ' + o[p]['@'].n3() );
            if(!o[p].nodeType && !o[p]['@']) o[p].ref();
            outs.push( prop(p, map) + ' ' + o[p].n3(map) );
          });
          outs = outs.join(";\n  ");
          return id.nodeType() == 'IRI' ? this['@'].n3() + ' ' + outs + ' .' : '[ ' + outs + ' ]';
        }),
        toNT: _( function(a) {
          return this.graphify(a).toArray().join("\n");
        }),
        graphify: _( function(a) {
          var graph = new js3.Graph, o = this, map = o['#'] || a;
          function graphify(s1,p1,o1) {
            if(typeof o1 == 'function') return;
            if(!o1.nodeType && !o1['@']) o1.ref();
            if(o1['@']) {
              graph.add( new js3.RDFTriple(s1, prop(p1,map), o1['@'] ) );
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
                  graph.add( new js3.RDFTriple(s1, prop(p1,map), b['@'] ) );
                  o1.forEach( function(i,x) {
                    graphify(b['@'], 'rdf:first'.resolve(), i );
                    var n = {}.ref();
                    graph.add( new js3.RDFTriple(b['@'], 'rdf:rest'.resolve(), (x == o1.length-1) ? 'rdf:nil'.resolve() : n['@'] ) );
                    b = n;
                  });
                }
              }
            }
          }
          Object.keys(this).forEach(function(p) { graphify(o['@'], p, o[p]) });
          return graph;
        }),
        '_#': _([]), '#':{configurable : false, enumerable: false,
          get: function() { return this['_#']; },
          set: function(v) {
            if(Array.isArray(v)) {
              for(i in v) if(this['_#'].indexOf(i[v]) == -1) this['_#'].push(i[v])
              return;
            }
            if(this['_#'].indexOf(v) == -1) this['_#'].push(v);
          }
        },
        using: _( function() {
          this['#'] = Array.prototype.slice.call(arguments);
          return this;
        }),
        alsoUsing: _( function() {
          var _$ = this;
          Array.prototype.slice.call(arguments).forEach(function(a) { _$['#'] = a });
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
        if(i['@'] && i['@'].nodeType() == 'IRI') return outs.push( i['@'].n3() );
        if(!i.nodeType && !i['@']) i.ref();
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
        if(!o['@']) o.ref();
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
    createBlankNode: function() { return {}.ref()['@']; },
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
/**
 * Parsers (NTriples, Turtle, RDF/XML)
 */
(function(api) {
  if(!api.parsers) { api.parsers = {} }
  api.parsers.u8 = new RegExp("\\\\U([A-F0-9]{8})", "g");
  api.parsers.u4 = new RegExp("\\\\u([A-F0-9]{4})", "g");
  api.parsers.hexToChar = function(hex) {
    var result = "";
    var n = parseInt(hex, 16);
    if(n <= 65535) {
      result += String.fromCharCode(n)
    } else if(n <= 1114111) {
      n -= 65536;
      result += String.fromCharCode(55296 + (n >> 10), 56320 + (n & 1023))
    } else { throw new Error("code point isn't known: " + n); }
    return result
  };
  api.parsers.decodeString = function(str) {
    str = str.replace(api.parsers.u8, function(matchstr, parens) { return api.parsers.hexToChar(parens) });
    str = str.replace(api.parsers.u4, function(matchstr, parens) { return api.parsers.hexToChar(parens) });
    str = str.replace(new RegExp("\\\\t", "g"), "\t");
    str = str.replace(new RegExp("\\\\n", "g"), "\n");
    str = str.replace(new RegExp("\\\\r", "g"), "\r");
    str = str.replace(new RegExp('\\\\"', "g"), '"');
    str = str.replace(new RegExp("\\\\\\\\", "g"), "\\");
    return str
  };
  /**
   * NTriples implements DataParser
   * doc param of parse() and process() must be a string
   */
  api.parsers.NTriples = function(context) {
    this.context = context;
    this.bnHash = new api.Hash
  };
  api.parsers.NTriples.isComment = new RegExp("^[ \t]*#", "");
  api.parsers.NTriples.isEmptyLine = new RegExp("^[ \t]*$", "");
  api.parsers.NTriples.initialWhitespace = new RegExp("^[ \t]+", "");
  api.parsers.NTriples.trailingWhitespace = new RegExp("[. \t]+$", "");
  api.parsers.NTriples.whitespace = new RegExp("[ \t]+", "");
  api.parsers.NTriples.objectMatcher = new RegExp("^([^ \t]+)[ \t]+([^ \t]+)[ \t]+(.*)$", "");
  api.parsers.NTriples.trailingLanguage = new RegExp("@([a-z]+[-a-z0-9]+)$", "");
  api.parsers.NTriples.typedLiteralMatcher = new RegExp('^"(.*)"(.{2})<([^>]+)>$', "");
  api.parsers.NTriples.eolMatcher = new RegExp("\r\n|\n|\r", "g");
  api.parsers.NTriples.prototype = {
    context: null, quick: null, bnHash: null, graph: null, filter: null, processor: null,
    parse: function(toparse, cb, filter, graph) {
      this.graph = graph == null ? this.context.createGraph() : graph;
      this.filter = filter;
      this.quick = false;
      this.internalParse(toparse);
      if(cb != null) cb(this.graph);      
      return true;
    },
    process: function(toparse, processor, filter) {
      this.processor = processor;
      this.filter = filter;
      this.quick = true;
      return this.internalParse(toparse)
    },
    getBlankNode: function(id) {
      if(this.bnHash.exists(id)) { return this.bnHash.get(id) }
      var bn = this.context.createBlankNode();
      this.bnHash.set(id, bn);
      return bn
    },
    internalParse: function(toparse) {
      var data = new String(toparse);
      var lines = data.split(api.parsers.NTriples.eolMatcher);
      var _ = this;
      lines.forEach(function(a, b, c) { _.readLine(a, b, c) });
      return true
    },
    negotiateLiteral: function(plain) {
      if(plain.slice(-1) == '"') { return this.context.createPlainLiteral(api.parsers.decodeString(plain.slice(1, -1))) }
      var lang = plain.match(api.parsers.NTriples.trailingLanguage);
      if(lang != null) { return this.context.createPlainLiteral(api.parsers.decodeString(plain.slice(1, -1 - lang.shift().length)), lang.pop()) }
      var parts = plain.match(api.parsers.NTriples.typedLiteralMatcher);
      return this.context.createTypedLiteral(api.parsers.decodeString(parts[1]), parts.pop())
    },   
    readLine: function(line, index, array) {
      if(api.parsers.NTriples.isComment.test(line) || api.parsers.NTriples.isEmptyLine.test(line)) { return }
      line = line.replace(api.parsers.NTriples.initialWhitespace, "").replace(api.parsers.NTriples.trailingWhitespace, "");
      var spo = line.split(api.parsers.NTriples.whitespace, 2);
      spo.push(line.replace(api.parsers.NTriples.objectMatcher, "$3"));
      var s;
      if(spo[0].charAt(0) == "<") {
        s = this.context.createIRI(api.parsers.decodeString(spo[0].slice(1, -1)))
      }else {
        s = this.getBlankNode(spo[0].slice(2))
      }
      spo.shift();
      var p = this.context.createIRI(spo.shift().slice(1, -1));
      var o;
      switch(spo[0].charAt(0)) {
        case "<":
          o = this.context.createIRI(api.parsers.decodeString(spo[0].slice(1, -1)));
          break;
        case "_":
          o = this.getBlankNode(spo[0].slice(2));
          break;
        default:
          o = this.negotiateLiteral(spo[0]);
          break
      }
      var triple = this.context.createTriple(s, p, o);
      var $use = true;
      if(this.filter != null) { $use = this.filter(triple, null, null) }
      if(!$use) { return; }
      this.quick ? this.processor(triple) : this.graph.add(triple);
    }
  };
  /**
   * Turtle implements DataParser
   * doc param of parse() and process() must be a string
   */
  api.parsers.Turtle = function(context) {
    this.context = context;
    this.bnHash = new api.Hash
  };
  api.parsers.Turtle.isWhitespace = new RegExp("^[ \t\r\n#]+", "");
  api.parsers.Turtle.initialWhitespace = new RegExp("^[ \t\r\n]+", "");
  api.parsers.Turtle.initialComment = new RegExp("^#[^\r\n]*", "");
  api.parsers.Turtle.simpleToken = new RegExp("^[^ \t\r\n]+", "");
  api.parsers.Turtle.simpleObjectToken = new RegExp("^[^ \t\r\n;,]+", "");
  api.parsers.Turtle.tokenInteger = new RegExp("^(-|\\+)?[0-9]+$", "");
  api.parsers.Turtle.tokenDouble = new RegExp("^(-|\\+)?(([0-9]+\\.[0-9]*[eE]{1}(-|\\+)?[0-9]+)|(\\.[0-9]+[eE]{1}(-|\\+)?[0-9]+)|([0-9]+[eE]{1}(-|\\+)?[0-9]+))$", "");
  api.parsers.Turtle.tokenDecimal = new RegExp("^(-|\\+)?[0-9]*\\.[0-9]+?$", "");  
  api.parsers.Turtle.prototype = {
    bnHash: null, context: null, filter: null, processor: null, quick: null, graph: null,
    parse: function(doc, cb, filter, graph) {
      this.graph = graph == null ? this.context.createGraph() : graph;
      this.filter = filter;
      this.quick = false;
      this.parseStatements(new String(doc));
      if(cb != null) cb(this.graph);      
      return true;
    },
    process: function(doc, processor, filter) {
      this.processor = processor; this.filter = filter; this.quick = true;
      return this.parseStatements(new String(doc))
    },
    t: function() { return{o:null} },
    parseStatements: function(s) {
      s = s.toString();
      while(s.length > 0) {
        s = this.skipWS(s);
        if(s.length == 0) return true;
        s.charAt(0) == "@" ? s = this.consumeDirective(s) : s = this.consumeStatement(s);
        this.expect(s, ".");
        s = this.skipWS(s.slice(1))
      }
      return true
    },
    add: function(t) {
      var $use = true;
      if(this.filter != null) {  $use = this.filter(t, null, null) }
      if(!$use) { return }
      this.quick ? this.processor(t) : this.graph.add(t);
    },
    consumeBlankNode: function(s, t) {
      t.o = this.context.createBlankNode();
      s = this.skipWS(s.slice(1));
      if(s.charAt(0) == "]") { return s.slice(1) }
      s = this.skipWS(this.consumePredicateObjectList(s, t));
      this.expect(s, "]");
      return this.skipWS(s.slice(1))
    },
    consumeCollection: function(s, subject) {
      subject.o = this.context.createBlankNode();
      var listject = this.t();
      listject.o = subject.o;
      s = this.skipWS(s.slice(1));
      var cont = s.charAt(0) != ")";
      if(!cont) { subject.o = this.context.resolveCurie("rdf:nil") }
      while(cont) {
        var o = this.t();
        switch(s.charAt(0)) {
          case "[": s = this.consumeBlankNode(s, o); break;
          case "_": s = this.consumeKnownBlankNode(s, o); break;
          case "(": s = this.consumeCollection(s, o); break;
          case "<": s = this.consumeURI(s, o); break;
          case '"': s = this.consumeLiteral(s, o); break;
          default:
            var token = s.match(api.parsers.Turtle.simpleObjectToken).shift();
            if(token.charAt(token.length - 1) == ")") { token = token.substring(0, token.length - 1) }
            if(token == "false" || token == "true") {
              o.o = this.context.createTypedLiteral(token, "xsd:boolean")
            } else if(token.indexOf(":") > -1) {
              o.o = this.context.resolveCurie(token)
            } else if(api.parsers.Turtle.tokenInteger.test(token)) {
              o.o = this.context.createTypedLiteral(token, "xsd:integer")
            } else if(api.parsers.Turtle.tokenDouble.test(token)) {
              o.o = this.context.createTypedLiteral(token, "xsd:double")
            } else if(api.parsers.Turtle.tokenDecimal.test(token)) {
              o.o = this.context.createTypedLiteral(token, "xsd:decimal")
            } else {
              throw new Error("unrecognised token: " + token);
            }
            s = s.slice(token.length);
            break
        }
        this.add(this.context.createTriple(listject.o, this.context.resolveCurie("rdf:first"), o.o));
        s = this.skipWS(s);
        cont = s.charAt(0) != ")";
        if(cont) {
          this.add(this.context.createTriple(listject.o, this.context.resolveCurie("rdf:rest"), listject.o = this.context.createBlankNode()))
        } else {
          this.add(this.context.createTriple(listject.o, this.context.resolveCurie("rdf:rest"), this.context.resolveCurie("rdf:nil")))
        }
      }
      return this.skipWS(s.slice(1))
    },
    consumeDirective: function(s) {
      var p = 0;
      if(s.substring(1, 7) == "prefix") {
        s = this.skipWS(s.slice(7));
        p = s.indexOf(":");
        var prefix = s.substring(0, p);
        s = this.skipWS(s.slice(++p));
        this.expect(s, "<");
        this.context.setMapping(prefix, api.parsers.decodeString(s.substring(1, p = s.indexOf(">"))));
        s = this.skipWS(s.slice(++p))
      } else if(s.substring(1, 5) == "base") {
        s = this.skipWS(s.slice(5));
        this.expect(s, "<");
        this.context.base = this.context.createIRI(api.parsers.decodeString(s.substring(1, p = s.indexOf(">"))));
        s = this.skipWS(s.slice(++p))
      } else {
        throw new Error("Unknown directive: " + s.substring(0, 50));
      }
      return s
    },
    consumeKnownBlankNode: function(s, t) {
      this.expect(s, "_:");
      var bname = s.slice(2).match(api.parsers.Turtle.simpleToken).shift();
      t.o = this.getBlankNode(bname);
      return s.slice(bname.length + 2)
    },
    consumeLiteral: function(s, o) {
      var value = "";
      var hunt = true;
      var end = 0;
      if(s.substring(0, 3) == '"""') {
        end = 3;
        while(hunt) {
          end = s.indexOf('"""', end);
          if(hunt = s.charAt(end - 1) == "\\") { end++ }
        }
        value = s.substring(3, end);
        s = s.slice(value.length + 6)
      } else {
        while(hunt) {
          end = s.indexOf('"', end + 1);
          hunt = s.charAt(end - 1) == "\\"
        }
        value = s.substring(1, end);
        s = s.slice(value.length + 2)
      }
      value = api.parsers.decodeString(value);
      switch(s.charAt(0)) {
        case "@":
          var token = s.match(api.parsers.Turtle.simpleObjectToken).shift();
          o.o = this.context.createPlainLiteral(value, token.slice(1));
          s = s.slice(token.length);
          break;
        case "^":
          var token = s.match(api.parsers.Turtle.simpleObjectToken).shift().slice(2);
          if(token.charAt(0) == "<") {
            o.o = this.context.createTypedLiteral(value, token.substring(1, token.length - 1))
          } else {
            o.o = this.context.createTypedLiteral(value, token)
          }
          s = s.slice(token.length + 2);
          break;
        default:
          o.o = this.context.createPlainLiteral(value);
          break
      }
      return s
    },
    consumeObjectList: function(s, subject, property) {
      var cont = true;
      while(cont) {
        var o = this.t();
        switch(s.charAt(0)) {
          case "[": s = this.consumeBlankNode(s, o); break;
          case "_": s = this.consumeKnownBlankNode(s, o); break;
          case "(": s = this.consumeCollection(s, o); break;
          case "<": s = this.consumeURI(s, o); break;
          case '"': s = this.consumeLiteral(s, o); break;
          default:
            var token = s.match(api.parsers.Turtle.simpleObjectToken).shift();
            if(token.charAt(token.length - 1) == ".") {
              token = token.substring(0, token.length - 1)
            }
            if(token == "false" || token == "true") {
              o.o = this.context.createTypedLiteral(token, "xsd:boolean")
            } else if(token.indexOf(":") > -1) {
              o.o = this.context.resolveCurie(token)
            } else if(api.parsers.Turtle.tokenInteger.test(token)) {
              o.o = this.context.createTypedLiteral(token, "xsd:integer")
            } else if(api.parsers.Turtle.tokenDouble.test(token)) {
              o.o = this.context.createTypedLiteral(token, "xsd:double")
            } else if(api.parsers.Turtle.tokenDecimal.test(token)) {
              o.o = this.context.createTypedLiteral(token, "xsd:decimal")
            } else {
              throw new Error("unrecognised token: " + token);
            }
            s = s.slice(token.length);
            break
        }
        this.add(this.context.createTriple(subject.o, property, o.o));
        s = this.skipWS(s);
        cont = s.charAt(0) == ",";
        if(cont) { s = this.skipWS(s.slice(1)) }
      }
      return s
    },
    consumePredicateObjectList: function(s, subject) {
      var cont = true;
      while(cont) {
        var predicate = s.match(api.parsers.Turtle.simpleToken).shift();
        var property = null;
        if(predicate == "a") {
          property = this.context.resolveCurie("rdf:type")
        } else {
          switch(predicate.charAt(0)) {
            case "<": property = this.context.createIRI(api.parsers.decodeString(predicate.substring(1, predicate.indexOf(">")))); break;
            default: property = this.context.resolveCurie(predicate); break
          }
        }
        s = this.skipWS(s.slice(predicate.length));
        s = this.consumeObjectList(s, subject, property);
        cont = s.charAt(0) == ";";
        if(cont) { s = this.skipWS(s.slice(1)) }
      }
      return s
    },
    consumeQName: function(s, t) {
      var qname = s.match(api.parsers.Turtle.simpleToken).shift();
      t.o = this.context.resolveCurie(qname);
      return s.slice(qname.length)
    },
    consumeStatement: function(s) {
      var t = this.t();
      switch(s.charAt(0)) {
        case "[":
          s = this.consumeBlankNode(s, t);
          if(s.charAt(0) == ".") { return s }
          break;
        case "_": s = this.consumeKnownBlankNode(s, t); break;
        case "(": s = this.consumeCollection(s, t); break;
        case "<": s = this.consumeURI(s, t); break;
        default: s = this.consumeQName(s, t); break
      }
      s = this.consumePredicateObjectList(this.skipWS(s), t);
      return s
    },
    consumeURI: function(s, t) {
      this.expect(s, "<");
      var p = 0;
      t.o = this.context.createIRI(api.parsers.decodeString(s.substring(1, p = s.indexOf(">"))));
      return s.slice(++p)
    },
    expect: function(s, t) {
      if(s.substring(0, t.length) == t) { return }
      throw new Error("Expected token: " + t + " at " + s.substring(0, 50));
    },
    getBlankNode: function(id) {
      if(this.bnHash.exists(id)) { return this.bnHash.get(id) }
      var bn = this.context.createBlankNode();
      this.bnHash.set(id, bn);
      return bn
    },   
    skipWS: function(s) {
      while(api.parsers.Turtle.isWhitespace.test(s.charAt(0))) {
        s = s.replace(api.parsers.Turtle.initialWhitespace, "");
        if(s.charAt(0) == "#") { s = s.replace(api.parsers.Turtle.initialComment, "") }
      }
      return s
    }
  };
  /**
   * RDFXML implements DataParser
   * doc argument of parse() and process() must be a DOM document
   */
  api.parsers.RDFXML = function(context) {
    this.context = context;
    this.bnHash = new api.Hash
  };
  api.parsers.RDFXML.NS_RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
  api.parsers.RDFXML.NS_RDFS = "http://www.w3.org/2000/01/rdf-schema#";
  api.parsers.RDFXML.RDF_TYPE = new api.IRI(api.parsers.RDFXML.NS_RDF + "type");
  api.parsers.RDFXML.RDF_RDF = new api.IRI(api.parsers.RDFXML.NS_RDF + "RDF");
  api.parsers.RDFXML.RDF_DESCRIPTION = new api.IRI(api.parsers.RDFXML.NS_RDF + "Description");
  api.parsers.RDFXML.RDF_STATEMENT = new api.IRI(api.parsers.RDFXML.NS_RDF + "Statement");
  api.parsers.RDFXML.RDF_SUBJECT = new api.IRI(api.parsers.RDFXML.NS_RDF + "subject");
  api.parsers.RDFXML.RDF_PREDICATE = new api.IRI(api.parsers.RDFXML.NS_RDF + "predicate");
  api.parsers.RDFXML.RDF_OBJECT = new api.IRI(api.parsers.RDFXML.NS_RDF + "object");
  api.parsers.RDFXML.RDF_LI = new api.IRI(api.parsers.RDFXML.NS_RDF + "li");
  api.parsers.RDFXML.RDF_FIRST = new api.IRI(api.parsers.RDFXML.NS_RDF + "first");
  api.parsers.RDFXML.RDF_REST = new api.IRI(api.parsers.RDFXML.NS_RDF + "rest");
  api.parsers.RDFXML.RDF_NIL = new api.IRI(api.parsers.RDFXML.NS_RDF + "nil");
  api.parsers.RDFXML.prototype = {
    base: null, bnHash: null, context: null, filter: null, processor: null, quick: null, graph: null,
    parse: function(toparse, cb, filter, graph) {
      this.graph = graph == null ? new api.Graph : graph;
      this.filter = filter;
      this.quick = false;
      this.parseStatements(toparse)
      if( cb != null ) cb(this.graph)
      return;
    },
    process: function(doc, processor, filter) {
      this.processor = processor;
      this.filter = filter;
      this.quick = true;
      return this.parseStatements(doc)
    },
    add: function(t) {
      var $use = true;
      if(this.filter != null) $use = this.filter(t, null, null);
      if(!$use) return;
      this.quick ? this.processor(t) : this.graph.add(t);
    },
    addArc: function(frame, arc) {
      if(arc.equals(api.parsers.RDFXML.RDF_LI)) arc = this.context.resolveCurie("rdf:_" + frame.parent.listIndex++)
      this.addSymbol(frame, 2, arc.toString())
    },
    addBNode: function(frame, s) {
      s != null ? frame.node = this.getBlankNode(s) : frame.node = this.context.createBlankNode();
      frame.nodeType = 1;
      if(this.isTripleToLoad(frame)) this.addFrame(frame);
    },
    addCollection: function(frame) {
      frame.collection = true;
      this.addBNode(frame)
    },
    addFrame: function(frame) {
      this.add(this.createTriple(frame.parent.parent.node, frame.parent.node, frame.node));
      if(frame.rdfid != null || frame.parent.rdfid != null) {
        if(frame.parent.rdfid != null && frame.rdfid == null) frame.rdfid = frame.parent.rdfid;
        var s = frame.base.resolveReference("#".concat(frame.rdfid));
        this.add(this.createTriple(s, api.parsers.RDFXML.RDF_TYPE, api.parsers.RDFXML.RDF_STATEMENT));
        this.add(this.createTriple(s, api.parsers.RDFXML.RDF_SUBJECT, frame.parent.parent.node));
        this.add(this.createTriple(s, api.parsers.RDFXML.RDF_PREDICATE, frame.parent.node));
        this.add(this.createTriple(s, api.parsers.RDFXML.RDF_OBJECT, frame.node))
      }
    },
    addLiteral: function(frame, value) {
      frame.nodeType = 1;
      if(frame.parent.datatype != null) {
        frame.node = this.context.createTypedLiteral(value == null ? frame.element.nodeValue : value, frame.parent.datatype)
      } else {
        frame.node = this.context.createPlainLiteral(value == null ? frame.element.nodeValue : value, frame.lang)
      }
      if(this.isTripleToLoad(frame)) this.addFrame(frame)
    },
    addNode: function(frame, s) {
      this.addSymbol(frame, 1, s);
      if(this.isTripleToLoad(frame)) this.addFrame(frame)
    },
    addSymbol: function(frame, nodeType, val) {
      frame.node = frame.base.resolveReference(val);
      frame.nodeType = nodeType
    },
    buildFrame: function(parent, element) {
      var frame = {parent:parent, element:element, lastChild:0, base:null, lang:null, node:null, nodeType:null, listIndex:1, rdfid:null, datatype:null, collection:false};
      if(parent != null) {
        frame.base = parent.base;
        frame.lang = parent.lang
      }
      if(element == null || element.nodeType == 3 || element.nodeType == 4) return frame
      var d = element.getAttributeNode("xml:base");
      if(d != null) {
        frame.base = this.context.createIRI(d.nodeValue);
        element.removeAttribute("xml:base")
      }
      d = element.getAttributeNode("xml:lang");
      if(d != null) {
        frame.lang = d.nodeValue;
        element.removeAttribute("xml:lang")
      }
      var a = element.attributes;
      var i = a.length - 1;
      while(i > -1) {
        if(a.item(i).nodeName.substring(0, 3) == "xml") {
          if(a.item(i).name.substring(0, 6) == "xmlns:") {
            var c = a.item(i).nodeValue;
            if(this.base != null) {
              c = this.base.resolveReference(c).toString()
            }
            this.context.setMapping(a.item(i).name.slice(6), c)
          }
          element.removeAttributeNode(a.item(i))
        }
        i--
      }
      return frame
    },
    createTriple: function(s, p, o) { return this.context.createTriple(s, p, o) },
    getBlankNode: function(id) {
      if(this.bnHash.exists(id)) return this.bnHash.get(id)
      var bn = this.context.createBlankNode();
      this.bnHash.set(id, bn);
      return bn
    },
    isTripleToLoad: function(frame) {
      return frame.parent != null && frame.parent.parent != null && frame.nodeType == 1 && frame.parent.nodeType == 2 && frame.parent.parent.nodeType == 1
    },
    parseDOM: function(frame) {
      var dig = true;
      while(frame.parent != null) {
        var e = frame.element;
        if(e.nodeType == 3 || e.nodeType == 4) {
          this.addLiteral(frame)
        }else {
          if(!api.parsers.RDFXML.RDF_RDF.equals(this.resolveNamespaceURI(e))) {
            if(frame.parent != null && frame.parent.collection) {
              frame.parent.listIndex++;
              this.addArc(frame, api.parsers.RDFXML.RDF_FIRST);
              frame = this.buildFrame(frame, frame.element);
              frame.parent.element = null
            }
            if(frame.parent == null || frame.parent.nodeType == null || frame.parent.nodeType == 2) {
              var about = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "about");
              var rdfid = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "ID");
              if(about != null && rdfid != null) {
                throw new Error("RDFParser: " + e.nodeName + " has both rdf:id and rdf:about, only one may be specified");
              }
              if(about == null && rdfid != null) {
                this.addNode(frame, "#" + rdfid.nodeValue);
                e.removeAttributeNode(rdfid)
              }else {
                if(about == null && rdfid == null) {
                  if((about = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "nodeID")) != null) {
                    this.addBNode(frame, about.nodeValue);
                    e.removeAttributeNode(about)
                  }else {
                    this.addBNode(frame)
                  }
                }else {
                  this.addNode(frame, about.nodeValue);
                  e.removeAttributeNode(about)
                }
              }
              about = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "type");
              if(!this.resolveNamespaceURI(e).equals(api.parsers.RDFXML.RDF_DESCRIPTION)) {
                about = {nodeValue:this.resolveNamespaceURI(e)}
              }
              if(about != null) {
                this.add(this.createTriple(frame.node, api.parsers.RDFXML.RDF_TYPE, frame.base.resolveReference(about.nodeValue)));
                if(about.nodeName != null) {
                  e.removeAttributeNode(about)
                }
              }
              var f = e.attributes.length - 1;
              while(f > -1) {
                this.add(this.createTriple(frame.node, this.resolveNamespaceURI(e.attributes.item(f)), this.context.createPlainLiteral(e.attributes.item(f).nodeValue, frame.lang)));
                f--
              }
            }else {
              this.addArc(frame, this.resolveNamespaceURI(e));
              var rdfid = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "ID");
              if(rdfid != null) {
                frame.rdfid = rdfid.nodeValue;
                e.removeAttributeNode(rdfid)
              }
              var datatype = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "datatype");
              if(datatype != null) {
                frame.datatype = datatype.nodeValue;
                e.removeAttributeNode(datatype)
              }
              var c = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "parseType");
              if(c != null) {
                switch(c.nodeValue) {
                  case "Literal":
                    frame.datatype = api.parsers.RDFXML.NS_RDF + "XMLLiteral";
                    frame = this.buildFrame(frame);
                    var xml = '';
                    var ii = 0;
                    while(ii < e.childNodes.length) {
                      var tempnode = e.childNodes.item(ii++);
                      if(tempnode.nodeType == 3) {
                        xml += tempnode.nodeValue;
                      } else {
                        xml += (new XMLSerializer).serializeToString(e.firstElementChild);
                      }
                    }
                    this.addLiteral(frame, xml);
                    dig = false;
                    break;
                  case "Resource":
                    frame = this.buildFrame(frame, frame.element);
                    frame.parent.element = null;
                    this.addBNode(frame);
                    break;
                  case "Collection":
                    frame = this.buildFrame(frame, frame.element);
                    frame.parent.element = null;
                    this.addCollection(frame);
                    break
                }
                e.removeAttributeNode(c)
              }
              if(e.attributes.length != 0) {
                var f = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "resource");
                c = e.getAttributeNodeNS(api.parsers.RDFXML.NS_RDF, "nodeID");
                frame = this.buildFrame(frame);
                if(f != null) {
                  this.addNode(frame, f.nodeValue);
                  e.removeAttributeNode(f)
                }else {
                  if(c != null) {
                    this.addBNode(frame, c.nodeValue);
                    e.removeAttributeNode(c)
                  }else {
                    this.addBNode(frame)
                  }
                }
                var i = e.attributes.length - 1;
                while(i > -1) {
                  var n = this.buildFrame(frame);
                  f = e.attributes.item(i);
                  this.addArc(n, this.resolveNamespaceURI(f));
                  if(this.resolveNamespaceURI(f).equals(api.parsers.RDFXML.RDF_TYPE)) {
                    this.addNode(this.buildFrame(n), f.nodeValue)
                  }else {
                    this.addLiteral(this.buildFrame(n), f.nodeValue)
                  }
                  i--
                }
              }else {
                if(e.childNodes.length == 0) {
                  this.addLiteral(this.buildFrame(frame), "")
                }
              }
            }
          }
        }
        e = frame.element;
        while(frame.parent != null) {
          var pf = frame;
          while(e == null) {
            frame = frame.parent;
            e = frame.element
          }
          var c = e.childNodes.item(frame.lastChild);
          if(c == null || !dig) {
            if(frame.collection) {
              this.add(this.createTriple(frame.node, api.parsers.RDFXML.RDF_REST, api.parsers.RDFXML.RDF_NIL))
            }
            if((frame = frame.parent) == null) {
              break
            }
            e = frame.element;
            dig = true
          }else {
            if(c.nodeType != 1 && c.nodeType != 3 && c.nodeType != 4 || (c.nodeType == 3 || c.nodeType == 4) && e.childNodes.length != 1) {
              frame.lastChild++
            }else {
              if(frame.collection && frame.listIndex > 1) {
                var rest = this.context.createBlankNode();
                this.add(this.createTriple(frame.node, api.parsers.RDFXML.RDF_REST, rest));
                pf.node = rest
              }
              frame.lastChild++;
              frame = this.buildFrame(pf, e.childNodes.item(frame.lastChild - 1));
              break
            }
          }
        }
      }
    },
    parseStatements: function(doc) {
      this.base = this.context.base;
      var rootFrame = this.buildFrame(null, null);
      rootFrame.base = this.base;
      this.parseDOM(this.buildFrame(rootFrame, doc.documentElement));
      return true
    },
    resolveNamespaceURI: function(e) {
      if(e.namespaceURI == null) {
        throw new Error("RDF/XML syntax error: No namespace for " + e.localName + " in " + this.base);
      }
      return this.context.createIRI(e.namespaceURI + e.localName)
    }
  };
  api.parseNT = function(doc, cb, filter, graph) {
    return new api.parsers.NTriples(api.data.context).parse(doc, cb, filter, graph);
  };
  api.processNT = function(doc, cb, filter) {
    return new api.parsers.NTriples(api.data.context).process(doc, cb, filter);
  };
  api.parseTurtle = function(doc, cb, filter, graph) {
    return new api.parsers.Turtle(api.data.context).parse(doc, cb, filter, graph);
  };
  api.processTurtle = function(doc, cb, filter) {
    return new api.parsers.Turtle(api.data.context).process(doc, cb, filter);
  };
  api.parseRDFXML = function(doc, cb, filter, graph) {
    return new api.parsers.RDFXML(api.data.context).parse(doc, cb, filter, graph);
  };
  api.processRDFXML = function(doc, cb, filter) {
    return new api.parsers.RDFXML(api.data.context).process(doc, cb, filter);
  };
})(rdfapi);
/**
 * Serializers (NTriples, Turtle)
 */
(function(api) {
  if(!api.serializers) { api.serializers = {} }
  /**
   * NTriples implements DataSerializer
   */
  api.serializers.NTriples = function(context) {};
  api.serializers.NTriples.prototype = {
    serialize: function(graph) { return graph.toArray().join("\n") }
  };
  /**
   * Turtle implements DataSerializer
   */
  api.serializers.Turtle = function(context) {
    this.context = context;
    this.createPrefixMap()
  };
  api.serializers.Turtle.NS_RDF = "http://www.w3.org/1999/02/22-rdf-syntax-ns#";
  api.serializers.Turtle.RDF_TYPE = new api.IRI(api.serializers.Turtle.NS_RDF + "type");
  api.serializers.Turtle.RDF_RDF = new api.IRI(api.serializers.Turtle.NS_RDF + "RDF");
  api.serializers.Turtle.RDF_FIRST = new api.IRI(api.serializers.Turtle.NS_RDF + "first");
  api.serializers.Turtle.RDF_REST = new api.IRI(api.serializers.Turtle.NS_RDF + "rest");
  api.serializers.Turtle.RDF_NIL = new api.IRI(api.serializers.Turtle.NS_RDF + "nil");
  api.serializers.Turtle.prototype = {
    context: null, index: null, lists: null, prefixMap: null, usedPrefixes: null, nonAnonBNodes: null, skipSubjects: null,
    serialize: function(graph) {
      this.initiate();
      graph = this.suckLists(graph);
      var _ = this;
      graph.forEach(function(t, i, s) { _.addTripleToIndex(t, i, s) });
      return this.render()
    },
    addTripleToIndex: function(t, i, s) {
      if(t.object.nodeType() == "BlankNode") {
        this.nonAnonBNodes.set(t.object.toString(), this.nonAnonBNodes.exists(t.object.toString()) ? this.nonAnonBNodes.get(t.object.toString()) + 1 : 1)
      }
      var s1 = this.shrink(t.subject);
      var p = this.shrink(t.property, true);
      if(!this.index.exists(s1)) { this.index.set(s1, new api.Hash) }
      if(!this.index.get(s1).exists(p)) { this.index.get(s1).set(p, new Array) }
      this.index.get(s1).get(p).push(t.object)
    },
    anonBNode: function(subject, indent) { return this.propertyObjectChain(this.index.get(subject), indent) },
    createPrefixMap: function() {
      var m = this.context.getMapping();
      var p = this.prefixMap = new api.Hash;
      m.keys().forEach(function(k, i, a) { p.set(m.get(k).toString(), k.concat(":")) })
    },
    initiate: function() {
      this.index = new api.Hash;
      this.usedPrefixes = new Array;
      this.nonAnonBNodes = new api.Hash;
      this.skipSubjects = new Array;
      this.lists = new api.Hash
    },
    output: function(o) {
      if(o.nodeType() == "IRI") { return this.shrink(o) }
      if(o.nodeType() == "TypedLiteral") {
        if(o.type.equals(this.context.resolveCurie("xsd:integer"))) { return o.value }
        if(o.type.equals(this.context.resolveCurie("xsd:double"))) { return o.value }
        if(o.type.equals(this.context.resolveCurie("xsd:decimal"))) { return o.value }
        if(o.type.equals(this.context.resolveCurie("xsd:boolean"))) { return o.value }
        return '"' + o.value + '"^^' + this.shrink(o.type);
      }
      return o.toNT()
    },
    propertyObjectChain: function(po, indent) {
      if(!po) return;
      if(indent == null) { indent = 2 }
      var out = "";
      var _ = this;
      var properties = po.keys();
      properties.sort();
      if(properties.indexOf("a") >= 0) {
        properties.remove("a");
        properties.unshift("a")
      }
      properties.forEach(function(property, pi, pa) {
        out = out + (pi > 0 ? (new Array(indent + 1)).join(" ") : "") + property + " ";
        po.get(property).forEach(function(o, oi, oa) {
          var oindent = "";
          if(oa.length > 2) {
            oindent = "\n" + (new Array(indent + 2 + 1)).join(" ")
          }
          if(o.toString().charAt(0) == "_" && !_.nonAnonBNodes.exists(o.toString())) {
            if(_.lists.exists(o.toNT())) {
              out = out + _.renderList(o.toNT(), indent + 3)
            }else {
              out = out + oindent + "[ " + _.anonBNode(o.toString(), indent + 2 + 2) + oindent + (oa.length == 1 ? " " : "") + "]"
            }
          }else {
            out = out + oindent + _.output(o)
          }
          if(oa.length - 1 != oi) {
            if(oa.length > 2) {
              out = out + "," + (new Array(indent + 2 + 2)).join(" ")
            }else {
              out = out + ", "
            }
          }
        });
        out = out + (pa.length - 1 == pi ? "" : ";\n")
      });
      return out
    },
    render: function() {
      var out = new Array;
      var _ = this;
      this.skipSubjects = this.nonAnonBNodes.keys();
      this.nonAnonBNodes.keys().forEach(function(k, i, a) { if(_.nonAnonBNodes.get(k) == 1) { _.nonAnonBNodes.remove(k) } });
      this.index.keys().forEach(function(subject, $is, $as) {
        var single = "";
        if(subject.charAt(0) == "_") {
          if(!_.nonAnonBNodes.exists(subject) && _.skipSubjects.indexOf(subject) == -1) {
            if(_.lists.exists(subject)) {
              single = _.renderList(subject, 2) + " " + _.propertyObjectChain(_.index.get(subject))
            } else {
              single = "[ " + _.anonBNode(subject, 2) + "\n]"
            }
          }
        } else {
          single = subject + " " + _.propertyObjectChain(_.index.get(subject))
        }
        if(single.length > 0) { out.push(single + " .\n") }
      });
      if(this.usedPrefixes.length > 0) {
        var invertedMap = new api.Hash;
        this.prefixMap.keys().forEach(function(k, i, h) { if(_.usedPrefixes.indexOf(k)>= 0) { invertedMap.set(_.prefixMap.get(k), k) } });
        var prefixes = invertedMap.keys();
        prefixes.sort();
        prefixes.reverse();
        out.unshift("");
        prefixes.forEach(function(s, i, a) { out.unshift("@prefix " + s + " <" + invertedMap.get(s) + "> .") })
      }
      return out.join("\n")
    },
    renderList: function(o, indent) {
      var _ = this;
      var list = new Array;
      _.lists.get(o).forEach(function(n, i, a) { list.push(_.output(n)) });
      var lis = new Array;
      var liststring = "";
      while(list.length > 0) {
        var li = list.shift();
        if(liststring.length + li.length < 75) {
          liststring = liststring.concat(li + " ")
        } else {
          lis.push(liststring);
          liststring = li + " "
        }
      }
      lis.push(liststring);
      var nl = lis.length == 1 ? " " : "\n" + (new Array(indent)).join(" ");
      return"(" + nl + lis.join(nl) + (lis.length == 1 ? "" : "\n") + ")"
    },
    shrink: function(n, property) {
      if(property == null) { property = false }
      if(property && n.equals(api.serializers.Turtle.RDF_TYPE)) { return "a" }
      if(n.equals(api.serializers.Turtle.RDF_NIL)) { return "()" }
      var _g = 0, _g1 = this.prefixMap.keys();
      while(_g < _g1.length) {
        var i = _g1[_g];
        ++_g;
        if(i == n.value.substring(0, i.length)) {
          if(this.usedPrefixes.indexOf(i) == -1) { this.usedPrefixes.push(i) }
          return n.value.replace(i, this.prefixMap.get(i))
        }
      }
      return n.toNT()
    },
    suckLists: function(graph) {
      var sFilter = function(n) { return function(t, i, s) { return t.subject.equals(n) } };
      var pFilter = function(n) { return function(t, i, s) { return t.property.equals(n) } };
      var poFilter = function(p, o) { return function(t, i, s) { return t.property.equals(p) && t.object.equals(o) } };
      var tFilter = function(a) { return function(t, i, s) { return!(t.subject.equals(a.subject) && t.property.equals(a.property) && t.object.equals(a.object)) } };
      var members = graph.filter(function(t, i, s) { return t.property.equals(api.serializers.Turtle.RDF_FIRST) || t.property.equals(api.serializers.Turtle.RDF_REST) });
      members.forEach(function(t, i, s) { graph = graph.filter(tFilter(t)) });
      var ends = members.filter(function(t, i, s) { return t.object.equals(api.serializers.Turtle.RDF_NIL) });
      var _ = this;
      ends.forEach(function(n, i, s) {
        var tmplist = new Array;
        var q = n;
        var start = null;
        while(q != null) {
          start = q.subject;
          tmplist.unshift(members.filter(sFilter(start)).filter(pFilter(api.serializers.Turtle.RDF_FIRST)).toArray().pop().object);
          members = members.filter(function(t, i1, s1) { return!t.subject.equals(start) });
          q = members.filter(poFilter(api.serializers.Turtle.RDF_REST, start)).toArray().pop()
        }
        _.lists.set(start.toNT(), tmplist)
      });
      return graph
    }
  };
  api.nt = function(graph) { return new api.serializers.NTriples(api.data.context).serialize(graph); };
  api.turtle = function(graph) { return new api.serializers.Turtle(api.data.context).serialize(graph); };
})(rdfapi);
/**
 * rdfapi.filters
 */
(function(api) {
  api.filters = {
    s: function(s) { return function(t) { return s.equals(t.subject); }; },
    p: function(p) { return function(t) { return p.equals(t.property); }; },
    o: function(o) { return function(t) { return o.equals(t.object); }; },
    sp: function(s,p) { return function(t) { return s.equals(t.subject) && p.equals(t.property); }; },
    so: function(s,o) { return function(t) { return s.equals(t.subject) && o.equals(t.object); }; },
    po: function(p,o) { return function(t) { return p.equals(t.property) && o.equals(t.object); }; },
    spo: function(s,p,o) { return function(t) { return s.equals(t.subject) && p.equals(t.property) && o.equals(t.object); }; },
    describes: function(resource) { return function(t) { return resource.equals(t.subject) || resource.equals(t.object); }; }
  };
})(rdfapi);
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