// Global variables
const preloader = document.querySelector('.preloader-overl');
const toast = document.querySelector('.toast-box');
const toastDisplay = document.getElementById('real-wrap-txt');

const checkStatus = document.querySelector('.check-status');
const statusText = document.getElementById('check-status-txt');
let timeoutId; // Declare the timeoutId variable

function checkUserStatus(status, duration) {
    checkStatus.style.display = 'block';
    statusText.textContent = status;

    // Clear any previous timeout
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        checkStatus.style.display = 'none';
    }, duration);
}

// Event listener for when the browser goes online
window.addEventListener('online', () => {
    checkUserStatus('Welcome back', 2000);
});

// Event listener for when the browser goes offline
window.addEventListener('offline', () => {
    checkUserStatus("You're Offline", 2000);
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
