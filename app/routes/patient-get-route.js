module.exports = function (app, db) {
  // Load patient by ID: http://localhost:4300/patient/$id
  // example: http://localhost:4300/patient/15
  app.get("/patient/:id", (req, res) => {
    processData(res, "SELECT * FROM patients where id == " + req.params.id);
  });

  // Load all patients: http://localhost:4300/patient/
  app.get("/patient/", (req, res) => {
    processData(res, "SELECT * FROM patients");
  });

  // Load all patients: http://localhost:4300/patient/
  app.get("/timeline", (req, res) => {
    const sql = `select COUNT(id), 
    strftime("%m-%Y", birth_date) as 'month-year' 
    from Patients group by strftime("%m-%Y", birth_date)`;
    processData(res, sql);
  });

  function processData(res, sql) {
    db.serialize(function () {
      db.all(sql, function (err, rows) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else sendData(res, rows, err);
      });
    });
  }

  function sendData(res, data, err) {
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (data[0]) res.send(data);
    else {
      res.status(404).send("Patient not found");
    }
  }
};
