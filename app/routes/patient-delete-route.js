module.exports = function (app, db) {
  // Delete a patient
  // http://localhost:4300/patient
  app.delete("/patient/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    updateProduct(req, res, db);
  });
};

function updateProduct(req, res, db) {
  var id = req.params.id;

  if (!id) {
    res.status(400).send("ID is mandatory");
  } else {
    var sql = `delete from Patients where id = ?;`;
    var values = [id];

    db.serialize(function () {
      db.run(sql, values, function (err) {
        if (err) {
          console.error(err);
          res.status(500).send(err);
        } else res.send();
      });
    });
  }
}
