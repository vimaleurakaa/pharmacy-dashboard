let logIn = document.getElementById("logIn");
let userName = document.getElementById("username");
let password = document.getElementById("password");

if (localStorage.getItem("logged") === "true") {
  window.location.assign("/orders.html");
}

logIn.addEventListener("click", logInHandler);

function logInHandler() {
  if (userName.value === password.value) {
    fetch("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/login", {
      method: "POST",
      body: JSON.stringify({
        username: userName.value,
        password: password.value,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Login Successful!");
        localStorage.setItem("logged", true);
        window.location.assign("/orders.html");
      });
  } else {
    alert(
      `Please enter valid credentials! ${userName.value} + ${password.value}`
    );
  }
}
