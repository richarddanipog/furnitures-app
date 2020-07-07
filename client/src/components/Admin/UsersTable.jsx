import React from "react";
import { MDBDataTable } from "mdbreact";

const UsersTable = (props) => {
  const buildRow = (arr) => {
    return arr.map((user) => {
      return {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      };
    });
  };

  const makeData = (arr) => {
    const data = {
      columns: [
        { label: "Id", field: "id", sort: "asc", width: 100 },
        { label: "First Name", field: "first_name", sort: "asc", width: 200 },
        { label: "Last Name", field: "last_name", sort: "asc", width: 100 },
        { label: "Email", field: "email", sort: "asc", width: 100 },
        { label: "Phone", field: "phone", sort: "asc", width: 100 },
        { label: "Address", field: "address", sort: "asc", width: 50 },
      ],
      rows: buildRow(arr),
    };
    return data;
  };

  return (
    <div className={"container admin__navigation-table"}>
      <MDBDataTable
        striped
        bordered
        hover
        responsive
        data={makeData(props.users)}
      />
    </div>
  );
};

export default UsersTable;
