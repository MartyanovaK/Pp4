document.addEventListener('DOMContentLoaded', async function () {
    await showUserEmailOnNavbar();
    await fillTableOfAllUsers();
    await fillTableAboutCurrentUser();
    await addNewUser();
    await DeleteModalHandler();
    await EditModalHandler();
});

const ROLE_USER = {id: 1, role: "ROLE_USER"};
const ROLE_ADMIN = {id: 2, role: "ROLE_ADMIN"};

async function showUserEmailOnNavbar() {
    try {
        const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");
        if (!currentUserEmailNavbar) {
            console.error("Element with id 'currentUserEmailNavbar' not found");
            return;
        }

        const currentUser = await dataAboutCurrentUser();
        console.log("Current user data:", currentUser);

        if (!currentUser) {
            console.error("No user data received");
            currentUserEmailNavbar.textContent = "User not loaded";
            return;
        }

        // Безопасное формирование строки ролей
        let rolesText = "No roles";
        if (currentUser.role) {
            if (Array.isArray(currentUser.role)) {
                rolesText = currentUser.role
                    .map(role => role?.role || '')
                    .filter(Boolean)
                    .join(' ');
            } else if (typeof currentUser.role === 'string') {
                rolesText = currentUser.role;
            }
        }

        currentUserEmailNavbar.innerHTML = `
            <strong>${currentUser.email || 'No email'}</strong>
            with roles: ${rolesText}`;

    } catch (error) {
        console.error("Error showing user email:", error);
        const navbar = document.getElementById("currentUserEmailNavbar");
        if (navbar) {
            navbar.textContent = "Error loading user data";
        }
    }
}
