// ==========================================================================
// Project:   xTuple Postbooks - Business Management System Framework
// Copyright: ©2011 OpenMFG LLC, d/b/a xTuple
// ==========================================================================
/*globals global Postbooks XM XT sc_assert */

Postbooks.CRM = SC.State.design({

  initialSubstate: 'DUMMY',

  enterState: function() {
    if (this.__movingUp__) {
      this.__movingUp__ = false;

      // Clear the selection. This is somewhat tricky to find...
      var listView = this.listContainer.get('contentSurface');
      if (listView) listView.set('selection', SC.IndexSet.create().freeze());
      return;
    }

    SC.routes.set('location', 'crm');

    // Postbooks.LoadModule("CRM", 'Contact Account Opportunity Incident Project'.w());
    Postbooks.LoadModule("CRM", 'Contact Account Incident Project'.w(), this); // FIXME: Opporunity hangs the app.
  },

  exitState: function() {
    if (this.__movingUp__) return;
    SC.app.get('ui').popSurface();
  },

  // ACTIONS

  showCRM: function() {
    // Do nothing.
  },

  showDashboard: function() {
    this.gotoState('DASHBOARD');
  },

  showContact: function() {
    this.gotoState('CONTACT');
  },

  showAccount: function() {
    this.gotoState('ACCOUNT');
  },

  showIncident: function() {
    this.gotoState('INCIDENT');
  },

  showProject: function() {
    this.gotoState('PROJECT');
  },

  // SUBSTATES

  "DUMMY":    SC.State, // HACK: Prevent "missing initial state" error message from SC.
  "CONTACT":  SC.State.plugin('Postbooks.CONTACT'),
  "ACCOUNT":  SC.State.plugin('Postbooks.ACCOUNT'),
  "INCIDENT": SC.State.plugin('Postbooks.INCIDENT'),
  "PROJECT":  SC.State.plugin('Postbooks.PROJECT')

});