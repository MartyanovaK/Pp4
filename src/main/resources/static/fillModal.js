async function userGetById(userId) {
    const response = await fetch(`/api/users/admin/${userId}`);
    return await response.json();

}

async function fillModal(modal) {
    $(modal).on("show.bs.modal", async function(event) {

            const userId = $(event.relatedTarget).data('user-id');
            const user = await userGetById(userId);
            const modalBody = $(this).find(".modal-body");


            const idInput = modalBody.find("input[data-user-id='id']");
            const nameInput = modalBody.find("input[data-user-id='name']");
            const lastNameInput = modalBody.find("input[data-user-id='lastName']");
            const ageInput = modalBody.find("input[data-user-id='age']");
            const emailInput = modalBody.find("input[data-user-id='email']");
            const passwordInput = modalBody.find("input[data-user-id='password']");

            if (passwordInput.length) {
                passwordInput.val(user.password);
            }
            idInput.val(user.id);
            nameInput.val(user.name);
            lastNameInput.val(user.lastname);
            ageInput.val(user.age);
            emailInput.val(user.email);

            let rolesSelect;


            const rolesSelectDelete = modalBody.find("select[data-user-id='rolesDelete']");
            const rolesSelectEdit = modalBody.find("select[data-user-id='rolesEdit']");
            let userRolesHTML = "";

            if(rolesSelectDelete.length) {
                rolesSelect = rolesSelectDelete;
                user.role.forEach(role => {
                    userRolesHTML += `<option value="${role.id}">${role.role}</option>`;
                });
            } else if (rolesSelectEdit.length) {
                rolesSelect = rolesSelectEdit;
                user.role.forEach(role => {
                    userRolesHTML += `
                <option value="ROLE_USER">USER</option>
                <option value="ROLE_ADMIN">ADMIN</option>`;
                })
            }
            rolesSelect.html(userRolesHTML);
        });
}
