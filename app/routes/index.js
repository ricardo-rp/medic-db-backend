const getRoutes = require('./patient-get-route');
const postRoutes = require('./patient-post-route');
const putRoutes = require('./patient-put-route');
const deleteRoutes = require('./patient-delete-route');
const loadDatabase = require('../data/setup-database');

module.exports = function (app, db) {

  // create database in case it was not created yeat, 
  // or update in case of migrations
  loadDatabase(db);

  // start routes
  getRoutes(app, db);
  postRoutes(app, db);
  putRoutes(app, db);
  deleteRoutes(app, db);

};
