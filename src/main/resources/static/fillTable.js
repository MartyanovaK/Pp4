async function dataAboutAllUsers() {
    const response= await fetch("/api/users/admin");
    const data = await response.json();
    console.log(data);
    return data;

}


async function dataAboutCurrentUser() {
    const resp = await fetch("/api/users/current");
    const data = await resp.json();
    console.log(data);
    return data;
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
                 <td>${user.lastname}</td>
                 <td>${user.age}</td>
                 <td>${user.email}</td>
                 <td>${user.roles?.map(role => role.role).join(' ') ?? 'ROLE_USER'}</td>
                 <td> 
                    <button class="btn btn-primary btn-sm" 
                            onclick="openEditModal(${user.id})"
                            data-bs-toggle="modal"
                            data-bs-target="#modalEdit">
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
    })
}

async function fillTableAboutCurrentUser() {
    const userTable = document.getElementById("userTable");
    const currentUser = await dataAboutCurrentUser();
    userTable.innerHTML = '';
    const row = document.createElement('tr');
    row.innerHTML = `
            <td>${currentUser.id}</td>
            <td>${currentUser.name}</td>
            <td>${currentUser.lastname}</td>
            <td>${currentUser.age}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.role.map(role => role.role).join(' ')}</td>
            `;
    userTable.appendChild(row);
}