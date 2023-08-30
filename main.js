document.getElementById("my-form").addEventListener("submit", addUser);

//button.addEventListener('click',submitEvent);
function addUser(e) {
  e.preventDefault();

  const name = e.target.name.value;
  const email = e.target.email.value;
  if (name !== "" && email !== "") {
    let user = {
      name,
      email,
    };
    axios
      .post(
        "https://crudcrud.com/api/1829e35a92ea412c84c7067efdb0a63e/appointment",
        user
      )
      .then((response) => {
        document.getElementById("my-form").reset();
        showUsers();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.getElementById("my-form").reset();
  }

}

const showUsers = () => {
  // e.preventDefault();
  const userList = document.getElementById("users");
  userList.innerHTML = "";
  axios
    .get(
      "https://crudcrud.com/api/1829e35a92ea412c84c7067efdb0a63e/appointment"
    )
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        userList.innerHTML += `
            <li>
            ${response.data[i].name} : ${response.data[i].email} 
            <input type="button" class="editBt "value="Edit" onclick="editUser('${response.data[i]._id}','${response.data[i].name}','${response.data[i].email}')">
            <input type="button" class="editButton deleteBtn"value="Delete" onclick="deleteUser('${response.data[i]._id}')">
</li> `;
      }
    });
};

const editUser = (_id, name, email) => {
  deleteUser(_id);
  (document.getElementById("name").value = name);
  (document.getElementById("email").value = email);
  // axios
  //   .put(
  //     `https://crudcrud.com/api/1829e35a92ea412c84c7067efdb0a63e/appointment/${_id}`,

  //   )
  //   .then((response) => {
  //     // showUsers();
  //   })
  //   .catch((err) => console.log(err));
};

const deleteUser = (_id) => {
  axios
    .delete(
      `https://crudcrud.com/api/1829e35a92ea412c84c7067efdb0a63e/appointment/${_id}`
    )
    .then((response) => {
      showUsers();
    })
    .catch((err) => console.log(err));
};
showUsers();