async function sendDataEditUser(user) {
    await fetch("/api/users/admin/", {
        method : "PATCH",
        headers : {'Content-type': 'application/json'},
        body : JSON.stringify(user)
    });
}

const modalEdit = document.getElementById("modalEdit");

async function EditModalHandler() {
    await fillModal(modalEdit);
}
modalEdit.addEventListener("submit", async function (event) {
    event.preventDefault();

    const rolesSelected = document.getElementById("rolesEdit");

    let roles = [];
    for (let option of rolesSelected.selectedOptions) {
        if(option.value === "ROLE_USER") {
            roles.push({id:1, role: "ROLE_USER"});
        } else if(option.value === "ROLE_ADMIN") {
            roles.push({id:2, role: "ROLE_ADMIN"});
        }
    }

    let user = {
        id: document.getElementById("edit-id").value,
        name: document.getElementById("edit-firstname").value,
        lastName: document.getElementById("edit-lastname").value,
        age: document.getElementById("edit-age").value,
        email: document.getElementById("edit-email").value,
        password: document.getElementById("edit-password").value,
        roles: roles
    }
    await sendDataEditUser(user);
    await fillTableOfAllUsers();

    $('#editModal').modal('hide');
});