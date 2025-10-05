document.addEventListener('DOMContentLoaded', async function () {
    await dataAboutCurrentUser();
    await showUserEmailOnNavbar();
    await dataAboutAllUsers();
    await fillTableOfAllUsers();
    await fillTableAboutCurrentUser();
    await addNewUser();
    await DeleteModalHandler();
    await EditModalHandler();
});

const ROLE_USER = {id: 1, role: "ROLE_USER"};
const ROLE_ADMIN = {id: 2, role: "ROLE_ADMIN"};

async function showUserEmailOnNavbar() {
    const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");
    const currentUser = await dataAboutCurrentUser();

    currentUserEmailNavbar.innerHTML = `
            <strong>${currentUser.email}</strong> 
            with roles: 
            ${currentUser.role.map(role => role.role).join(' ')}
        `;
}
