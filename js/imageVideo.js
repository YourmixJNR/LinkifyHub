const extractButton = document.getElementById('extract-button');
const urUrlInput = document.getElementById('ur-url');

const resultsBox = document.querySelector('.results-display');
const resultsUrlDisplay = document.getElementById('results-url');

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70f72cd3748a0afd4ddbf55df9d2376c1e16174b'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = 'https://extractorapi.com/api/v1/extractor';
  
    extractButton.addEventListener('click', async (event) => {
      event.preventDefault();
      const urUrl = urUrlInput.value.trim();
  
      if (!isValidUrl(urUrl)) {
        displayToast('Invalid URL', 2000);
        return;
      }
  
      const endpoint = `${apiUrl}?apikey=${apiKey}&url=${encodeURIComponent(urUrl)}`;
  
      try {
        showPreloader();
  
        const response = await fetch(endpoint);
        const result = await response.json();
        const resultsUrl = result.images;
        const resultsVideo = result.videos; // Assuming you have this data

        resultsUrlDisplayImages.innerHTML = ''; // Clear previous image links
        resultsUrl.forEach(url => {
            const linkElement = createLinkElement(url);
            resultsUrlDisplayImages.appendChild(linkElement);
        });

        resultsUrlDisplayVideos.innerHTML = ''; // Clear previous video links
        resultsVideo.forEach(url => {
            const linkElement = createLinkElement(url);
            resultsUrlDisplayVideos.appendChild(linkElement);
        });

        hidePreloader();
    } catch (error) {
        console.error('Error:', error);
    }
    });
  });

function createLinkElement(url) {
  const linkElement = document.createElement('a');
  linkElement.href = url;
  linkElement.textContent = url;
  linkElement.classList.add('results-url');
  linkElement.target = '_blank'; // Open link in a new tab
  return linkElement;
}

  function clickMeToClose() {
    resultsBox.style.display = 'none';
  }
  