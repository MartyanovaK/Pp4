document.addEventListener('DOMContentLoaded', async function() {
    try {
        await showUserEmailOnNavbar();
        await fillTableAboutCurrentUser();
    } catch (error) {
        console.error('Initialization error:', error);
    }
});

async function dataAboutCurrentUser() {
    try {
        console.log(user);
        const response = await fetch("/api/users/user/${user.id}");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user data:', error);
        throw error;
    }
}

async function fillTableAboutCurrentUser() {
    try {
        const currentUserTable1 = document.getElementById("currentUserTable");
        if (!currentUserTable1) return;

        const currentUser = await dataAboutCurrentUser();

        const roles = currentUser.roles || currentUser.role || [];
        const rolesText = Array.isArray(roles)
            ? roles.map(r => r.role || r).join(' ')
            : '';

        currentUserTable1.innerHTML = `
            <tr>
                <td>${currentUser.id || ''}</td>
                <td>${currentUser.name || ''}</td>
                <td>${currentUser.lastname || currentUser.lastName || ''}</td>
                <td>${currentUser.age || ''}</td>
                <td>${currentUser.email || ''}</td>
                <td>${rolesText}</td>
            </tr>`;
    } catch (error) {
        console.error('Error filling user table:', error);
        document.getElementById("currentUserTable").innerHTML = `
            <tr>
                <td colspan="6">Error loading user data</td>
            </tr>`;
    }
}

async function showUserEmailOnNavbar() {
    try {
        const currentUserEmailNavbar = document.getElementById("currentUserEmailNavbar");
        if (!currentUserEmailNavbar) return;

        const currentUser = await dataAboutCurrentUser();

        const roles = currentUser.roles || currentUser.role || [];
        const rolesText = Array.isArray(roles)
            ? roles.map(r => r.role || r).join(' ')
            : '';

        currentUserEmailNavbar.innerHTML = `
            <strong>${currentUser.email || ''}</strong>
            with roles: ${rolesText}`;
    } catch (error) {
        console.error('Error showing user email:', error);
        const navbar = document.getElementById("currentUserEmailNavbar");
        if (navbar) navbar.innerHTML = 'Error loading user data';
    }
}
