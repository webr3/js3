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
