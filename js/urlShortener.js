document.addEventListener('DOMContentLoaded', () => {
  const accessToken = '27a17dc32c8243a2bfa16bd26d28132b';
  const apiUrl = 'https://abbrefy.xyz/api/v1/url/abbrefy/';

  const shortenButton = document.getElementById('shorten-button');
  const longUrlInput = document.getElementById('long-url');
  const shortUrlInput = document.getElementById('short-url');

  shortenButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const longUrl = longUrlInput.value.trim();

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (longUrl === '' || !urlRegex.test(longUrl)) {
      const toast = document.querySelector('.toast-box');
      const toastDisplay = document.getElementById('real-wrap-txt');

      toast.style.display = 'block';
      toastDisplay.textContent = 'Invalid URL';

      // Set a timeout to hide the toast after 3 seconds (adjust the duration as needed)
      setTimeout(() => {
        toast.style.display = 'none';
      }, 5000);
      // alert('Please enter a valid URL.');
      return;
    }

    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const data = JSON.stringify({
      url: longUrl
    });

    try {

      const preloader = document.querySelector('.preloader-overl');
      preloader.style.display = 'block';

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: data
      });

      const result = await response.json();
      const shortUrl = result.url;
      shortUrlInput.value = shortUrl;

      preloader.style.display = 'none';
    } catch (error) {
      console.error('Error:', error);

    const preloader = document.querySelector('.preloader-overl');
    preloader.style.display = 'none';
    }
  });
});

function icoFunc() {
  const toast = document.querySelector('.toast-box');
  toast.style.display = 'none';
};

function copyText() {
  const shortUrlInput = document.getElementById('short-url').value;

  if (shortUrlInput === '') {
    alert("Can't copy empty field");
    return;
  }

  const inputField = document.createElement('input');
  inputField.value = shortUrlInput;
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