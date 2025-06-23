// Dark Mode Implementation for Main Website
class DarkModeManager {
    constructor() {
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.createToggleButton();
        this.applyDarkMode();
        this.setupEventListeners();
    }

    createToggleButton() {
        // Add dark mode toggle to navigation
        const navbar = document.querySelector('.navbar-nav');
        if (navbar) {
            const darkModeItem = document.createElement('li');
            darkModeItem.className = 'nav-item';
            darkModeItem.innerHTML = `
                <button class="nav-link btn btn-link" id="darkModeToggle" style="border: none; background: none;">
                    <i class="bi ${this.isDarkMode ? 'bi-sun' : 'bi-moon'}"></i>
                </button>
            `;
            navbar.appendChild(darkModeItem);
        }
    }

    setupEventListeners() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.addEventListener('click', () => {
                this.toggleDarkMode();
            });
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        this.applyDarkMode();
        this.updateToggleIcon();
    }

    applyDarkMode() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            this.addDarkModeStyles();
        } else {
            document.documentElement.removeAttribute('data-theme');
            this.removeDarkModeStyles();
        }
    }

    updateToggleIcon() {
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            const icon = toggle.querySelector('i');
            icon.className = `bi ${this.isDarkMode ? 'bi-sun' : 'bi-moon'}`;
        }
    }

    addDarkModeStyles() {
        if (!document.getElementById('darkModeStyles')) {
            const styles = document.createElement('style');
            styles.id = 'darkModeStyles';
            styles.textContent = `
                [data-theme="dark"] {
                    --bs-body-bg: #1a1a1a;
                    --bs-body-color: #ffffff;
                    --bs-primary: #667eea;
                    --bs-secondary: #764ba2;
                }

                [data-theme="dark"] body {
                    background-color: #1a1a1a !important;
                    color: #ffffff !important;
                }

                [data-theme="dark"] .navbar {
                    background-color: #2d2d2d !important;
                    border-bottom: 1px solid #444;
                }

                [data-theme="dark"] .navbar-brand,
                [data-theme="dark"] .nav-link {
                    color: #ffffff !important;
                }

                [data-theme="dark"] .nav-link:hover {
                    color: #667eea !important;
                }

                [data-theme="dark"] .bg-light {
                    background-color: #2d2d2d !important;
                }

                [data-theme="dark"] .bg-white {
                    background-color: #1a1a1a !important;
                }

                [data-theme="dark"] .card {
                    background-color: #2d2d2d !important;
                    border-color: #444 !important;
                }

                [data-theme="dark"] .text-muted {
                    color: #adb5bd !important;
                }

                [data-theme="dark"] .form-control {
                    background-color: #333 !important;
                    border-color: #444 !important;
                    color: #ffffff !important;
                }

                [data-theme="dark"] .form-control:focus {
                    background-color: #333 !important;
                    border-color: #667eea !important;
                    color: #ffffff !important;
                    box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25) !important;
                }

                [data-theme="dark"] .btn-outline-dark {
                    color: #ffffff !important;
                    border-color: #ffffff !important;
                }

                [data-theme="dark"] .btn-outline-dark:hover {
                    background-color: #ffffff !important;
                    color: #1a1a1a !important;
                }

                [data-theme="dark"] .btn-outline-secondary {
                    color: #adb5bd !important;
                    border-color: #adb5bd !important;
                }

                [data-theme="dark"] .btn-outline-secondary:hover {
                    background-color: #adb5bd !important;
                    color: #1a1a1a !important;
                }

                [data-theme="dark"] footer {
                    background-color: #2d2d2d !important;
                    border-top: 1px solid #444;
                }

                [data-theme="dark"] .image-item {
                    background-color: #2d2d2d !important;
                    border-color: #444 !important;
                }

                [data-theme="dark"] .document-link {
                    color: #adb5bd !important;
                }

                [data-theme="dark"] .description {
                    color: #adb5bd !important;
                }

                [data-theme="dark"] .table {
                    --bs-table-bg: #2d2d2d;
                    --bs-table-color: #ffffff;
                    --bs-table-border-color: #444;
                }

                [data-theme="dark"] .modal-content {
                    background-color: #2d2d2d !important;
                    color: #ffffff !important;
                }

                [data-theme="dark"] .modal-header {
                    border-bottom-color: #444 !important;
                }

                [data-theme="dark"] .modal-footer {
                    border-top-color: #444 !important;
                }

                [data-theme="dark"] .feature {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                }

                [data-theme="dark"] .profile {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                }

                [data-theme="dark"] .text-gradient {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                [data-theme="dark"] .bg-gradient-primary-to-secondary {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
                }

                /* Smooth transitions */
                * {
                    transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
                }
            `;
            document.head.appendChild(styles);
        }
    }

    removeDarkModeStyles() {
        const styles = document.getElementById('darkModeStyles');
        if (styles) {
            styles.remove();
        }
    }
}

// Initialize dark mode when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DarkModeManager();
});