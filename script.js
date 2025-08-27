document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const enterpriseBtn = document.getElementById('profile-enterprise');
    const personalBtn = document.getElementById('profile-personal');
    const showcaseSection = document.getElementById('showcase');
    const connectSection = document.getElementById('connect');
    const playgroundsSection = document.getElementById('playgrounds');

    // SPA navigation
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            links.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Profile switcher logic
    function setProfile(profile) {
        if (profile === 'enterprise') {
            enterpriseBtn.classList.add('active');
            personalBtn.classList.remove('active');
            showcaseSection.style.display = 'block';
            connectSection.style.display = 'block';
            playgroundsSection.style.display = 'none';
            document.getElementById('medium-enterprise').style.display = 'block';
            document.getElementById('medium-personal').style.display = 'none';
        } else {
            personalBtn.classList.add('active');
            enterpriseBtn.classList.remove('active');
            showcaseSection.style.display = 'block';
            connectSection.style.display = 'block';
            playgroundsSection.style.display = 'block';
            document.getElementById('medium-enterprise').style.display = 'none';
            document.getElementById('medium-personal').style.display = 'block';
        }
    }
    enterpriseBtn.addEventListener('click', () => setProfile('enterprise'));
    personalBtn.addEventListener('click', () => setProfile('personal'));
    // Default profile
    setProfile('enterprise');

    // Initialize by showing the first section
    if (sections.length > 0) {
        sections.forEach((section, index) => {
            section.style.display = index === 0 ? 'block' : 'none';
        });
    }

    // Fetch Medium articles (using RSS feeds via rss2json API)
    function fetchMediumArticles(feedUrl, containerId) {
        fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`)
            .then(res => res.json())
            .then(data => {
                const container = document.getElementById(containerId);
                container.innerHTML = '';
                if (data.items) {
                    data.items.slice(0, 5).forEach(item => {
                        const card = document.createElement('div');
                        card.className = 'article-card';
                        card.innerHTML = `
                            <a href="${item.link}" target="_blank" class="article-title">${item.title}</a>
                            <div class="article-meta">${new Date(item.pubDate).toLocaleDateString()} &middot; ${item.author}</div>
                            <div class="article-desc">${item.description.substring(0, 120)}...</div>
                        `;
                        container.appendChild(card);
                    });
                } else {
                    container.innerHTML = '<div class="text-gray-400">No articles found.</div>';
                }
            })
            .catch(() => {
                document.getElementById(containerId).innerHTML = '<div class="text-gray-400">Failed to load articles.</div>';
            });
    }
    // Replace with your actual Medium profile RSS URLs
    fetchMediumArticles('https://medium.com/feed/@ThirtyNimrod', 'enterprise-articles');
    fetchMediumArticles('https://medium.com/feed/@nimrodwrites', 'personal-articles');
});
