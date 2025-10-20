// ============================================
// THE QUOTE COLLECTIVE - JavaScript
// ============================================

/* 👤 MAE: Study API integration (fetchQuote function)
   👤 ICOREYKJAVIK: Study UI functions and modal controls
*/

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements (Getting HTML elements by their IDs) ---
    // 👤 ICOREYKJAVIK: Page navigation elements
    const portfolioSection = document.getElementById('portfolio');
    const appSection = document.getElementById('app');
    const launchAppBtn = document.getElementById('launch-app-btn');
    const backToPortfolioBtn = document.getElementById('back-to-portfolio-btn');
    
    // 👤 MAE: Quote generator elements
    const getQuoteBtn = document.getElementById('get-quote-btn');
    const quoteDisplayContainer = document.getElementById('quote-display');
    const errorMessageContainer = document.getElementById('error-message');
    const loadingSpinner = document.getElementById('loading-spinner');

    // 👤 ICOREYKJAVIK: Member Modal Elements
    const memberModal = document.getElementById('member-modal');
    const closeMemberModalBtn = document.getElementById('close-member-modal');
    const memberCards = document.querySelectorAll('.member-card');
    const modalMemberImage = document.getElementById('modal-member-image');
    const modalMemberName = document.getElementById('modal-member-name');
    const modalMemberRole = document.getElementById('modal-member-role');
    const modalMemberBio = document.getElementById('modal-member-bio');

    // ============================================
    // 👤 ICOREYKJAVIK: Page Navigation Functions
    // ============================================
    
    // Shows the portfolio page, hides the app
    const showPortfolio = () => {
        portfolioSection.classList.remove('hidden');
        portfolioSection.classList.add('fade-in');
        appSection.classList.add('hidden');
        window.scrollTo(0, 0); // Scroll to top
    };

    // Shows the quote generator app, hides the portfolio
    const showApp = () => {
        appSection.classList.remove('hidden');
        appSection.classList.add('fade-in');
        portfolioSection.classList.add('hidden');
        if (quoteDisplayContainer.textContent.includes("Your quote will appear here")) {
            fetchQuote(); // 👤 MAE: Automatically fetch first quote
        }
        window.scrollTo(0, 0); // Scroll to top
    };
    
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
    // 👤 ICOREYKJAVIK: Member Modal Functions
    // ============================================
    
    // Opens modal and fills it with member data
    const openMemberModal = (memberData) => {
        modalMemberImage.src = memberData.image;
        modalMemberImage.alt = `${memberData.name} avatar`;
        modalMemberName.textContent = memberData.name;
        modalMemberRole.textContent = memberData.role;
        modalMemberBio.textContent = memberData.bio;
        
        memberModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    };

    // Closes the modal and restores scrolling
    const closeMemberModal = () => {
        memberModal.classList.add('hidden');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // 👤 ICOREYKJAVIK: Add click event to each member card
    memberCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get member data from HTML data attributes
            const memberData = {
                name: card.dataset.name,
                role: card.dataset.role,
                bio: card.dataset.bio,
                image: card.dataset.image
            };
            openMemberModal(memberData);
        });
    });

    // 👤 ICOREYKJAVIK: Close modal when X button is clicked
    closeMemberModalBtn.addEventListener('click', closeMemberModal);

    // 👤 ICOREYKJAVIK: Close modal when clicking outside (on overlay)
    memberModal.addEventListener('click', (e) => {
        if (e.target === memberModal || e.target.classList.contains('modal-overlay')) {
            closeMemberModal();
        }
    });

    // 👤 ICOREYKJAVIK: Close modal when Escape key is pressed
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !memberModal.classList.contains('hidden')) {
            closeMemberModal();
        }
    });

    // ============================================
    // Event Listeners - Connect buttons to functions
    // 👤 ICOREYKJAVIK: Navigation buttons
    // 👤 MAE: Quote generator button
    // ============================================
    
    launchAppBtn.addEventListener('click', showApp);
    backToPortfolioBtn.addEventListener('click', showPortfolio);
    getQuoteBtn.addEventListener('click', fetchQuote);  // 👤 MAE: Triggers API call
});

