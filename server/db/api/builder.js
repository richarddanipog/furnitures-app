class Builder {
  constructor() {
    this.query = "";
    this.orderBy = "";
    this.limit = "";
    this.params = [];
  }
  allItems = (page, size, sortBy) => {
    this.query = `select * from ( SELECT IT.*,group_concat(url) images 
        FROM items IT join images IM on IT.id = IM.item_id 
        WHERE `;
    this.limit = `) as items limit ${(page - 1) * size}, ${size}`;
    switch (sortBy) {
      case "low-high":
        this.orderBy += `group by IT.id order by price ASC`;
        break;
      case "high-low":
        this.orderBy += `group by IT.id order by price DESC`;
        break;
      case "new":
        this.orderBy += `group by IT.id order by 1 DESC`;
        break;
      default:
        this.orderBy += `group by IT.id order by 1`;
    }
    return this;
  };
  minimum_price = (minPrice) => {
    this.query += `(${
      !minPrice ? "1" : (this.params.push(parseInt(minPrice)), "price >= ? ")
    }) and `;
    return this;
  };
  maximum_price = (maxPrice) => {
    this.query += `(${
      !maxPrice ? "1" : (this.params.push(parseInt(maxPrice)), "price <= ? ")
    }) `;
    return this;
  };

  color = (Color) => {
    if (!Color) {
      this.query += `(1) and `;
    } else {
      const arrOfColor = Color.split(" ");
      if (arrOfColor[0] === "") {
        this.query += `(1) and `;
      } else {
        this.query += `(`;
        for (let i = 0; i < arrOfColor.length; i++) {
          if (i === arrOfColor.length - 1) {
            this.query += `color like "${arrOfColor[i]}") and `;
          } else {
            this.query += `color like "${arrOfColor[i]}" or `;
          }
        }
      }
    }
    return this;
  };

  category = (category) => {
    this.query += `(${
      !category || category === "total"
        ? "1"
        : (this.params.push(category), "IT.categories like ? ")
    }) and `;
    return this;
  };

  build = () => {
    this.query += this.orderBy;
    this.query += this.limit;
    return { query: this.query, params: this.params };
  };
}

module.exports = Builder;
