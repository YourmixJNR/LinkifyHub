document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('file-input');
    const fileNameElement = document.getElementById('file-name');
    const filePlaceHolder = document.getElementById('file-palaceholder');

    fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    if (file) {
        // Update the custom browse button content with the file details
        fileNameElement.textContent = `${file.name}`;
        filePlaceHolder.textContent = '';
    } else {
        // If no file selected, display the default message
        fileNameElement.textContent = '';
    }
  });
});
  