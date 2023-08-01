// Get Input field
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

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (longUrl === '' || !urlRegex.test(longUrl)) {
      
      toast.style.display = 'block';
      toastDisplay.textContent = 'Invalid URL';

      // Set a timeout to hide the toast after 3 seconds (adjust the duration as needed)
      setTimeout(() => {
        toast.style.display = 'none';
      }, 2000);
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
  toast.style.display = 'none';
};

function copyText() {
  const shortUrlInput = document.getElementById('short-url');

  const shortUrl = shortUrlInput.value.trim();

  const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

  if (shortUrl === '' || !urlRegex.test(shortUrl)) {
    toast.style.display = 'block';
    toastDisplay.textContent = 'Invalid \\ Empty URL';
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
      toast.style.display = 'block';
      toastDisplay.textContent = 'URL Copied!';
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Copy failed. Please select and copy manually.');
    }
  }
  // Hide the toast after 5 seconds (5000 milliseconds)
  setTimeout(() => {
    toast.style.display = 'none';
  }, 2000);
};