import React from "react";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";

const ItemsTable = (props) => {
  const buildRow = (arr) => {
    return arr.map((item) => {
      return {
        id: item.id,
        name: (
          <>
            <div
              style={{
                backgroundImage: `url(http://localhost:6500/${item.url})`,
              }}
            ></div>
            <label>{item.name}</label>
          </>
        ),
        category: item.categories,
        color: item.color,
        price: `$${item.price}`,
        quantity: item.quantity,
        edit: (
          <Link to={`/update-item/${item.id}`} style={{ color: "black" }}>
            <i className="fa fa-edit" title={"Edit item"} />
          </Link>
        ),
      };
    });
  };

  const makeData = (arr) => {
    const data = {
      columns: [
        { label: "Id", field: "id", sort: "asc", width: 100 },
        { label: "Name", field: "name", sort: "asc", width: 100 },
        { label: "Categories", field: "category", sort: "asc", width: 100 },
        { label: "Color", field: "color", sort: "asc", width: 100 },
        { label: "Price", field: "price", sort: "asc", width: 100 },
        { label: "Quantity", field: "quantity", sort: "asc", width: 20 },
        { label: "Edit", field: "edit", sort: "asc", width: 50 },
      ],
      rows: buildRow(arr),
    };
    return data;
  };

  return (
    <div className={"container admin__navigation-table"}>
      <div className={"admin__navigation-table--add text-right"}>
        Add Item :
        <Link to={"/add-item"}>
          <i className={"fa fa-plus"} title={"Add item"} />
        </Link>
      </div>
      <MDBDataTable
        striped
        bordered
        hover
        responsive
        data={makeData(props.items)}
      />
    </div>
  );
};

export default ItemsTable;
