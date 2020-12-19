module.exports = function (app, db) {
  // Add new surgery
  // http://localhost:4300/surgery/
  // Sending a JSON body:
  // {
  //   "label": "Fimose"
  // }
  app.post("/surgery/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    insertSurgery(req.body, res, db);
  });
};

function insertSurgery(surgery, res, db) {
  var values = [surgery.label];

  var sql = `insert into surgeries (label) 
            VALUES 
            (?);`;

  db.serialize(function () {
    db.run(sql, values, function (err) {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else res.send();
    });
  });
}
