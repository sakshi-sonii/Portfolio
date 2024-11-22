document.addEventListener('DOMContentLoaded', () => {
    initSmoothScrolling();
    replaceFeatherIcons();
    initContactFormSubmission();
    initThemeSwitcher();
});

/**
 * Initializes smooth scrolling for anchor links.
 */
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

/**
 * Replaces Feather icons in the document.
 */
function replaceFeatherIcons() {
    if (typeof feather !== 'undefined') {
        feather.replace();
    } else {
        console.warn('Feather icons library is not loaded.');
    }
}

/**
 * Initializes contact form submission handling.
 */
function initContactFormSubmission() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) {
        console.warn('Contact form not found.');
        return;
    }

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formDataObject),
            });

            if (response.ok) {
                alert('Your message has been sent successfully!');
                form.reset();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message || 'Failed to send the message.'}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error('Error submitting the form:', error);
        }
    });
}

/**
 * Initializes the theme switcher functionality.
 */
function initThemeSwitcher() {
    const themes = ['styles.css', 'styles1.css'];
    let currentThemeIndex = 0;

    // Create and append the theme button if it doesn't exist
    let themeButton = document.getElementById('theme-button');
    if (!themeButton) {
        themeButton = document.createElement('button');
        themeButton.id = 'theme-button';
        themeButton.textContent = 'Change Theme';
        document.body.prepend(themeButton); // Place the button at the top of the body
    }

    // Apply saved theme on load
    const savedThemeIndex = localStorage.getItem('selectedThemeIndex');
    if (savedThemeIndex !== null) {
        currentThemeIndex = parseInt(savedThemeIndex, 10);
        applyTheme(themes[currentThemeIndex]);
    } else {
        applyTheme(themes[currentThemeIndex]); // Apply default theme
    }

    // Event listener for the button
    themeButton.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        applyTheme(themes[currentThemeIndex]);
        localStorage.setItem('selectedThemeIndex', currentThemeIndex);
    });

    /**
     * Applies a theme by changing the href of the stylesheet.
     * @param {string} themePath - The path to the theme stylesheet.
     */
    function applyTheme(themePath) {
        let stylesheet = document.getElementById('theme-stylesheet');
        if (!stylesheet) {
            stylesheet = document.createElement('link');
            stylesheet.id = 'theme-stylesheet';
            stylesheet.rel = 'stylesheet';
            document.head.appendChild(stylesheet);
        }
        stylesheet.href = themePath;
    }
}
