const database = require('../../database/database');

const getUsers = (callback) => {
  const sql = 'SELECT * FROM Users';
  database.appDatabase.all(sql, [], (error, rows) => {
    if (error) {
      console.error(error.message);
    }
    callback(rows);
  });
};

const createUser = (username, email, callback) => {
  const sql = `INSERT INTO Users (name, email) VALUES ('${username}', '${email}')`;
  database.appDatabase.run(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = 'The task was entered successfully.';
    callback(successMessage);
  });
};

const getUser = (id, callback) => {
  const sql = `SELECT * FROM Users WHERE id = ${id}`;
  database.appDatabase.get(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    callback(row);
  });
};

const deleteUser = (id, callback) => {
  const sql = `DELETE FROM Users WHERE id = ${id}`;
  database.appDatabase.run(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = 'The user was successfully deleted.';
    callback(successMessage);
  });
};

const updateUser = (user, email, id, callback) => {
  const sql = `UPDATE Users SET name = '${user}', email = '${email}' WHERE (id = ${id})`;
  database.appDatabase.run(sql, [], (error, row) => {
    if (error) {
      callback(error.message);
    }
    const successMessage = 'The user was successfully updated.';
    callback(successMessage);
  });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
