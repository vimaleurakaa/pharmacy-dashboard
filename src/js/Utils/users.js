// https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=Bob
const getUsersLocal = JSON.parse(localStorage.getItem("users"));
export const fetchUsers = () => {
  if (getUsersLocal == undefined) {
    const fetchProductAPI = async (url) => {
      await fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data, "from server");
          setLocalStorage(data);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    };
    fetchProductAPI("https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users");
  } else {
    setLocalStorage(null);
  }
};

export const getUsers = () => {};

function searchFilterHandler() {
  let t = searchInput.value.toLowerCase();
  if (t.length < 2) {
    alert("Please enter atleast 2 characters");
    return;
  }
  for (let i = 0; i < usersData.length; i++) {
    if (userNames[i].includes(t)) {
      userEleRefs[i].hidden = false;
    } else {
      userEleRefs[i].hidden = true;
    }
  }
  searchInput.value = "";
}

function resetFilterHandler() {
  userEleRefs.forEach((e) => {
    if (e.hidden) {
      e.hidden = false;
    }
  });
}

const setLocalStorage = (data) => {
  if (getUsersLocal == undefined) {
    localStorage.setItem("users", JSON.stringify(data));
    console.log(data);
  } else {
    console.log(getUsersLocal);
  }
};
