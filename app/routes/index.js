const patientGet = require("./patient-get-route");
const patientPost = require("./patient-post-route");
const patientPut = require("./patient-put-route");
const patientDelete = require("./patient-delete-route");
const surgeryGet = require("./surgery-get-route");
const surgeryPost = require("./surgery-post-route");
const surgeryDelete = require("./surgery-delete-route");
const surgeryPut = require("./surgery-put-route");
const statusGet = require("./status-get-route");
const statusPost = require("./status-post-route");
const loadDatabase = require("../data/setup-database");

module.exports = function (app, db) {
  // create database in case it was not created yeat,
  // or update in case of migrations
  loadDatabase(db);

  // patient routes
  patientGet(app, db);
  patientPost(app, db);
  patientPut(app, db);
  patientDelete(app, db);

  // surgery routes
  surgeryGet(app, db);
  surgeryPost(app, db);
  surgeryDelete(app, db);
  surgeryPut(app, db);

  // status routes
  statusGet(app, db);
  statusPost(app, db);
};
