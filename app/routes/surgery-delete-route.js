module.exports = function (app, db) {
  // Delete a surgery
  // http://localhost:4300/surgery
  app.delete("/surgery/:id", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    deleteSurgery(req, res, db);
  });
};

function deleteSurgery(req, res, db) {
  var id = req.params.id;

  if (!id) {
    res.status(400).send("ID is mandatory");
  } else {
    var sql = `delete from surgeries where id = ?;`;
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
