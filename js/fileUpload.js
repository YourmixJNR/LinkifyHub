import { isValidUrl } from './main';
import { showPreloader } from './main';
import { hidePreloader } from './main';
import { displayToast } from './main';

const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const uploadedUrl = document.getElementById('uploaded-url');

const fileNameElement = document.getElementById('file-name');
const filePlaceHolder = document.getElementById('file-placeholder');

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    const accessToken = import.meta.env.VITE_FILE_UPLOAD_ACCESS_TOKEN;
    const apiUrl = import.meta.env.VITE_FILE_UPLOAD_API_URL;

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

  uploadButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const file = fileInput.files[0];

    if (!file) {
        displayToast('Please select a file', 2000);
        return;
    }

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    const formData = new FormData();
    formData.append('file', file);

    try {

        showPreloader();

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        const data = await response.json();
        const fileUrl = data.link; // Use 'link' property to get the uploaded file URL
        uploadedUrl.value = fileUrl;

        hidePreloader();
    } catch (error) {
        console.error('Error:', error);
        alert('File upload failed. Please try again later.');

        hidePreloader();
    }
  });
});

function copyFileUrl() {
    const fileUrl = uploadedUrl.value.trim();
    
    if (!isValidUrl(fileUrl)) {
       displayToast('Invalid \\ Empty URL', 2000);
        return;
    }else {
        const inputField = document.createElement('input');
        inputField.value = fileUrl;
        document.body.appendChild(inputField);
    
        inputField.select();
        inputField.setSelectionRange(0, 99999); // For mobile devices
    
        try {
          document.execCommand('copy');
          document.body.removeChild(inputField); // Remove the temporary input field
    
          // Show the "URL copied!" toast
          displayToast('URL Copied!', 2000);
        } catch (error) {
          console.error('Copy failed:', error);
          alert('Copy failed. Please select and copy manually.');
        }
      }
};

// Assign the copyFileUrl() function to the global window object
window.copyFileUrl = copyFileUrl;