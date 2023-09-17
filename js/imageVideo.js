import { isValidUrl } from './main';
import { showPreloader } from './main';
import { hidePreloader } from './main';
import { displayToast } from './main';

const extractButton = document.getElementById('extract-button');
const urUrlInput = document.getElementById('ur-url');

const resultsBox = document.querySelector('.results-display');

function appendLinks(links, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  
  links.forEach(url => {
      const linkElement = document.createElement('a');
      linkElement.href = url;
      linkElement.textContent = url;
      linkElement.classList.add('results-url');
      linkElement.target = '_blank';
      container.appendChild(linkElement);

      const linkContainer = document.createElement('div'); // Create a new <div> for each link
      linkContainer.appendChild(linkElement);
      container.appendChild(linkContainer);
  });
}

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = import.meta.env.VITE_IMAGEVID_ACCESS_TOKEN ;
    const apiUrl = import.meta.env.VITE_IMAGEVID_API_URL;
  
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
        const resultsUrlImages = result.images;
        const resultsUrlVideos = result.videos;
    
        // Append Image Links
        appendLinks(resultsUrlImages, 'results-url-images');

        // Append Video Links
        appendLinks(resultsUrlVideos, 'results-url-videos');
    
        hidePreloader();
        resultsBox.style.display = 'block';
    } catch (error) {
        console.error('Error:', error);
    }    
    });
  });


function clickMeToClose() {
  resultsBox.style.display = 'none';
}

// Assign the clickMeToClose() function to the global window object
window.clickMeToClose = clickMeToClose;