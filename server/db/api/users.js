const connection = require("../config");

function getUser(byId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE id = ${byId}`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function login({ email }) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users WHERE email = "${email}"`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function signup({
  first_name,
  last_name,
  email,
  password,
  phone,
  address,
  role_id = 2,
}) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO users 
                        (first_name, last_name, email, password,phone,address,role_id) 
                        VALUES 
                        ('${first_name}', '${last_name}', '${email}', '${password}', '${phone}', '${address}', ${role_id});`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function checkingEmailOnDB(email) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM users where email = '${email}';`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function userProfileUpdate(byId, value, name) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE users SET ${name} = '${value}' WHERE id = ${byId};`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function getAllUsers() {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM users;`, (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function getAllItems() {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT I.*,IM.url FROM items I JOIN images IM on i.id = IM.item_id group by I.id;`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function getUserWishList(byId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT I.*,IM.url FROM wish_list W join items I ON W.item_id=I.id 
		join images IM on IM.item_id = I.id
		Where W.user_id = ${byId} group by I.id;`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function addItemToWishList(item_id, user_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO wish_list (user_id, item_id) VALUES (${user_id}, ${item_id});`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

function removeItemWishList(item_id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `DELETE FROM wish_list WHERE item_id = ${parseInt(item_id)};`,
      (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      }
    );
  });
}

module.exports = {
  getUser,
  login,
  signup,
  checkingEmailOnDB,
  userProfileUpdate,
  getAllUsers,
  getAllItems,
  getUserWishList,
  addItemToWishList,
  removeItemWishList,
};
