// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework
// Copyright: ©2011 OpenMFG LLC, d/b/a xTuple
// ==========================================================================
/*globals XM */

/** @class

  (Document your Model here)

  @extends XT.Object
  @version 0.1
*/

XM.CrmSettings = XT.Object.extend(XM.Settings,
/** @scope XM.CrmSettings.prototype */ {
  
  className: 'XM.CrmSettings',
  
  privilege: 'ConfigureCRM',
  
  /**
    @type String
  */  
  accountNumberGenerationBinding: SC.Binding.from('*settings.CRMAccountNumberGeneration').noDelay(),
    
  /**
    @type Number
  */
  nextAccountNumberBinding: SC.Binding.from('*settings.NextCRMAccountNumber').noDelay(),

  /**
    @type Number
  */  
  nextIncidentNumberBinding: SC.Binding.from('*settings.NextIncidentNumber').noDelay(),
  
  /**
    @type Boolean
  */
  isUseProjectsBinding: SC.Binding.from('*settings.UseProjects').noDelay(),
 
  /**
    @type Boolean
  */ 
  isAutoCreateProjectsForOrdersBinding: SC.Binding.from('*settings.AutoCreateProjectsForOrders').noDelay(),
  
  /**
    @type Boolean
  */
  isAutoCreateProjectsForOrdersEnabled: function() {
    return this.get('isUseProjects');
  }.property('isUseProjects').cacheable(),
  
  /**
    @type Boolean
  */
  isOpportunityChangeLogBinding: SC.Binding.from('*settings.OpportunityChangeLog').noDelay(),

  /**
    @type Boolean
  */  
  isIncidentsPublicPrivateBinding: SC.Binding.from('*settings.IncidentsPublicPrivate').noDelay(),

  /**
    @type Boolean
  */  
  isIncidentPublicDefaultBinding: SC.Binding.from('*settings.IncidentPublicDefault').noDelay(),

  /**
    @type String
  */  
  incidentNewColorBinding: SC.Binding.from('*settings.IncidentNewColor').noDelay(),
  
  /**
    @type String
  */
  incidentFeedbackColorBinding: SC.Binding.from('*settings.IncidentFeedbackColor').noDelay(),

  /**
    @type String
  */
  incidentConfirmedColorBinding: SC.Binding.from('*settings.IncidentConfirmedColor').noDelay(),

  /**
    @type String
  */
  incidentAssignedColorBinding: SC.Binding.from('*settings.IncidentAssignedColor').noDelay(),
  
  /**
    @type String
  */
  incidentResolvedColorBinding: SC.Binding.from('*settings.IncidentResolvedColor').noDelay(),
  
  /**
    @type String
  */
  incidentClosedColorBinding: SC.Binding.from('*settings.IncidentClosedColor').noDelay(),
  
  /**
    @type String
  */
  isDefaultAddressCountryBinding: SC.Binding.from('*settings.DefaultAddressCountry').noDelay(),

  /**
    @type Boolean
  */
  isStrictAddressCountryBinding: SC.Binding.from('*settings.StrictAddressCountry').noDelay(),
  
  /**
    @type Boolean
  */
  isStrictAddressCountryEnabled: function() {
    var isStrict = this.get('isStrictAddressCountry'),
        isChanged = XT.session.getPath('settings.changed').indexOf('StrictAddressCountry') > 0;
    
    // strict setting is irreversible once turned on and committed
    return isStrict && !isChanged ? false : true;
  }.property('isStrictAddressCountry').cacheable(),
  
  // ..........................................................
  // OBSERVERS
  //
  
  /** @private */
  _useProjectsDidChange: function() {
    if(!this.get('isUseProjects')) this.set('isAutoCreateProjectsForOrders', false);
  }.observes('isUseProjects', 'isAutoCreateProjectsForOrders'),
  
  /** @private */
  _isStrictAddressCountryDidChange: function() {
    var isStrict = this.get('isStrictAddressCountry'),
        isChanged = XT.session.getPath('settings.changed').indexOf('StrictAddressCountry') > 0;
    
    // strict setting is irreversible once turned on and committed
    if(isStrict && !isChanged) this.set('isStrictAddressCountry', true);
  }.observes('isStrictAddressCountry')
  
}) ;

XM.crmSettings = XM.CrmSettings.create();

