const ROLE_USER = {id: 1, role: 'ROLE_USER'};
const ROLE_ADMIN = {id: 2, role: 'ROLE_ADMIN'};

async function dataAboutAllUsers() {
    const response = await fetch("/api/users/admin");
    return await response.json();

}

async function dataAboutCurrentUser() {
    const resp = await fetch("/api/users/current");
    return await resp.json();
}


async function showUserEmailOnNavbar() {

    const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");


    const currentUser = await dataAboutCurrentUser();

    const email = currentUser.email;
    const rolesText = currentUser.roles ? currentUser.roles.map(role => role.role).join(', ') : '';

    currentUserEmailNavbar.innerHTML = `<strong>${email}</strong> with roles: ${rolesText}`;
}

    async function fillTableOfAllUsers() {

            const usersTable = document.getElementById("usersTable");


            const users = await dataAboutAllUsers();
            usersTable.innerHTML = '';

            users.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles?.map(role => role.role).join(', ')}</td>
                <td> 
                    <button class="btn btn-primary btn-sm" 
                            onclick="openEditModal(${user.id})">
                        Edit
                    </button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm" 
                            onclick="openDeleteModal(${user.id})"> 
                        Delete
                    </button>
                </td>
            `;
                usersTable.appendChild(row);
            });


    }

    async function fillTableAboutCurrentUser() {

        const userTable = document.getElementById("userTable");


        const currentUser = await dataAboutCurrentUser();
        userTable.innerHTML = '';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${currentUser.id}</td>
            <td>${currentUser.name}</td>
            <td>${currentUser.lastName}</td>
            <td>${currentUser.age}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.roles?.map(role => role.role).join(', ') ?? 'ROLE_USER'}</td>
            
        `;

        userTable.appendChild(row);


    }

    async function userGetById(userId) {
        const response = await fetch(`/api/users/admin/${userId}`);
        return await response.json();

    }

    async function fillRoles(selectElement, userRoles = []) {
        const rolesSelect = document.getElementById(selectElement);
        rolesSelect.innerHTML = '';
        const roles = [
            {value: 'ROLE_USER', text: 'USER'},
            {value: 'ROLE_ADMIN', text: 'ADMIN'}
        ];

        roles.forEach(role => {
            const option = document.createElement('option');
            option.value = role.value;
            option.textContent = role.text;

            const hasRole = userRoles.some(userRoles =>
                userRoles.role === role.value);

            if (hasRole) {
                option.selected = true;
            }

            rolesSelect.appendChild(option);
        });
    }

    async function sendDataEditUser(user) {
        const response = await fetch(`/api/users/admin/${user.id}`, {
            method: "PATCH",
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(user)
        });
        return await response.json();
    }

    const modalEdit = document.getElementById("modalEdit");

    async function openEditModal(userId) {
        const user = await userGetById(userId);

        document.getElementById("edit-id").value = user.id;
        document.getElementById("edit-name").value = user.name;
        document.getElementById("edit-lastname").value = user.lastName;
        document.getElementById("edit-age").value = user.age;
        document.getElementById("edit-email").value = user.email;
        document.getElementById("edit-password").value = user.password;
         await fillRoles('edit-roles', user.roles);

        const editModal = new bootstrap.Modal(modalEdit);
        editModal.show();
    }

    document.addEventListener('DOMContentLoaded', function () {
        const formEdit = document.getElementById("modalBodyEdit");
        if (formEdit) {
            formEdit.addEventListener("submit", async function (event) {
                event.preventDefault();
                const roleSelected = document.getElementById("edit-roles");
                let roles = [];
                for (let option of roleSelected.selectedOptions) {
                    if (option.value === 'ROLE_USER') {
                        roles.push({
                            id: 2,
                            role: "ROLE_USER",
                            authority: "ROLE_USER"
                        });
                    } else if (option.value === 'ROLE_ADMIN') {
                        roles.push({
                            id: 1,
                            role: "ROLE_ADMIN",
                            authority: "ROLE_ADMIN"
                        });
                    }
                }

                const userData = {
                    id: document.getElementById("edit-id").value,
                    name: document.getElementById("edit-name").value,
                    lastName: document.getElementById("edit-lastname").value,
                    age: document.getElementById("edit-age").value,
                    email: document.getElementById("edit-email").value,
                    password: document.getElementById("edit-password").value,
                    roles: roles
                };
                await sendDataEditUser(userData);
                await fillTableOfAllUsers();

                const modal = bootstrap.Modal.getInstance(modalEdit);

                modal.hide();
                location.reload();
            })
        }

    })

    async function deleteUserData(userId) {
        await fetch(`/api/users/admin/delete/${userId}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    }

    async function openDeleteModal(userId) {
        const user = await userGetById(userId);

        document.getElementById('delete-id').value = user.id;
        document.getElementById('delete-firstname').value = user.name;
        document.getElementById('delete-lastname').value = user.lastName;
        document.getElementById('delete-age').value = user.age;
        document.getElementById('delete-email').value = user.email;
        document.getElementById('delete-password').value = user.password;
        await fillRoles('delete-roles', user.roles);

        const deleteModal = new bootstrap.Modal(document.getElementById("deleteModal"));
        deleteModal.show();
    }

    const formDelete = document.getElementById("modalBodyDelete");
    if (formDelete) {
        formDelete.addEventListener("submit", async function (event) {
            event.preventDefault();

            const userId = event.target.querySelector("#delete-id").value;
            await deleteUserData(userId);
            await fillTableOfAllUsers();
            const modal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
            modal.hide();
            location.reload();

        });
    }

    async function createNewUser(user) {
        const response = await fetch("/api/users/admin", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        document.getElementById('nav-new_user').reset();
        await fillTableOfAllUsers();

        return await response.json();
    }


    const userForm = document.getElementById("newUser");

    userForm.addEventListener("submit", async function (event) {
        event.preventDefault();


        const name = userForm.querySelector('#nameNew').value.trim();
        const lastName = userForm.querySelector('#lastNameNew').value.trim();
        const age = userForm.querySelector('#ageNew').value.trim();
        const email = userForm.querySelector('#emailNew').value.trim();
        const password = userForm.querySelector('#passwordNew').value.trim();

        const roleSelected = document.getElementById("roles");
        let roles = [];

        for (let option of roleSelected.selectedOptions) {
            if (option.value === 'ROLE_USER') {
                roles.push({
                    id: 2,
                    role: "ROLE_USER",
                    authority: "ROLE_USER"
                });

            } else if (option.value === 'ROLE_ADMIN') {
                roles.push({
                    id: 1,
                    role: "ROLE_ADMIN",
                    authority: "ROLE_ADMIN"
                });
            }
        }

        const newUserData = {
            name: name,
            lastName: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        };


        await createNewUser(newUserData);
        userForm.reset();
        document.querySelector('#v-pills-admin').click();
        await fillTableOfAllUsers();
        location.reload();


    });


    document.addEventListener('DOMContentLoaded', async function () {

        await showUserEmailOnNavbar();
        await fillTableOfAllUsers();
        await fillTableAboutCurrentUser();


    });
