document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
  const accessToken = '27a17dc32c8243a2bfa16bd26d28132b';
  const apiUrl = 'https://abbrefy.xyz/api/v1/url/abbrefy/';

  const shortenButton = document.getElementById('shorten-button');
  const longUrlInput = document.getElementById('long-url');
  const shortUrlInput = document.getElementById('short-url');
  
  shortenButton.addEventListener('click', () => {
    const longUrl = longUrlInput.value.trim();

    // Regular expression to check if the input is a valid URL
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (longUrl === '' || !urlRegex.test(longUrl)) {
      alert('Please enter a valid URL.');
      return;
    }


    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };

    const data = JSON.stringify({
      url : longUrl
    });
    
    try {
      fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: data
      })
      .then(response => response.json())
      .then(result => {
        const shortUrl = result.url;
        shortUrlInput.value = shortUrl;
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
    } catch (error) {
      console.error('Pre-fetch error:', error);
    }
  });
  });
});

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
}
