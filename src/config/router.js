const express = require('express');
const db = require('../server/db');
const UserController = require('../components/user/controller');

const router = express.Router();

router.route('/')
  .get(UserController.all)
  // .get((req, res) => {
  //   // res.status(200).json(Object.keys(req.body)[0]);
  //   // const email = JSON.parse(req.body);
  //   // console.log(email);
  //   res.send(db);
  // })
  .post((req, res) => {
    res.status(200).json(req.body);
    db.push(req.body);
    console.log(db);
  })
  .delete((req, res) => {
    res.status(200).json(req.body);
  })
  .patch((req, res) => {
    res.status(200).json(req.body);
  });

module.exports = router;
