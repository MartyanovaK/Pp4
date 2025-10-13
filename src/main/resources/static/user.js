document.addEventListener('DOMContentLoaded', async function() {
        await showCurrentUserEmailOnNavbar();
        await fillTableAboutCurrentUser();

});

async function dataAboutUser() {

    const response = await fetch("/api/users/user");
    return await response.json();

}

async function showCurrentUserEmailOnNavbar() {

    const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");


    const currentUser = await dataAboutUser();

    const email = currentUser.email;
    const rolesText = currentUser.roles ? currentUser.roles.map(role => role.role).join(', ') : '';

    currentUserEmailNavbar.innerHTML = `<strong>${email}</strong> with roles: ${rolesText}`;
}

async function fillTableAboutCurrentUser() {

        const currentUserTable = document.getElementById("currentUserTable");

        const currentUser = await dataAboutUser();

        currentUserTable.innerHTML = `
            <tr>
                <td>${currentUser.id}</td> 
                <td>${currentUser.name }</td> 
                <td>${currentUser.lastName}</td> 
                <td>${currentUser.age}</td> 
                <td>${currentUser.email}</td> 
                <td>${currentUser.roles?.map(role => role.role).join(', ') ?? 'ROLE_USER'}</td> 
            </tr>`;

}

