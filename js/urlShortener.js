import { isValidUrl } from './main.js';
import { showPreloader } from './main.js';
import { hidePreloader } from './main.js';
import { displayToast } from './main.js';



const longUrlInput = document.getElementById('long-url');
const shortenButton = document.getElementById('shorten-button');
const shortUrlInput = document.getElementById('short-url');

document.addEventListener('DOMContentLoaded', () => {
  const accessToken = import.meta.env.VITE_SHORTENER_ACCESS_TOKEN;
  const apiUrl = import.meta.env.VITE_SHORTENER_API_URL;

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

// Function to copy the short URL to clipboard
function copyText() {
  const shortUrlres = shortUrlInput.value.trim();

  // Check if the URL is valid
  if (!isValidUrl(shortUrlres)) {
    displayToast('Invalid \\ Empty URL', 2000);
    return;
  } else {
    const inputField = document.createElement('input');
    inputField.value = shortUrlres;
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

// Assign the copyText() function to the global window object
window.copyText = copyText;