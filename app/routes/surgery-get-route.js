module.exports = function (app, db) {
  // Load all surgeries: http://localhost:4300/surgery/
  app.get("/surgery/", (req, res) => {
    processData(res, "SELECT * FROM surgeries");
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
