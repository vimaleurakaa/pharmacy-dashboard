const getOrdersLocal = JSON.parse(localStorage.getItem("orders"));

export const fetchOrders = () => {
  if (getOrdersLocal == undefined) {
    const fetchOrderAPI = async (url) => {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setLocalStorage(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };
    fetchOrderAPI("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders");
  } else {
    setLocalStorage(null);
  }
};

const setLocalStorage = (data) => {
  if (getOrdersLocal == undefined) {
    localStorage.setItem("orders", JSON.stringify(data));
    filterData(data);
  } else {
    filterData(getOrdersLocal);
    console.log(getOrdersLocal);
  }
};

const filterData = (data) => {
  const filterRoot = document.getElementById("filter_order");

  let filterList = ["New", "Packed", "InTransit", "Delivered"];
  let index;

  filterRoot.addEventListener("change", (e) => {
    if (e.target.checked === true) {
      filterList.push(e.target.id);
    } else {
      index = filterList.findIndex((item) => item === e.target.id);
      if (index > -1) {
        filterList.splice(index, 1);
      }
    }
    renderData(filterList, data);
  });

  renderData(filterList, data);
};

const renderData = (filterdArray, data) => {
  const orderDiv = document.getElementById("ordersTable");
  const count = document.getElementById("order_count");
  let newArr = [];
  for (let i = 0; i < filterdArray.length; i++) {
    data.filter((item) => {
      if (item.orderStatus === filterdArray[i]) {
        newArr.push(item);
      }
    });
  }
  count.textContent = "";
  orderDiv.innerHTML = "";
  count.textContent = newArr.length;
  newArr.map(
    ({ id, orderStatus, customerName, orderDate, amount, orderTime }) => {
      orderDiv.innerHTML += `
    <tr>
    <td>${id}</td>
    <td>${customerName}</td>
    <td>${orderDate}
    <span class="order_time">${orderTime}</span>
    </td>
    <td>$${amount}</td>
    <td>${orderStatus}</td>
  </tr>
      `;
    }
  );
};
