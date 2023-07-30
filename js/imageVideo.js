document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '70f72cd3748a0afd4ddbf55df9d2376c1e16174b'; // Replace 'YOUR_API_KEY' with your actual API key
    const apiUrl = 'https://extractorapi.com/api/v1/extractor';

    const resultsBox = document.querySelector('.results-display');
    resultsBox.style.display = 'none';

    const preloader = document.querySelector('.preloader-overl');
    preloader.style.display = 'none';

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
            const preloader = document.querySelector('.preloader-overl');
            preloader.style.display = 'block';

            const response = await fetch(endpoint);
            const result = await response.json();
            const resultsUrl = result.images;

            // Create p elements to display each image link
            const imageLinks = resultsUrl.map(url => {
                const linkElement = document.createElement('p');
                linkElement.textContent = url;
                linkElement.classList.add('p-style');
                return linkElement;
            });

            // Clear any previous results and append the new image links to the resultsUrlDisplay div
            resultsUrlDisplay.innerHTML = '';
            imageLinks.forEach(link => {
                resultsUrlDisplay.appendChild(link);
            });

            preloader.style.display = 'none';
            resultsBox.style.display = 'block';

        } catch (error) {
            console.error('Error:', error);
        }
    });
});