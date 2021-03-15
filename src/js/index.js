import { fetchOrders } from "./Utils/orders";
import { fetchProducts } from "./Utils/products";
import $ from "jquery";
import "../css/index.scss";
import { navigation } from "./Components/navBar";
import { fetchUsers } from "../js/Utils/users";

const img = require.context(
  "../assets/images",
  false,
  /\.(png|svg|jpg|jpeg|gif)$/
);

const nav = document.getElementById("nav");

nav.innerHTML += navigation();

//function excecution
if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html"
) {
} else if (window.location.pathname === "/orders.html") {
  fetchOrders();
} else if (window.location.pathname === "/products.html") {
  fetchProducts();
} else if (window.location.pathname === "/users.html") {
  fetchUsers();
}

// $("h1").html("Jquery changed the content");
