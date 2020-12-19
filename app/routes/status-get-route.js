module.exports = function (app, db) {
  // Load all surgeries: http://localhost:4300/surgery/
  app.get("/status/", (req, res) => {
    processData(res, "SELECT * FROM status");
  });

  app.get("/status/count", (req, res) => {
    var sql = `
    SELECT
      Status.label,
      Count(Patients.status_id) as cnt
    FROM
      Status
    INNER JOIN
      Patients
    ON
      Status.id=Patients.status_id
    GROUP BY
      Status.id
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
      res.status(404).send("No status found");
    }
  }
};
