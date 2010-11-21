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
