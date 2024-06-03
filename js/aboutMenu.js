document.addEventListener('DOMContentLoaded', () => {
    const aboutBtn = document.getElementById('aboutBtn');
    const aboutMenu = document.getElementById('aboutMenu');
    const closeBtn = document.getElementById('closeBtn');

    aboutBtn.addEventListener('click', () => {
        aboutMenu.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        aboutMenu.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === aboutMenu) {
            aboutMenu.style.display = 'none';
        }
    });
});