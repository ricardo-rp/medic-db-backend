module.exports = function (app, db) {
  // Add new patient
  // http://localhost:4300/api/patient
  // Sending a JSON body:
  // {
  //   "fullName": "Janeen Wasson",
  //   "birthDate": "2020-05-28 16:27:53",
  //   "motherName": "Druci Hegley",
  //   "city": "Trinidad",
  //   "handbookNumber": 796,
  //   "sex": "F",
  //   "statusId": 0,
  //   "surgeryId": 0,
  //   "weight": 10,
  //   "bedNumber": 37
  // }
  app.post("/patient/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    insertPatient(req.body, res, db);
  });
};

function insertPatient(patient, res, db) {
  var values = [
    patient.fullName,
    patient.birthDate,
    patient.motherName,
    patient.city,
    patient.handbookNumber,
    patient.bedNumber,
    patient.sex,
    patient.statusId,
    patient.surgeryId,
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
