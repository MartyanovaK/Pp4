async function createNewUser(user) {
    await fetch("/api/users/admin",{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });
}

async function addNewUser() {
    const userForm = document.getElementById("newUser");

    userForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        const name =userForm.querySelector(#name).value.trim();
        const lastName = userForm.querySelector(#lastname).value.trim();
        const age = userForm.querySelector(#age).value.trim();
        const email = userForm.querySelector(#email).value.trim();
        const password = userForm.querySelector(#password).value.trim();

        const roleSelected = document.getElementById("roles");
        let role = [];
        for (let option in roleSelected.selectedOptions) {
            if (option.value === ROLE_USER.role) {
                role.push(ROLE_USER);
            } else if(option.value === ROLE_ADMIN.role) {
                role.push(ROLE_ADMIN)
            }
        }

        const newUserData = {
            name : name,
            lastName : lastName,
            age : age,
            email : email,
            password : password,
            role : role
        };

        await createNewUser(newUserData);
        userForm.reset();

        document.querySelector('a#home-tab').click();
        await fillTableOfAllUsers();
    })
}