const UserModel = require('./model');

exports.all = function (req, res) {
  UserModel.all((err, docs) => {
    if (err) {
      console.log(err);
      return res.sendStatus(500);
    }
    res.send(docs);
  });
};
