module.exports = function (app, db) {
  // Add new patient
  // http://localhost:4300/api/patient
  // Sending a JSON body:
  // {
  //   "full_name": "Janeen Wasson",
  //   "birth_date": "2020-05-28 16:27:53",
  //   "mother_name": "Druci Hegley",
  //   "city": "Trinidad",
  //   "handbook_number": 796,
  //   "sex": "F",
  //   "status_id": 0,
  //   "surgery_id": 0,
  //   "weight": 10,
  //   "bed_number": 37
  // }
  app.post("/patient/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    insertPatient(req.body, res, db);
  });
};

function insertPatient(patient, res, db) {
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
  ];

  var sql = `insert into Patients (full_name, birth_date, mother_name, city, handbook_number, bed_number, sex, status_id, surgery_id, weight) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`;

  db.serialize(function () {
    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
}
