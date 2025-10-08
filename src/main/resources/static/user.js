document.addEventListener('DOMContentLoaded', async function() {
    await showUserEmailOnNavbar();
    await fillTableAboutCurrentUser();
});

async function dataAboutCurrentUser() {
    const response = await fetch("/api/users/current");
    return await response.json();
}

async function fillTableAboutCurrentUser() {
    const currentUserTable1 = document.getElementById("currentUserTable");
    const currentUser = await dataAboutCurrentUser();

    let currentUserTableHTML = "";
    currentUserTableHTML +=
        `<tr>
            <td>${currentUser.id}</td> 
            <td>${currentUser.name}</td> 
            <td>${currentUser.lastname}</td> 
            <td>${currentUser.age}</td> 
            <td>${currentUser.email}</td> 
            <td>${currentUser.role.map(role => role.role).join(' ')}</td> 
        </tr>`;
    currentUserTable1.innerHTML = currentUserTableHTML;
}

async function showUserEmailOnNavbar() {
    const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");
    const currentUser = await dataAboutCurrentUser();
    currentUserEmailNavbar.innerHTML =
        `<strong>${currentUser.email}</strong> 
                 with roles: 
                 ${currentUser.role.map(role => role.role).join(' ')}`;
}