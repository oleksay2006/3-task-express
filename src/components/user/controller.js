const UserValidator = require('../../validation/userValidator');

const UserModel = require('./model');

function user_index(request, response) {
  UserModel.getUsers((queryResult) => {
    response.render('index', { users: queryResult });
  });
}

function user_create_get (request, response) {
  response.render('create', { user: {}, UserAndEmail: '', EmailError: '', UserError: '' });
}

function user_create_post (request, response) {
  const name = request.body.name;
  const email = request.body.email;
  const body = {
    name,
    email,
  };
  const { error, value } = UserValidator.schema.validate(body);
  if (error) {
    if (error._original.name === '' && error._original.email === '') {
      const UserAndEmail = 'This fields are required';
      return response.render('create', { user: body, EmailError: '', UserError: '', UserAndEmail });
    }
    if (error.details[0].message.includes('name') && !error.details[0].message.includes('email')) {
      const UserError = error.details[0].message;
      return response.render('create', { user: body, EmailError: '', UserError, UserAndEmail: '' });
    }
    if (!error.details[0].message.includes('name') && error.details[0].message.includes('email')) {
      const EmailError = error.details[0].message;
      return response.render('create', { user: body, EmailError, UserError: '', UserAndEmail: '' });
    }
  }
  UserModel.createUser(name, email, (result) => {
    response.redirect('/v1/user');
  });
}

const user_delete_get = (request, response) => {
  const id = request.params.id;
  UserModel.getUser(id, (result) => {
    response.render('delete', { user: result });
  });
};
const user_delete_post = (request, response) => {
  const id = request.params.id;
  UserModel.deleteUser(id, () => {
    response.redirect('/v1/user');
  });
};
const user_update_get = (request, response) => {
  const id = request.params.id;
  UserModel.getUser(id, (result) => {
    response.render('update', { user: result, UserAndEmail: '', EmailError: '', UserError: '' });
  });
};
const user_update_post = (request, response) => {
  const id = +request.params.id;
  const { error, value } = UserValidator.schema.validate(request.body);
  const body = {
    ...request.body,
    id,
  };
  if (error) {
    if (error._original.name === '' && error._original.email === '') {
      const UserAndEmail = 'This fields are required';
      return response.render('update', { user: body, EmailError: '', UserError: '', UserAndEmail });
    }
    if (error.details[0].message.includes('name') && !error.details[0].message.includes('email')) {
      const UserError = error.details[0].message;
      return response.render('update', { user: body, EmailError: '', UserError, UserAndEmail: '' });
    }
    if (!error.details[0].message.includes('name') && error.details[0].message.includes('email')) {
      const EmailError = error.details[0].message;
      return response.render('update', { user: body, EmailError, UserError: '', UserAndEmail: '' });
    }
  }
  const user = request.body.name;
  const email = request.body.email;
  UserModel.updateUser(user, email, id, () => {
    response.redirect('/v1/user');
  });
};

module.exports = {
  user_index,
  user_create_get,
  user_create_post,
  user_delete_get,
  user_delete_post,
  user_update_get,
  user_update_post
};
