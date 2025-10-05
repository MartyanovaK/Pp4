async function dataAboutAllUsers() {
    const response= await fetch("/api/users/admin");
    return response.json();

}


async function dataAboutCurrentUser() {
    const resp = await fetch("/api/users/current");
    return resp.json();
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
                 <td>${user.role?.map(role => role.role).join(' ') ?? 'ROLE_USER'}</td>
                 <td> <button class="btn btn-primary"
                 data-bs-toggle="modal"
                 th:data-bs-target="${'#edit' + user.id}">
                                            Edit
                                        </button>
                 
                 <button class="btn btn-danger"
                 data-bs-toggle="modal"
                 th:data-bs-target="'#deleteModal'+ ${user.id}">Delete
                                        </button>
                 </td>
            </tr>`;
        usersTable.appendChild(row);
    })
}

async function fillTableAboutCurrentUser() {
    const userTable = document.getElementById("userTable");
    const currentUser = await dataAboutCurrentUser();
    userTable.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML =
            <td>${currentUser.id}</td>
            <td>${currentUser.name}</td>
            <td>${currentUser.lastName}</td>
            <td>${currentUser.age}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.role.map(role => role.role).join(' ')}</td>

    userTable.appendChild(row);
}