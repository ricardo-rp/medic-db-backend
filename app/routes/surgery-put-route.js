module.exports = function (app, db) {
  // Update a surgery
  // http://localhost:4300/surgery
  app.put("/surgery/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    updateSurgery(req.body, res, req, db);
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

function updateSurgery(surgery, res, req, db) {
  var values = [
    surgery.label,
    req.params.id,
  ];

  var sql = `update surgeries set label = ? where id = ?;`;

  db.serialize(function () {
    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
}
