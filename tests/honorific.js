/*global XM global require */

var vows = require('vows'),
    assert = require('assert');

require('sys');

/** Add some generic topics **/

vows.record = {};

vows.record.commit = function (status) {
  return function (record) {
    vows.record._handleAction(record, status, record.commitRecord, this.callback);
  };
};

vows.record.refresh = function () {
  return function (record) {
    vows.record._handleAction(record, SC.Record.READY_CLEAN, record.refresh, this.callback);
  };
};

vows.record.destroy = function () {
  return function (record) {
    return record.destroy();
  };
};

/* @private */
vows.record._handleAction = function(record, status, action, callback) {
    var timeoutId,
        sts = status ? status : SC.Record.READY_CLEAN;
    
    record.addObserver('status', record, function observer() {
      if (record.get('status') === sts) {
        clearTimeout(timeoutId);
        record.removeObserver('status', record, observer);
        callback(null, record); // return the record
      }
    });

    timeoutId = setTimeout(function() {
      callback(null, record);
    }, 5000); // five seconds

    action.call(record);
};

/** Add some SC specific tests */

assert.isKindOf = function (actual, expected, message) {
  if (! SC.kindOf(actual, expected)) {
    assert.fail(actual, expected, message || "expected {actual} to be a {expected}", "kindOf", assert.isKindOf);
  }
};

assert.status = function (status) {
  return function (err, record) {
      assert.equal (record.get('status'), status);
  };
};

assert.property = function (prop, value) {
  return function (err, record) {
      assert.equal (record.get(prop), value);
  };
};

var honorificSuite = vows.describe('XT Core Honorific Tests');

honorificSuite.addBatch({
  "XM.Honorific": {
    "Validate Class" : {
      topic: function() {
        return XM.Honorific;
      },
      'is not null': function (recordType) {
        assert.isNotNull(recordType);
      },
      'is of type SC.Record': function(recordType) {
        assert.isKindOf(recordType, SC.Record);
      }
    },
    "-> CREATE" : {
      topic: function(record) {
        return XM.store.createRecord(XM.Honorific, { guid: 1999, code: 'Sr'}).normalize();
      },
      'status is READY_NEW' : assert.status(SC.Record.READY_NEW),
      'code is "Sr"' : assert.property('code','Sr'),
      "-> commit" : {
        topic: vows.record.commit(),
        'status is READY_CLEAN' : assert.status(SC.Record.READY_CLEAN),
        "-> READ" : {
          topic: vows.record.refresh(),
          'status is READY_CLEAN' : assert.status(SC.Record.READY_CLEAN),
          'code is "Sr"' : assert.property('code','Sr'),
          "-> UPDATE" : {
            topic: function(record) {
              record.set('code','Sra');
              
              return record;
            },
            'status is READY_DIRTY' : assert.status(SC.Record.READY_DIRTY),
            'code is "Sra"' : assert.property('code','Sra'),
            "-> commit" : {
              topic: vows.record.commit(),
              'status is READY_CLEAN' : assert.status(SC.Record.READY_CLEAN),
              "-> READ" : {
                topic: vows.record.refresh(),
                'status is READY_CLEAN' : assert.status(SC.Record.READY_CLEAN),
                'code is "Sra"' : assert.property('code','Sra'),
                "-> DELETE" : {
                  topic: vows.record.destroy(),
                  'status is DESTROYED_DIRTY' : assert.status(SC.Record.DESTROYED_DIRTY),
                  "-> commit" : {
                    topic: vows.record.commit(SC.Record.DESTROYED_CLEAN),
                    'status is DESTROYED_CLEAN' : assert.status(SC.Record.DESTROYED_CLEAN)
                  }
                }
              }
            }
          }
        }
      }
    }
  }
});

module.exports = honorificSuite;