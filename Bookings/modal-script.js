document.addEventListener('DOMContentLoaded', () => {
    // Get modal element
    const modal = document.getElementById('bookingModal');

    // Get button that opens the modal
    const openBtn = document.getElementById('read_more');

    // Get the <span> element that closes the modal
    const closeBtn = modal.querySelector('.close-btn');

    // Get all option buttons
    const optionButtons = modal.querySelectorAll('.option-button');

    // Get the form
    const bookingForm = document.getElementById('bookingForm');

    // Function to open the modal
    function openModal() {
        modal.classList.add('show');
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('show');
         // Optional: Reset form fields when closing
        // bookingForm.reset();
        // Clear selected buttons visually
        // optionButtons.forEach(btn => btn.classList.remove('selected'));
        // Clear hidden input values
        // modal.querySelector('#project_type_value').value = '';
        // modal.querySelector('#platform_value').value = '';
    }

    // Event listener for the open button
    if (openBtn) {
        openBtn.addEventListener('click', openModal);
    }

    // Event listener for the close button
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Event listener to close modal if user clicks outside the modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) { // Check if the click is directly on the modal overlay
            closeModal();
        }
    });

    // Event listener for Escape key
    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Event listener for option buttons (single selection per group)
    optionButtons.forEach(button => {
        button.addEventListener('click', () => {
            const group = button.dataset.group;
            const value = button.dataset.value;
            const hiddenInputId = group.replace('-', '_') + '_value'; // e.g., project-type -> project_type_value
            const hiddenInput = modal.querySelector(`#${hiddenInputId}`);

            // Find other buttons in the same group
            const buttonsInGroup = modal.querySelectorAll(`.option-button[data-group="${group}"]`);

            // Deselect all buttons in the group first
            buttonsInGroup.forEach(btn => {
                btn.classList.remove('selected');
            });

            // Select the clicked button
            button.classList.add('selected');

            // Update the hidden input value
            if (hiddenInput) {
                hiddenInput.value = value;
                // console.log(`Set ${hiddenInputId} to: ${value}`); // For debugging
            }
        });
    });

     // Handle form submission
     if (bookingForm) {
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission

            // You can gather the form data here
            const formData = new FormData(bookingForm);
            const data = Object.fromEntries(formData.entries());

            console.log('Form Submitted Data:', data);

            // Add your logic here (e.g., send data to a server using fetch)
            alert('Booking data captured! Check the console.'); // Placeholder

            // Optionally close the modal after submission
            // closeModal();
        });
    }

});