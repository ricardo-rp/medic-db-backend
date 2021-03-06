module.exports = function (app, db) {
  // Load all surgeries: http://localhost:4300/surgery/
  app.get("/surgery/", (req, res) => {
    processData(res, "SELECT * FROM surgeries");
  });

  app.get("/surgery/count", (req, res) => {
    var sql = `
    SELECT
      Surgeries.label,
      Count(Patients.surgery_id) as cnt
    FROM
      Surgeries
    INNER JOIN
      Patients
    ON
      Surgeries.id=Patients.surgery_id
    GROUP BY
      Surgeries.id
    ORDER BY
      cnt DESC
    `;
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
      res.status(404).send("No surgeries found");
    }
  }
};
