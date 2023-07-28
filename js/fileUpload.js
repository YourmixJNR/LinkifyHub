document.addEventListener('DOMContentLoaded', () => {
    const accessToken = 'AFAIN6V.X0STA84-KG7MEGB-MAV57C4-BXQ7DWJ';
    const apiUrl = 'https://file.io';

    const fileInput = document.getElementById('file-input');
    const fileNameElement = document.getElementById('file-name');
    const filePlaceHolder = document.getElementById('file-palaceholder');
    const uploadButton = document.getElementById('upload-button');
    const uploadedUrl = document.getElementById('uploaded-url');

    const MAX_FILE_SIZE = 10 * 1024 * 1024;

    fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];

    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            alert('File size exceeds the maximum allowed limit (10MB). Please select a smaller file.');
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
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: headers,
            body: formData,
        });

        const data = await response.json();
        const fileUrl = data.link; // Use 'link' property to get the uploaded file URL
        uploadedUrl.value = fileUrl;
    } catch (error) {
        console.error('Error:', error);
        alert('File upload failed. Please try again later.');
    }
  });
});

function copyText() {
    const filetUrl = document.getElementById('uploaded-url').value;
  
    if (filetUrl === '') {
      alert("Can't copy empty field");
      return;
    }
  
    const inputField = document.createElement('input');
    inputField.value = filetUrl;
    document.body.appendChild(inputField);
  
    inputField.select();
    inputField.setSelectionRange(0, 99999); // For mobile devices
  
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(inputField); // Remove the temporary input field
      const message = successful ? 'Copied to clipboard!' : 'Copy failed. Please select and copy manually.';
      alert(message);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Copy failed. Please select and copy manually.');
    }
  };