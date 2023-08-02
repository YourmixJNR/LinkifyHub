// Get Input fields and buttons
const longUrlInput = document.getElementById('long-url');
const shortenButton = document.getElementById('shorten-button');
const shortUrlInput = document.getElementById('short-url');

const toast = document.querySelector('.toast-box');
const toastDisplay = document.getElementById('real-wrap-txt');

// Fetching API
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = '27a17dc32c8243a2bfa16bd26d28132b';
  const apiUrl = 'https://abbrefy.xyz/api/v1/url/abbrefy/';

  shortenButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const longUrl = longUrlInput.value.trim();

    if (!isValidUrl(longUrl)) {
      displayToast('Invalid URL', 2000);
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
      showPreloader();

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: data
      });

      const result = await response.json();
      const shortUrl = result.url;
      shortUrlInput.value = shortUrl;

      hidePreloader();
    } catch (error) {
      console.error('Error:', error);
      hidePreloader();
    }
  });
});

function isValidUrl(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

function showPreloader() {
  const preloader = document.querySelector('.preloader-overl');
  preloader.style.display = 'block';
}

function hidePreloader() {
  const preloader = document.querySelector('.preloader-overl');
  preloader.style.display = 'none';
}

function displayToast(message, duration) {
  toast.style.display = 'block';
  toastDisplay.textContent = message;

  setTimeout(() => {
    toast.style.display = 'none';
  }, duration);
}

function icoFunc() {
  toast.style.display = 'none';
}

function copyText() {
  const shortUrl = shortUrlInput.value.trim();

  if (!isValidUrl(shortUrl)) {
    displayToast('Invalid \\ Empty URL', 2000);
  } else {
    const inputField = document.createElement('input');
    inputField.value = shortUrl;
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
}
