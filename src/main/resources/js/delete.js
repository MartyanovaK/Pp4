async function deleteUserData(userId) {
    await fetch("/api/users/admin/delete/${userId}", {method: 'DELETE'});
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

            console.log("User deleted successfully");
            $('#deleteModal').modal('hide');



    });
}