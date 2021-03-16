const localStorageUsers = JSON.parse(localStorage.getItem("users"));

if (
  localStorage.getItem("logged") == null ||
  localStorage.getItem("logged") == "false"
) {
  alert("Please login, Session Expired!");
  window.location.assign("/login.html");
}

let usersData = [];
let userEleRefs = [];
let userNames = [];
let dataPane = document.getElementById("dataPane");
let searchInput = document.getElementById("search");
let searchFilter = document.getElementById("searchFilter");
let resetFilter = document.getElementById("resetFilter");
const logOut = document.getElementById("logOut");

const fetchUsers = async (url) => {
  if (localStorageUsers == undefined) {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLocalStorageUsers(data);
        usersData = data;
      })
      .catch((err) => console.log("Error cannot fetch data: ", err));
  } else setLocalStorageUsers(localStorageUsers);
};

const setLocalStorageUsers = (data) => {
  if (localStorageUsers == undefined) {
    localStorage.setItem("users", JSON.stringify(data));
    usersData = data;
    renderData();
  } else {
    usersData = data;
    renderData();
  }
};

let df = new DocumentFragment();

function renderData() {
  usersData.forEach((item) => {
    let newEle = document.createElement("tr");
    newEle.innerHTML = `
    <td class="dark_text">${item.id}</td>
    <td class="dark_text"><img src="${item.profilePic}" alt="${item.fullName} picture"/></td>
    <td class="dark_text">${item.fullName}</td>
    <td class="smoke_text">${item.dob}</td>
    <td class="smoke_text">${item.gender}</td>
    <td class="dark_text"><span>${item.currentCountry}</span><br><span class="smoke_text">${item.currentCity}</span> </td>
    `;

    userNames.push(item.fullName.toLowerCase());
    userEleRefs.push(newEle);

    df.appendChild(newEle);
  });
  dataPane.appendChild(df);
}

const searchFilterHandler = () => {
  let input = searchInput.value.toLowerCase();
  if (input.length < 2) {
    alert("Please enter atleast two characters");
    return;
  }

  for (let i = 0; i < usersData.length; i++) {
    if (userNames[i].includes(input)) {
      userEleRefs[i].hidden = false;
    } else {
      userEleRefs[i].hidden = true;
    }
  }
  searchInput.value = "";
};

const resetFilterHandler = () => {
  userEleRefs.forEach((e) => {
    if (e.hidden) {
      e.hidden = false;
    }
  });
};

const logOutHandler = () => {
  localStorage.setItem("logged", false);
  window.location.assign("/login.html");
};

logOut.addEventListener("click", logOutHandler);
searchFilter.addEventListener("click", searchFilterHandler);
resetFilter.addEventListener("click", resetFilterHandler);

//fetchUsers
fetchUsers("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users");
