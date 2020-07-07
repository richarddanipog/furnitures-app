const connection = require("../config");
const Builder = require("./builder");

function getItems({
  maxPrice,
  minPrice,
  colors,
  categories,
  sortBy,
  page = 1,
  items = 16,
}) {
  const builder = new Builder();
  return new Promise((resolve, reject) => {
    const { query, params } = builder
      .allItems(page, items, sortBy)
      .color(colors)
      .category(categories)
      .minimum_price(minPrice)
      .maximum_price(maxPrice)
      .build();
    connection.query(
      query,
      [...params, page, items],
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

function countItems() {
  return new Promise((resolve, reject) => {
    connection.query("CALL GetAllProductsCount()", (error, results, fields) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(results);
    });
  });
}

function randomItems({ numOfProducts }) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT IT.*,group_concat(url) images 
        FROM items IT join images IM on IT.id = IM.item_id 
        group by IT.id ORDER BY RAND() LIMIT ${numOfProducts};`,
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

function getSingleItems(byId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT IT.*,group_concat(url) images FROM 
                            items IT join images IM on IT.id = IM.item_id 
                            where IT.id =${byId} 
                            group by IM.item_id;`,
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

function addToShoppingCart(userId, itemId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO shoppingcart (costumer_id, item_id)
        VALUES (${userId}, ${itemId});`,
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

function removeFromShoppingCart(userId, itemId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `delete FROM shoppingcart s WHERE s.item_id = ${itemId} and s.costumer_id = ${userId}
        ORDER BY s.item_id LIMIT 1`,
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

function getUserShoppingCart(userId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT *,count(*) 'quantity' from (
            SELECT IT.*,group_concat(IM.url) 'images',S.costumer_id
             from items IT 
             join images IM on IT.id = IM.item_id 
             join shoppingcart S on S.item_id=IT.id
             group by S.id
            ) as items where items.costumer_id = ${userId} group by name;`,
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

function userUpdateItem(byId, value, name) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE items SET ${name} = '${value}' WHERE id = ${byId};`,
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

function userAddItem({
  name,
  categories,
  price,
  color,
  description,
  user_id = 1,
  quantity,
}) {
  return new Promise((resolve, reject) => {
    connection.query(
      `CAll AddItem("${categories}","${name}",${parseInt(
        price
      )},"${color}",${user_id},"${description}",${parseInt(quantity)})`,
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

function insertImages(byId, url) {
  const newUrl = "/images/items/" + url;
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO images (item_id,url) VALUES (${byId}, "${newUrl}")`,
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

function getItemReviews(byId) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM items_comments where item_id = ${byId};`,
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

function addItemReviews({
  item_id,
  title,
  comment,
  rating,
  user_first_name,
  user_last_name,
}) {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO items_comments (item_id,user_first_name,user_last_name, comment,title,rating)
      VALUES (${parseInt(
        item_id
      )},"${user_first_name}","${user_last_name}","${comment}","${title}",${parseInt(
        rating
      )});`,
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
  getItems,
  countItems,
  addToShoppingCart,
  removeFromShoppingCart,
  getUserShoppingCart,
  getSingleItems,
  randomItems,
  userUpdateItem,
  userAddItem,
  insertImages,
  getItemReviews,
  addItemReviews,
};
