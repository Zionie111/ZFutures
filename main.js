// Main JavaScript file for ZFutures website
// Handles page navigation, dynamic content loading, and UI interactions

// Load blog posts from blog-posts.js
function loadBlogPosts() {
    const container = document.getElementById('blogPostsList');
    if (!container) return;
    
    container.innerHTML = blogPosts.map(post => `
        <article class="blog-post" onclick="window.open('${post.url}', '_blank')">
            <div class="blog-image" style="background: ${post.gradient};">${post.icon}</div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="blog-category">${post.category}</span>
                    <span>•</span>
                    <span>${post.readTime}</span>
                    <span>•</span>
                    <span>${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <a class="read-more">Read article →</a>
            </div>
        </article>
    `).join('');
}

// Load insights from insights.js
function loadInsights() {
    const container = document.getElementById('insightsList');
    if (!container) return;
    
    container.innerHTML = insights.map(insight => `
        <div class="resource-card">
            <div class="resource-card-image" style="background: ${insight.gradient};">${insight.icon}</div>
            <div class="resource-card-body">
                <div class="tag">${insight.type}</div>
                <h3>${insight.title}</h3>
                <p>${insight.description}</p>
                <a ${insight.available ? `href="${insight.url}" target="_blank"` : 'style="color: #9CA3AF; cursor: not-allowed;"'}>
                    ${insight.available ? 'Download →' : 'Coming Soon'}
                </a>
            </div>
        </div>
    `).join('');
}

// Page navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) selectedPage.classList.add('active');
    
    document.querySelectorAll('.nav-links a[data-page]').forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================================
// CONTACT FORM SUBMISSION HANDLER
// ========================================================

// Google Apps Script URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx2869Qhc-Ju79n1XLu9F1_BWoYL90s7Rt8OiT_dE9NiRbroDMB4HxYCG0cFzwUTBGM/exec';

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    
    // Load blog posts and insights
    loadBlogPosts();
    loadInsights();
    
    // Setup form submission handler
    const form = document.getElementById('zfutures-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get elements
            const submitBtn = document.getElementById('submit-btn');
            const btnText = document.getElementById('btn-text');
            const btnLoading = document.getElementById('btn-loading');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            const errorText = document.getElementById('error-text');
            
            // Validate message length
            const messageField = form.querySelector('[name="message"]');
            if (messageField.value.trim().length < 20) {
                errorMessage.style.display = 'block';
                errorText.textContent = 'Please provide more details about your challenge (minimum 20 characters).';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            
            // Disable submit button and show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            
            // Hide any previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Collect form data
            const formData = new FormData(form);
            
            // Convert FormData to URL-encoded string
            const params = new URLSearchParams(formData).toString();
            
            // Submit to Google Apps Script
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params,
                mode: 'no-cors' // Required for Google Apps Script
            })
            .then(() => {
                // Show success message
                successMessage.style.display = 'block';
                
                // Reset form
                form.reset();
                
                // Scroll to success message
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Re-enable submit button
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            })
            .catch((error) => {
                // Show error message
                errorMessage.style.display = 'block';
                errorText.textContent = 'There was an error submitting your form. Please try again or email us directly at ZFutures@outlook.com';
                
                // Scroll to error message
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Re-enable submit button
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
                
                // Log error for debugging
                console.error('Form submission error:', error);
            });
        });
    }
});
