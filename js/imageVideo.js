document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70f72cd3748a0afd4ddbf55df9d2376c1e16174b'; // Replace 'YOUR_API_KEY' with your actual API key
        const apiUrl = 'https://extractorapi.com/api/v1/extractor';

        const shortenButton = document.getElementById('shorten-button');
        const longUrlInput = document.getElementById('long-url');
        const shortUrlInput = document.getElementById('short-url');

        shortenButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const longUrl = longUrlInput.value.trim();

        const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

        if (longUrl === '' || !urlRegex.test(longUrl)) {
            alert('Please enter a valid URL.');
            return;
        }

        const endpoint = apiUrl + '?apikey=' + apiKey + '&url=' + encodeURIComponent(longUrl);

        try {
            const response = await fetch(endpoint);
            const result = await response.json();
            const shortUrl = result.text;
            shortUrlInput.textContent = shortUrl;
        } catch (error) {
            console.error('Error:', error);
        }
        });
    });