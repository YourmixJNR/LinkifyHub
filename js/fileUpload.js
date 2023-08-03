const fileInput = document.getElementById('file-input');
const fileNameElement = document.getElementById('file-name');
const filePlaceHolder = document.getElementById('file-palaceholder');
const uploadButton = document.getElementById('upload-button');
const uploadedUrl = document.getElementById('uploaded-url');

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = 'AFAIN6V.X0STA84-KG7MEGB-MAV57C4-BXQ7DWJ';
    const apiUrl = 'https://file.io';

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            displayToast('File exceeds limit (10MB)', 2000);
            return;
        }
        fileNameElement.textContent = `${file.name}`;
        filePlaceHolder.textContent = '';
    } else {
        fileNameElement.textContent = '';
        uploadedUrl.textContent = ''; // Clear the previously displayed URL when selecting a new file
    }
  });

  uploadButton.addEventListener('click', async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file.');
        return;
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    const formData = new FormData();
    formData.append('file', file);

    try {

        // const preloader = document.querySelector('.preloader-overl');
        preloader.style.display = 'block';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        const data = await response.json();
        const fileUrl = data.link; // Use 'link' property to get the uploaded file URL
        uploadedUrl.value = fileUrl;

        preloader.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        alert('File upload failed. Please try again later.');

        const preloader = document.querySelector('.preloader-overl');
        preloader.style.display = 'none';
    }
  });
});

function copyFileUrl() {
    const fileUrl = document.getElementById('uploaded-url').value;

    if (fileUrl === '') {
        alert("Can't copy empty field");
        return;
    }

    const fileUrlField = document.createElement('input');
    fileUrlField.value = fileUrl;
    document.body.appendChild(fileUrlField);

    fileUrlField.select();
    fileUrlField.setSelectionRange(0, 99999); // For mobile devices

    try {
        const successful = document.execCommand('copy');
        document.body.removeChild(fileUrlField); // Remove the temporary input field
        const message = successful ? 'Copied to clipboard!' : 'Copy failed. Please select and copy manually.';
        alert(message);
    } catch (error) {
        console.error('Copy failed:', error);
        alert('Copy failed. Please select and copy manually.');
    }
};
