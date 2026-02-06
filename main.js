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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    
    loadBlogPosts();
    loadInsights();
});
