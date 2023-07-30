document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70f72cd3748a0afd4ddbf55df9d2376c1e16174b'; // Replace 'YOUR_API_KEY' with your actual API key
        const apiUrl = 'https://extractorapi.com/api/v1/extractor';

        const extractButton = document.getElementById('extract-button');
        const urUrlInput = document.getElementById('ur-url');
        const resultsUrlDisplay = document.getElementById('results-url');

        extractButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const urUrl = urUrlInput.value.trim();

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        if (urUrl === '' || !urlRegex.test(urUrl)) {
            alert('Please enter a valid URL.');
            return;
        }

        const endpoint = apiUrl + '?apikey=' + apiKey + '&url=' + encodeURIComponent(urUrl);

        try {
            const response = await fetch(endpoint);
            const result = await response.json();
            const resultsUrl = result.images;
            resultsUrlDisplay.textContent = resultsUrl;
        } catch (error) {
            console.error('Error:', error);
        }
        });
    });