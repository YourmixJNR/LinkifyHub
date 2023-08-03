// Global variables
const preloader = document.querySelector('.preloader-overl');
const toast = document.querySelector('.toast-box');
const toastDisplay = document.getElementById('real-wrap-txt');

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
