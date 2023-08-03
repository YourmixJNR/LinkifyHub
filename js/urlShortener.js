// Get Input fields and buttons
const longUrlInput = document.getElementById('long-url');
const shortenButton = document.getElementById('shorten-button');
const shortUrlInput = document.getElementById('short-url');

const toast = document.querySelector('.toast-box');
const toastDisplay = document.getElementById('real-wrap-txt');

const preloader = document.querySelector('.preloader-overl');

// Event listener for DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const accessToken = '27a17dc32c8243a2bfa16bd26d28132b';
  const apiUrl = 'https://abbrefy.xyz/api/v1/url/abbrefy/';

  // Event listener for clicking the shorten button
  shortenButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const longUrl = longUrlInput.value.trim();

    // Check if the URL is valid
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
      // Show preloader while fetching API
      showPreloader();

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: data
      });

      const result = await response.json();
      const shortUrl = result.url;
      shortUrlInput.value = shortUrl;

      // Hide preloader after API response
      hidePreloader();
    } catch (error) {
      console.error('Error:', error);
      // Hide preloader in case of error
      hidePreloader();
    }
  });
});

// Function to validate URL using regex
function isValidUrl(url) {
  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
  return urlRegex.test(url);
}

// Function to show the preloader
function showPreloader() {
  preloader.style.display = 'block';
}

// Function to hide the preloader
function hidePreloader() {
  preloader.style.display = 'none';
}

// Function to display toast message
function displayToast(message, duration) {
  toast.style.display = 'block';
  toastDisplay.textContent = message;

  // Set timeout to hide the toast after the specified duration
  setTimeout(() => {
    toast.style.display = 'none';
  }, duration);
}

// Function to hide the toast when the "x" icon is clicked
function icoFunc() {
  toast.style.display = 'none';
}

// Function to copy the short URL to clipboard
function copyText() {
  const shortUrl = shortUrlInput.value.trim();

  // Check if the URL is valid
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
