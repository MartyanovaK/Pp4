async function sendDataEditUser(user) {
    try {
        const response = await fetch(`/api/users/admin/${user.id}`, { // Добавляем ID в URL
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to update user');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

const modalEdit = document.getElementById("modalEdit");

async function EditModalHandler() {
    await fillModal(modalEdit);
}

modalEdit.addEventListener("submit", async function (event) {
    event.preventDefault();

    try {
        const rolesSelected = document.getElementById("rolesEdit");
        let roles = [];

        for (let option of rolesSelected.selectedOptions) {
            if (option.value === "ROLE_USER") {
                roles.push({id: 1, role: "ROLE_USER"});
            } else if (option.value === "ROLE_ADMIN") {
                roles.push({id: 2, role: "ROLE_ADMIN"});
            }
        }

        // Проверка заполненности обязательных полей
        const requiredFields = [
            'edit-id', 'edit-firstname', 'edit-lastname',
            'edit-age', 'edit-email'
        ];

        for (const fieldId of requiredFields) {
            const value = document.getElementById(fieldId).value.trim();
            if (!value) {
                throw new Error(`Field ${fieldId.replace('edit-', '')} is required`);
            }
        }

        const user = {
            id: document.getElementById("edit-id").value,
            name: document.getElementById("edit-firstname").value,
            lastName: document.getElementById("edit-lastname").value,
            age: document.getElementById("edit-age").value,
            email: document.getElementById("edit-email").value,
            password: document.getElementById("edit-password").value || null, // Если пароль не изменен
            roles: roles
        };

        console.log('Sending user data:', user); // Логируем данные перед отправкой

        await sendDataEditUser(user);
        await fillTableOfAllUsers();

        $('#editModal').modal('hide');
        alert('User updated successfully!');
    } catch (error) {
        console.error('Error in edit form:', error);
        alert(`Error: ${error.message}`);
    }
});