module.exports = function (app, db) {
  // Add new status
  // http://localhost:4300/surgery/
  // Sending a JSON body:
  // {
  //   "label": "Alta"
  // }
  app.post("/status/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");

    insertStatus(req.body, res, db);
  });
};

function insertStatus(surgery, res, db) {
  var values = [surgery.label];

  var sql = `insert into Status (label) 
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
