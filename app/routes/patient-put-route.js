module.exports = function (app, db) {
  // Update a patient
  // http://localhost:4300/patient
  app.put("/patient/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    updatePatient(req.body, res, req, db);
  });
};

function checkIfExists(res, db, sql) {
  db.serialize(function () {
    db.all(sql, function (err, rows) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
        return false;
      }
      return true;
    });
  });
}

function updatePatient(patient, res, req, db) {
  var values = [
    patient.full_name,
    patient.birth_date,
    patient.mother_name,
    patient.city,
    patient.handbook_number,
    patient.bed_number,
    patient.sex,
    patient.status_id,
    patient.surgery_id,
    patient.weight,
    req.params.id,
  ];

  var sql = `update Patients
            set full_name = ?, birth_date = ?, mother_name = ?, city = ?, handbook_number = ?, bed_number = ?, sex = ?, status_id = ?, surgery_id = ?, weight = ?
            where id = ?;`;

  db.serialize(function () {
    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
}
