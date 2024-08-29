    // script.js

/**
 * Handles the submission of the upload form, sending the uploaded image to the backend API for diagnosis.
 *
 * @param {Event} event - The submit event triggered by the form submission.
 */
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('imageUpload');
    const file = fileInput.files[0];
    
    /**
     * Checks if a file has been uploaded. If not, alerts the user to upload an image.
     */
    if (!file) {
        alert("Please upload an image!");
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    /**
     * Sends the uploaded image to the backend API for diagnosis using the Fetch API.
     *
     * @param {string} url - The URL of the backend API endpoint (e.g. http://localhost:5000/predict).
     * @param {Object} options - The options for the Fetch API request.
     */
    fetch('http://localhost:5000/predict', {  // Adjust the URL as needed
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        /**
         * Displays the diagnosis result in the #diagnosis element.
         *
         * @param {Object} data - The response data from the backend API.
         */
        const diagnosis = document.getElementById('diagnosis');
        diagnosis.textContent = data.disease;
    })
    .catch(error => {
        console.error('Error:', error);
        alert("There was an error diagnosing the disease.");
    });
});

/**
 * Example usage:
 * 
 * 1. Create an HTML form with an input field for file upload:
 * ```html
 * <form id="uploadForm">
 *   <input type="file" id="imageUpload" />
 *   <button type="submit">Upload and Diagnose</button>
 * </form>
 * ```
 * 
 * 2. Add a div element to display the diagnosis result:
 * ```html
 * <div id="diagnosis"></div>
 * ```
 * 
 * 3. Run the script and upload an image to see the diagnosis result.
 */