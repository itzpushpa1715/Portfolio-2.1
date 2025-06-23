// Admin Panel JavaScript
class AdminPanel {
    constructor() {
        this.currentSection = 'dashboard';
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.checkAuth();
        this.setupEventListeners();
        this.setupDarkMode();
        this.loadDashboardData();
    }

    checkAuth() {
        if (!localStorage.getItem('adminLoggedIn')) {
            window.location.href = 'login.html';
        }
    }

    setupEventListeners() {
        // Menu navigation
        document.querySelectorAll('.menu-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = link.dataset.section;
                if (section) {
                    this.showSection(section);
                }
            });
        });

        // Quick action buttons
        document.querySelectorAll('[data-section]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const section = btn.dataset.section;
                if (section) {
                    this.showSection(section);
                }
            });
        });

        // Logout
        document.getElementById('logoutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
        });

        // Dark mode toggle
        document.getElementById('darkModeToggle').addEventListener('click', () => {
            this.toggleDarkMode();
        });

        // Form submissions
        this.setupFormHandlers();
    }

    setupFormHandlers() {
        // Profile form
        document.getElementById('profileForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveProfile();
        });

        // Settings form
        document.getElementById('settingsForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveSettings();
        });

        // Password form
        document.getElementById('passwordForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.changePassword();
        });
    }

    showSection(sectionName) {
        // Hide all sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });

        // Show selected section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update menu active state
        document.querySelectorAll('.menu-link').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${sectionName}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentSection = sectionName;
    }

    setupDarkMode() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('darkModeToggle').innerHTML = '<i class="bi bi-sun"></i>';
        }
    }

    toggleDarkMode() {
        this.isDarkMode = !this.isDarkMode;
        localStorage.setItem('darkMode', this.isDarkMode);
        
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('darkModeToggle').innerHTML = '<i class="bi bi-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.getElementById('darkModeToggle').innerHTML = '<i class="bi bi-moon"></i>';
        }

        this.showNotification('Dark mode ' + (this.isDarkMode ? 'enabled' : 'disabled'));
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        setTimeout(() => {
            this.updateStats();
        }, 500);
    }

    updateStats() {
        // Update project count
        const projectCount = document.querySelectorAll('#projectsTable tr').length;
        document.getElementById('projectCount').textContent = projectCount;

        // Update blog count
        const blogCount = document.querySelectorAll('#blogTable tr').length;
        document.getElementById('blogCount').textContent = blogCount;

        // Update message count (simulate)
        document.getElementById('messageCount').textContent = '0';
    }

    saveProfile() {
        const formData = new FormData(document.getElementById('profileForm'));
        const profileData = Object.fromEntries(formData);
        
        // Simulate saving to backend
        setTimeout(() => {
            this.showNotification('Profile updated successfully!', 'success');
        }, 1000);
    }

    saveSettings() {
        const formData = new FormData(document.getElementById('settingsForm'));
        const settingsData = Object.fromEntries(formData);
        
        // Simulate saving to backend
        setTimeout(() => {
            this.showNotification('Settings saved successfully!', 'success');
        }, 1000);
    }

    changePassword() {
        const form = document.getElementById('passwordForm');
        const formData = new FormData(form);
        
        // Basic validation
        const currentPassword = formData.get('current_password');
        const newPassword = formData.get('new_password');
        const confirmPassword = formData.get('confirm_password');
        
        if (newPassword !== confirmPassword) {
            this.showNotification('Passwords do not match!', 'error');
            return;
        }
        
        // Simulate password change
        setTimeout(() => {
            this.showNotification('Password changed successfully!', 'success');
            form.reset();
        }, 1000);
    }

    addProject(projectData) {
        const table = document.getElementById('projectsTable');
        const row = table.insertRow();
        
        row.innerHTML = `
            <td>${projectData.title}</td>
            <td>${projectData.category}</td>
            <td><span class="badge bg-success">Published</span></td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        
        this.updateStats();
        this.showNotification('Project added successfully!', 'success');
    }

    addBlogPost(blogData) {
        const table = document.getElementById('blogTable');
        const row = table.insertRow();
        
        row.innerHTML = `
            <td>${blogData.title}</td>
            <td>${blogData.type}</td>
            <td>${new Date().toISOString().split('T')[0]}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary me-1">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-outline-danger">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        
        this.updateStats();
        this.showNotification('Blog post added successfully!', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        notification.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    logout() {
        if (confirm('Are you sure you want to logout?')) {
            localStorage.removeItem('adminLoggedIn');
            window.location.href = 'login.html';
        }
    }
}

// Initialize admin panel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new AdminPanel();
});

// Handle contact form submissions (for the main website)
if (typeof window !== 'undefined') {
    window.handleContactSubmission = function(formData) {
        // This would typically send data to a backend
        // For now, we'll store it in localStorage for the admin panel
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages.push({
            id: Date.now(),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            message: formData.get('message'),
            date: new Date().toISOString(),
            status: 'unread'
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    };
}