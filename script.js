document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Replace Feather icons
    feather.replace();

    // Contact form submission
    document.querySelector('.contact-form').addEventListener('submit', async (e) => {
        e.preventDefault();
    
        const form = e.target;
        const formData = new FormData(form);
    
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: JSON.stringify(Object.fromEntries(formData)),
                headers: { 'Content-Type': 'application/json' },
            });
    
            if (response.ok) {
                alert('Your message has been sent successfully!');
                form.reset();
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            alert('An error occurred. Please try again.');
            console.error(error);
        }
    });
    
});
