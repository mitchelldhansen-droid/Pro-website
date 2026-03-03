// Scroll reveal animations using IntersectionObserver
document.addEventListener('DOMContentLoaded', function () {
    // Add reveal class to all sections except hero
    var sections = document.querySelectorAll('section, .companies-section');
    sections.forEach(function (section) {
        if (section.id !== 'hero') {
            section.classList.add('reveal');
        }
    });

    // Observe elements and reveal them when they enter the viewport
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(function (el) {
        observer.observe(el);
    });
});
