// ============================================
// QUOTE GENERATOR APP - JavaScript
// ============================================

/* 👤 MAE: Study API integration (fetchQuote function)
   👤 ICOREYKJAVIK: Study UI functions and display controls
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements (Getting HTML elements by their IDs) ---
    // 👤 MAE: Quote generator elements
    const getQuoteBtn = document.getElementById('get-quote-btn');
    const quoteDisplayContainer = document.getElementById('quote-display');
    const errorMessageContainer = document.getElementById('error-message');
    const loadingSpinner = document.getElementById('loading-spinner');

    // ============================================
    // 👤 ICOREYKJAVIK: UI Display Functions
    // ============================================
    
    // Shows/hides the loading spinner
    const showLoading = (isLoading) => {
        if (isLoading) {
            loadingSpinner.classList.remove('hidden');
            loadingSpinner.classList.add('flex');
            quoteDisplayContainer.classList.add('hidden');
            errorMessageContainer.textContent = '';
        } else {
            loadingSpinner.classList.add('hidden');
            loadingSpinner.classList.remove('flex');
            quoteDisplayContainer.classList.remove('hidden');
        }
    };

    // Displays error message if API fails
    const displayError = (message) => {
        errorMessageContainer.textContent = message;
        quoteDisplayContainer.innerHTML = `<p class="quote-placeholder">Could not load quote.</p>`;
    };

    // Displays the fetched quote on screen
    const displayQuote = (quote, author) => {
        quoteDisplayContainer.innerHTML = `
            <figure>
                <blockquote>"&hellip;${quote}"</blockquote>
                <figcaption>&mdash; ${author}</figcaption>
            </figure>
        `;
        errorMessageContainer.textContent = '';
    };

    // ============================================
    // 👤 MAE: API Integration - This is the main API function!
    // ============================================
    
    const fetchQuote = async () => {
        showLoading(true);  // Show spinner while loading
        
        try {
            // 1. 👤 MAE: API Call using fetch - requests data from server
            const apiUrl = `https://dummyjson.com/quotes/random`;
            const response = await fetch(apiUrl);
            
            // 2. 👤 MAE: Handle API Response - check if request succeeded
            if (!response.ok) {
                // Handle non-200 responses (e.g., 404, 500)
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }
            
            // 3. 👤 MAE: Parse JSON data - convert response to JavaScript object
            const data = await response.json();
            displayQuote(data.quote, data.author);  // Show quote on screen

        } catch (error) {
            // 4. 👤 MAE: Error Handling - what to do if API fails
            console.error('Fetch Error:', error);
            displayError('Could not fetch quote. Please check your internet connection and try again.');
        } finally {
            showLoading(false);  // Hide spinner when done
        }
    };

    // ============================================
    // Event Listener - Connect button to function
    // 👤 MAE: Quote generator button triggers API call
    // ============================================
    
    getQuoteBtn.addEventListener('click', fetchQuote);
    
    // 👤 MAE: Automatically fetch a quote when page loads
    fetchQuote();
});

