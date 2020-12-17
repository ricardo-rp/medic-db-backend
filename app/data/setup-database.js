var fs = require("fs");
var patientSchema = fs
  .readFileSync("app/data/schema/patient-schema.sql")
  .toString();
var statusSchema = fs
  .readFileSync("app/data/schema/status-schema.sql")
  .toString();
var surgerySchema = fs
  .readFileSync("app/data/schema/surgery-schema.sql")
  .toString();

module.exports = function (db) {
  db.serialize(function () {
    db.run(patientSchema);
    db.run(statusSchema);
    db.run(surgerySchema);
  });
};
