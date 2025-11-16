// Main JavaScript Functionality
// =============================

// Smooth Scrolling Navigation
$(document).ready(function() {
    // Smooth scroll to tab sections when clicking tab buttons
    $('.accenture-tab').on('click', function(e) {
        const tabName = $(this).attr('data-tab');
        const targetSection = $(`[data-section="${tabName}"]`);

        if (targetSection.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: targetSection.offset().top - 120 // Offset for fixed nav with some padding
            }, 1000, 'easeInOutCubic');
        }
    });

    // Add scroll-based effects
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();

        // Add scrolled class to nav for background change
        if (scrollTop > 50) {
            $('nav[data-nav]').addClass('nav-scrolled');
        } else {
            $('nav[data-nav]').removeClass('nav-scrolled');
        }

        // Add fade-in effects to sections with staggered timing
        $('[data-section]').each(function(index) {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = scrollTop;
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                // Add staggered delay for multiple sections
                setTimeout(() => {
                    $(this).addClass('in-view');
                }, index * 100);
            }
        });
    });

    // Add click ripple effect to buttons
    $('.accenture-tab, .accenture-button-primary, .accenture-button-secondary').on('click', function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple-effect"></span>');

        const x = e.pageX - button.offset().left;
        const y = e.pageY - button.offset().top;

        ripple.css({
            left: x,
            top: y
        });

        button.append(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });

    // Enhanced theme toggle with smooth transition
    $('#theme-toggle').on('click', function() {
        $('body').addClass('theme-transitioning');
        setTimeout(() => {
            $('body').removeClass('theme-transitioning');
        }, 300);
    });
});

// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    if (html.getAttribute('data-theme') === 'dark') {
        html.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        html.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    html.setAttribute('data-theme', 'dark');
}

// Enhanced Tab functionality with Liquid Glass effects
const tabButtons = document.querySelectorAll('.accenture-tab');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.getAttribute('data-tab');

        // If already active, do nothing
        if (button.classList.contains('active')) return;

        // Add activating class for morph animation
        button.classList.add('activating');

        // Remove activating class after animation
        setTimeout(() => {
            button.classList.remove('activating');
        }, 600);

        // Remove active class from all buttons with smooth transition
        tabButtons.forEach(btn => {
            if (btn !== button) {
                btn.classList.remove('active');
            }
        });

        // Add active class to clicked button
        button.classList.add('active');

        // Hide all tab contents with fade effect
        tabContents.forEach(content => {
            if (!content.classList.contains('hidden')) {
                content.style.opacity = '0';
                content.style.transform = 'translateY(10px)';
                setTimeout(() => {
                    content.classList.add('hidden');
                    content.style.opacity = '';
                    content.style.transform = '';
                }, 200);
            }
        });

        // Show selected tab content with smooth animation
        setTimeout(() => {
            const targetContent = document.getElementById(tabName + '-tab');
            targetContent.classList.remove('hidden');
            targetContent.classList.add('animate-in');
        }, 200);
    });
});

// Basic analytics - visitor counter
// Using a simple localStorage-based counter for demo
// In production, you'd use Google Analytics or similar
let visitorCount = localStorage.getItem('visitorCount') || 0;
visitorCount = parseInt(visitorCount) + 1;
localStorage.setItem('visitorCount', visitorCount);

// Display visitor count (you can add this to a dashboard section later)
console.log(`Portfolio visitors: ${visitorCount}`);

// Fetch Medium articles for enterprise (tech-focused)
async function fetchEnterpriseArticles() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@ThirtyNimrod');
        const data = await response.json();
        const container = document.getElementById('tech-articles-container');

        if (data.items && data.items.length > 0) {
            container.innerHTML = '';
            data.items.slice(0, 6).forEach(item => {
                const articleDiv = document.createElement('div');
                articleDiv.className = 'article-card';
                articleDiv.innerHTML = `
                    <h3 class="font-semibold mb-2">
                        <a href="${item.link}" target="_blank" class="accenture-link">
                            ${item.title}
                        </a>
                    </h3>
                    <p class="text-gray-600 text-sm mb-2">
                        ${new Date(item.pubDate).toLocaleDateString()}
                    </p>
                    <p class="text-gray-700 text-sm">
                        ${item.description.replace(/<[^>]*>/g, '').substring(0, 150)}...
                    </p>
                `;
                container.appendChild(articleDiv);
            });
        } else {
            container.innerHTML = '<div class="text-center text-gray-500 py-8">No technical articles found. Update the Medium RSS URL in the script.</div>';
        }
    } catch (error) {
        document.getElementById('tech-articles-container').innerHTML =
            '<div class="text-center text-gray-500 py-8">Failed to load technical articles. Please check the Medium RSS URL.</div>';
    }
}

