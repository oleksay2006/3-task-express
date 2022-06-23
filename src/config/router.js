const express = require('express');
const UserController = require('../components/user/controller');

const router = express.Router();

router.get('/v1/user', UserController.user_index);
router.get('/v1/user', (request, response) => {
  response.render('index');
});
router.get('/v1/user/create', UserController.user_create_get);
router.post('/v1/user/create', UserController.user_create_post);

router.get('/v1/user/delete/:id', UserController.user_delete_get);
router.post('/v1/user/delete/:id', UserController.user_delete_post);
router.get('/v1/user/update/:id', UserController.user_update_get);
router.post('/v1/user/update/:id', UserController.user_update_post);

module.exports = router;
