/*jshint indent:2, curly:true eqeqeq:true, immed:true, latedef:true, 
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true
white:true*/
/*global XT:true, XM:true, Backbone:true, _:true, console:true */

(function () {
  "use strict";

  /**
    @class
  
    @extends XM.Document
  */
  XM.OpportunityType = XM.Document.extend({
    /** @scope XM.OpportunityType.prototype */

    recordType: 'XM.OpportunityType',

    documentKey: 'name',

    privileges: {
      "all": {
        "create": "MaintainOpportunityTypes",
        "read": true,
        "update": "MaintainOpportunityTypes",
        "delete": "MaintainOpportunityTypes"
      }
    }

  });

  /**
    @class
  
    @extends XM.Document
  */
  XM.OpportunityStage = XM.Document.extend({
    /** @scope XM.OpportunityStage.prototype */

    recordType: 'XM.OpportunityStage',

    documentKey: 'name',

    privileges: {
      "all": {
        "create": "MaintainOpportunityStages",
        "read": true,
        "update": "MaintainOpportunityStages",
        "delete": "MaintainOpportunityStages"
      }
    },

    defaults: {
      deactivate: false
    },

    requiredAttributes: [
      "deactivate"
    ]

  });

  /**
    @class
  
    @extends XM.Document
  */
  XM.OpportunitySource = XM.Document.extend({
    /** @scope XM.OpportunitySource.prototype */

    recordType: 'XM.OpportunitySource',

    documentKey: 'name',

    privileges: {
      "all": {
        "create": "MaintainOpportunitySources",
        "read": true,
        "update": "MaintainOpportunitySources",
        "delete": "MaintainOpportunitySources"
      }
    }

  });

  /**
    @class
  
    @extends XM.Document
  */
  XM.Opportunity = XM.Document.extend({
    /** @scope XM.OpportunityInfo.prototype */

    recordType: 'XM.Opportunity',

    numberPolicy: XM.Document.AUTO_NUMBER,

    defaults: {
      isActive: true
    },

    requiredAttributes: [
      "account",
      "name",
      "isActive",
      "opportunityStage",
      "opportunitySource",
      "opportunityType"
    ],

    // ..........................................................
    // METHODS
    //

    initialize: function () {
      XM.Document.prototype.initialize.apply(this, arguments);
      this.on('change:assignedTo', this.assignedToDidChange);
    },

    assignedToDidChange: function (model, value, options) {
      var status = this.getStatus(),
        K = XT.Model,
        assignedTo,
        assignDate;
      if ((options && options.force) || !(status & K.READY)) { return; }

      // Set the assign date if it hasn't been already
      assignedTo = this.get('assignedTo');
      assignDate = this.get('assignDate');
      if (assignedTo && !assignDate) {
        this.set('assignDate', new Date());
      }
    }

  });

  /**
    @class
  
    @extends XM.Comment
  */
  XM.OpportunityComment = XM.Comment.extend({
    /** @scope XM.OpportunityComment.prototype */

    recordType: 'XM.OpportunityComment'

  });

  /**
    @class
  
    @extends XM.Characteristic
  */
  XM.OpportunityCharacteristic = XM.Characteristic.extend({
    /** @scope XM.OpportunityCharacteristic.prototype */

    recordType: 'XM.OpportunityCharacteristic'

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityAccount = XT.Model.extend({
    /** @scope XM.OpportunityAccount.prototype */

    recordType: 'XM.OpportunityAccount',

    isDocumentAssignment: true

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityContact = XT.Model.extend({
    /** @scope XM.OpportunityContact.prototype */

    recordType: 'XM.OpportunityContact',

    isDocumentAssignment: true

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityItem = XT.Model.extend({
    /** @scope XM.OpportunityItem.prototype */

    recordType: 'XM.OpportunityItem',

    isDocumentAssignment: true

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityFile = XT.Model.extend({
    /** @scope XM.OpportunityFile.prototype */

    recordType: 'XM.OpportunityFile',

    isDocumentAssignment: true

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityImage = XT.Model.extend({
    /** @scope XM.OpportunityImage.prototype */

    recordType: 'XM.OpportunityImage',

    isDocumentAssignment: true

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityUrl = XT.Model.extend({
    /** @scope XM.OpportunityUrl.prototype */

    recordType: 'XM.OpportunityUrl',

    isDocumentAssignment: true

  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityOpportunity = XT.Model.extend({
    /** @scope XM.OpportunityOpportunity.prototype */

    recordType: 'XM.OpportunityOpportunity',

    isDocumentAssignment: true
    
  });

  /**
    @class
  
    @extends XT.Model
  */
  XM.OpportunityInfo = XT.Model.extend({
    /** @scope XM.OpportunityInfo.prototype */

    recordType: 'XM.OpportunityInfo',

    readOnly: true

  });

  // ..........................................................
  // COLLECTIONS
  //

  /**
    @class
  
    @extends XT.Collection
  */
  XM.OpportunityTypeCollection = XT.Collection.extend({
    /** @scope XM.OpportunityTypeCollection.prototype */

    model: XM.OpportunityType

  });

  /**
    @class
  
    @extends XT.Collection
  */
  XM.OpportunityStageCollection = XT.Collection.extend({
    /** @scope XM.OpportunityStageCollection.prototype */

    model: XM.OpportunityStage

  });

  /**
    @class
  
    @extends XT.Collection
  */
  XM.OpportunitySourceCollection = XT.Collection.extend({
    /** @scope XM.OpportunitySourceCollection.prototype */

    model: XM.OpportunitySource

  });

  /**
    @class
  
    @extends XT.Collection
  */
  XM.OpportunityInfoCollection = XT.Collection.extend({
    /** @scope XM.OpportunityInfoCollection.prototype */

    model: XM.OpportunityInfo

  });

}());