// Load articles when the tech articles tab is clicked
document.querySelector('[data-tab="tech-articles"]').addEventListener('click', () => {
    setTimeout(fetchEnterpriseArticles, 100);
});

// Contact form handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    // Create mailto link with form data
    const mailtoLink = `mailto:thirtynimrod@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form
    this.reset();

    // Show success message (you could enhance this with a proper modal)
    alert('Thank you for your message! Your email client has been opened with the pre-filled information.');
});

// Resume download functionality
document.getElementById('download-resume').addEventListener('click', function() {
    const resumeContent = generateResumeHTML();

    // Create a new window with the resume
    const resumeWindow = window.open('', '_blank');
    resumeWindow.document.write(resumeContent);
    resumeWindow.document.close();

    // Trigger print dialog for PDF saving
    setTimeout(() => {
        resumeWindow.print();
    }, 500);
});

function generateResumeHTML() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Divya Pratap Singh Bhadoria - Resume</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #007acc;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .name {
            font-size: 28px;
            font-weight: bold;
            color: #007acc;
            margin-bottom: 10px;
        }
        .title {
            font-size: 18px;
            color: #666;
            margin-bottom: 10px;
        }
        .contact {
            font-size: 14px;
            color: #666;
        }
        .section {
            margin-bottom: 30px;
        }
        .section-title {
            font-size: 20px;
            font-weight: bold;
            color: #007acc;
            border-bottom: 1px solid #ddd;
            padding-bottom: 5px;
            margin-bottom: 15px;
        }
        .achievement {
            background: #f8f9fa;
            padding: 10px;
            margin: 10px 0;
            border-left: 4px solid #007acc;
        }
        .skill-category {
            margin-bottom: 15px;
        }
        .skills {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }
        .skill {
            background: #007acc;
            color: white;
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
        }
        .project {
            margin: 15px 0;
            padding: 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        .project-title {
            font-weight: bold;
            color: #007acc;
        }
        @media print {
            body { margin: 0; }
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="name">Divya Pratap Singh Bhadoria</div>
        <div class="title">Data Engineering, Management & Governance Senior Analyst</div>
        <div class="contact">
            Gwalior, India | thirtynimrod@outlook.com | linkedin.com/in/iamdivyapratap
        </div>
    </div>

    <div class="section">
        <div class="section-title">Professional Summary</div>
        <p>Data Engineering, Management, and Governance Senior Analyst with expertise in AI-powered solutions and automated testing. Recently promoted from Analyst role, specializing in creating Testing Persona LLM Agents using LangGraph and Autogen. Previously focused on testing data migration and developing LLM tools for data governance platforms.</p>
    </div>

    <div class="section">
        <div class="section-title">Experience</div>
        <div class="achievement">
            <strong>Data Engineering, Management & Governance Senior Analyst</strong><br>
            Accenture, Present<br><br>
            <strong>Key Achievements:</strong>
            <ul>
                <li>Star of the Month, April 2025</li>
                <li>ACE Award, Q3 FY25</li>
                <li>Expert@MyC Award for achieving P4 proficiency</li>
            </ul>
            <strong>Current Responsibilities:</strong>
            <ul>
                <li>Creating Testing Persona LLM Agents using LangGraph and Autogen</li>
                <li>Developing AI-powered testing solutions</li>
            </ul>
            <strong>Previous Experience:</strong>
            <ul>
                <li>Testing data migration between data governance platforms</li>
                <li>Creating LLM tools for data migration testing</li>
            </ul>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Skills</div>
        <div class="skill-category">
            <strong>Technical Skills:</strong>
            <div class="skills">
                <span class="skill">Python</span>
                <span class="skill">AI/ML</span>
                <span class="skill">Data Governance</span>
                <span class="skill">Google Cloud</span>
                <span class="skill">SQL</span>
            </div>
        </div>
        <div class="skill-category">
            <strong>Soft Skills:</strong>
            <div class="skills">
                <span class="skill">Communication</span>
                <span class="skill">Leadership</span>
                <span class="skill">Problem Solving</span>
            </div>
        </div>
    </div>

    <div class="section">
        <div class="section-title">Education</div>
        <div class="achievement">
            <strong>B.Tech - Computer Science and Engineering</strong><br>
            VIT Bhopal, 2023
        </div>
    </div>

    <div class="section">
        <div class="section-title">Certifications</div>
        <p>Multiple professional certifications available on Credly: <a href="https://www.credly.com/users/thirtynimrod/badges">https://www.credly.com/users/thirtynimrod/badges</a></p>
    </div>

    <div class="section">
        <div class="section-title">Projects</div>
        <p>View detailed project portfolio on GitHub: <a href="https://github.com/ThirtyNimrod">https://github.com/ThirtyNimrod</a></p>
    </div>
</body>
</html>`;
}