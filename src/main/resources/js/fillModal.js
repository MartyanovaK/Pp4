async function userGetById(userId) {
    try {
        const response = await fetch(`/api/users/user/${userId}`); // Исправлены кавычки
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
}

async function fillModal(modal) {
    $(modal).on("show.bs.modal", async function(event) {
        try {
            const userId = $(event.relatedTarget).data('user-id');
            const user = await userGetById(userId);
            const modalBody = $(this).find(".modal-body");

            // Заполнение основных полей
            modalBody.find("input[data-user-id='id']").val(user.id);
            modalBody.find("input[data-user-id='name']").val(user.name);
            modalBody.find("input[data-user-id='lastName']").val(user.lastName || user.lastname); // Учтены оба варианта
            modalBody.find("input[data-user-id='age']").val(user.age);
            modalBody.find("input[data-user-id='email']").val(user.email);

            const passwordInput = modalBody.find("input[data-user-id='password']");
            if (passwordInput.length) {
                passwordInput.val(''); // Не показываем настоящий пароль
            }

            // Обработка ролей
            const rolesSelectDelete = modalBody.find("select[data-user-id='rolesDelete']");
            const rolesSelectEdit = modalBody.find("select[data-user-id='rolesEdit']");

            if (rolesSelectDelete.length) {
                // Для модального окна удаления
                rolesSelectDelete.empty();
                user.roles.forEach(role => {
                    rolesSelectDelete.append(`<option value="${role.id}">${role.role}</option>`);
                });
            }

            if (rolesSelectEdit.length) {
                rolesSelectEdit.empty();
                const allRoles = [
                    { value: "ROLE_USER", text: "USER" },
                    { value: "ROLE_ADMIN", text: "ADMIN" }
                ];

                allRoles.forEach(role => {
                    const isSelected = user.roles.some(r => r.role === role.value);
                    rolesSelectEdit.append(
                        `<option value="${role.value}" ${isSelected ? 'selected' : ''}>${role.text}</option>`
                    );
                });
            }
        } catch (error) {
            console.error('Error filling modal:', error);
            alert('Failed to load user data. Please try again.');
        }
    });
}
