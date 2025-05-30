async function deleteUserData(userId) {
    await fetch("/api/users/user/{$userId}", {method: 'DELETE'});
}

const modalDelete = document.getElementById("deleteModal");

async function DeleteModalHandler() {
    await fillModal(modalDelete);
}

const formDelete = document.getElementById("modalBodyDelete");
if (formDelete) {
    formDelete.addEventListener("submit", async function(event) {
        event.preventDefault();
        const userId = event.target.querySelector("#delete-id").value;
        await deleteUserData(userId);
        await fillTableOfAllUsers();

        console.log("Закрытие модального окна");
        $('#deleteModal').modal('hide');
    });
}