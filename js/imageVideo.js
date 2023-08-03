const extractButton = document.getElementById('extract-button');
const urUrlInput = document.getElementById('ur-url');

const resultsUrlDisplay = document.getElementById('results-url');
const resultsBox = document.querySelector('.results-display');

document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70f72cd3748a0afd4ddbf55df9d2376c1e16174b';
    const apiUrl = 'https://extractorapi.com/api/v1/extractor';

    extractButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const urUrl = urUrlInput.value.trim();

        if (!isValidUrl(urUrl)) {
        displayToast('Invalid URL', 2000);
        return;
        }

        const endpoint = apiUrl + '?apikey=' + apiKey + '&url=' + encodeURIComponent(urUrl);

        try {

        showPreloader();

        const response = await fetch(endpoint);
        const result = await response.json();
        const resultsUrl = result.images;

        // Clear any previous results and append the new image links to the resultsUrlDisplay div
        resultsUrlDisplay.innerHTML = '';
        resultsUrl.forEach(url => {
            const linkElement = document.createElement('a');
            linkElement.href = url;
            linkElement.textContent = url;
            linkElement.classList.add('results-url');
            resultsUrlDisplay.appendChild(linkElement);
        });

        hidePreloader();
        } catch (error) {
        console.error('Error:', error);
        }
    });
});
  