document.getElementById('api-key').addEventListener('input', function() {
    const apiKey = this.value;
    const uploadOptions = document.getElementById('upload-options');
    if (apiKey) {
        uploadOptions.style.display = 'block'; // Show upload options if API key is entered
    } else {
        uploadOptions.style.display = 'none'; // Hide upload options if API key is empty
    }
});

document.getElementById('run-analysis').addEventListener('click', function() {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block'; // Show loading animation

    // Simulate processing (replace with actual analysis logic)
    setTimeout(() => {
        loadingAnimation.style.display = 'none'; // Hide loading animation
        document.getElementById('results').innerHTML = 'Results of analysis and practice paper will be displayed here.'; // Display results
    }, 3000); // Simulate a 3-second processing time
}); 