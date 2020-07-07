import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import { connect } from "react-redux";
import { countItem } from "../../actions/itemActions";

const DashBoard = ({ countItems, usersCount, countItem }) => {
  const [dataBar, setDataBar] = useState({
    labels: [],
    dataset: { barPercentage: [] },
  });
  const [barChartOptions] = useState({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      dataset: [
        {
          barPercentage: 1,
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  });

  useEffect(() => {
    countItem();
  }, [countItem]);

  useEffect(() => {
    setDataBar({
      labels: [
        "Users",
        "Total Products",
        "Products(Indoor)",
        "Products(Outdoor)",
        "Products(Decor)",
        "Products(Kitchen)",
      ],
      datasets: [
        {
          label: "Amount Of ",
          data: [
            usersCount,
            countItems.total,
            countItems.indoor,
            countItems.outdoor,
            countItems.decor,
            countItems.kitchen,
            13,
          ],
          backgroundColor: [
            "rgba(255, 134,159,0.4)",
            "rgba(98,  182, 239,0.4)",
            "rgba(255, 218, 128,0.4)",
            "rgba(113, 205, 205,0.4)",
            "rgba(170, 128, 252,0.4)",
            "rgba(255, 177, 101,0.4)",
          ],
          borderWidth: 2,
          borderColor: [
            "rgba(255, 134, 159, 1)",
            "rgba(98,  182, 239, 1)",
            "rgba(255, 218, 128, 1)",
            "rgba(113, 205, 205, 1)",
            "rgba(170, 128, 252, 1)",
            "rgba(255, 177, 101, 1)",
          ],
        },
      ],
    });
  }, [usersCount, countItems]);

  return (
    <div className={"mt-5 pb-5"}>
      {Object.keys(countItems).length > 0 && (
        <MDBContainer style={{ fontSize: "1.6rem", height: "60vh" }}>
          <h3 className="mt-5">Data Bar chart</h3>
          <Bar
            data={dataBar}
            options={barChartOptions}
            type={"horizontalBar"}
          />
        </MDBContainer>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  countItems: state.items.countItems,
});

export default connect(mapStateToProps, { countItem })(DashBoard);
