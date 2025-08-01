async function deleteUserData(userId) {
    try {
        const response = await fetch(`/api/users/user/${user.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

const modalDelete = document.getElementById("deleteModal");

async function DeleteModalHandler() {
    await fillModal(modalDelete);
}

const formDelete = document.getElementById("modalBodyDelete");
if (formDelete) {
    formDelete.addEventListener("submit", async function(event) {
        event.preventDefault();
        try {
            const userId = event.target.querySelector("#delete-id").value;
            await deleteUserData(userId);
            await fillTableOfAllUsers();

            console.log("User deleted successfully");
            $('#deleteModal').modal('hide');


            const row = document.querySelector(`tr[data-user-id="${userId}"]`);
            if (row) {
                row.remove();
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Failed to delete user. Please try again.");
        }
    });
}