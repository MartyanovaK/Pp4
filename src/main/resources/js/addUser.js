async function createNewUser(user) {
    const response = await fetch("/api/users/admin/${user.id}", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error('Failed to create user');
    }
    return await response.json();
}

async function addNewUser() {
    const userForm = document.getElementById("newUser");

    userForm.addEventListener("submit", async function(event) {
        event.preventDefault();


        const name = userForm.querySelector('#name').value.trim();
        const lastName = userForm.querySelector('#lastname').value.trim();
        const age = userForm.querySelector('#age').value.trim();
        const email = userForm.querySelector('#email').value.trim();
        const password = userForm.querySelector('#password').value.trim();

        const roleSelected = document.getElementById("roles");
        let roles = [];

        // Исправлено: используем of вместо in и правильный синтаксис
        for (let option of roleSelected.selectedOptions) {
            if (option.value === 'ROLE_USER') {
                roles.push('ROLE_USER');
            } else if (option.value === 'ROLE_ADMIN') {
                roles.push('ROLE_ADMIN');
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

        try {
            await createNewUser(newUserData);
            userForm.reset();
            document.querySelector('a#home-tab').click();
            await fillTableOfAllUsers();
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Failed to create user. See console for details.');
        }
    });
}
