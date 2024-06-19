console.log('Hello World');
// Import Axios
import axios from 'axios';

// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Find the button by its ID
    const getRandomFossilButton = document.getElementById('get-random-fossil-button');

    // Add a click event listener to the button
    getRandomFossilButton.addEventListener('click', function() {
        // Make an Axios GET request to fetch the random fossil data
        axios.get('/random-fossil.json')
            .then(function(response) {
                // Assuming response.data contains { name: "Fossil Name", image: "url/to/image.jpg" }
                const fossilName = response.data.name;
                const fossilImage = response.data.img;

                // Display the fossil name
                const fossilNameElement = document.getElementById('random-fossil-name');
                fossilNameElement.textContent = fossilName;

                // Display the fossil image
                const fossilImageElement = document.getElementById('random-fossil-image');
                fossilImageElement.src = fossilImage;
                fossilImageElement.alt = fossilName; // Optional: Set alt attribute for accessibility
            })
            .catch(function(error) {
                console.error('Error fetching random fossil:', error);
                // Optionally handle error display or logging
            });
    });
});
