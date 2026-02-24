// Initialize AOS Animation
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });

    // Initialize Managers
    const themeManager = new ThemeManager();
    const languageManager = new LanguageManager();
    const faqManager = new FAQManager();
});

// =========================================
// Theme Manager
// =========================================
class ThemeManager {
    constructor() {
        this.toggleBtn = document.getElementById('theme-toggle');
        this.html = document.documentElement;
        this.icon = this.toggleBtn ? this.toggleBtn.querySelector('i') : null;

        // Load saved theme or default to dark
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.applyTheme();

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.currentTheme);
        this.applyTheme();
    }

    applyTheme() {
        if (this.currentTheme === 'light') {
            this.html.classList.add('light');
            this.html.classList.remove('dark');
            if (this.icon) this.icon.className = 'fa-solid fa-moon'; // Show moon in light mode
        } else {
            this.html.classList.remove('light');
            this.html.classList.add('dark');
            if (this.icon) this.icon.className = 'fa-solid fa-sun'; // Show sun in dark mode
        }
    }
}

// =========================================
// Language Manager
// =========================================
class LanguageManager {
    constructor() {
        this.toggleBtn = document.getElementById('lang-toggle');
        this.currentLang = localStorage.getItem('lang') || 'en';

        // Initial render
        this.updateContent();

        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggle());
        }
    }

    toggle() {
        this.currentLang = this.currentLang === 'en' ? 'bn' : 'en';
        localStorage.setItem('lang', this.currentLang);
        this.updateContent();
    }

    updateContent() {
        // Update Toggle Button Text
        if (this.toggleBtn) {
            this.toggleBtn.innerText = this.currentLang === 'en' ? 'EN / BN' : 'বাংলা / English';
        }

        // Update Fonts
        if (this.currentLang === 'bn') {
            document.body.classList.add('font-bengali');
            document.documentElement.lang = 'bn';
        } else {
            document.body.classList.remove('font-bengali');
            document.documentElement.lang = 'en';
        }

        // Update Text Content
        const elements = document.querySelectorAll('[data-i18n]');

        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = this.getNestedTranslation(key);

            if (translation) {
                // Handle HTML content if specified (use with caution)
                if (el.hasAttribute('data-html')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Update Placeholders
        const inputs = document.querySelectorAll('[data-i18n-placeholder]');
        inputs.forEach(input => {
            const key = input.getAttribute('data-i18n-placeholder');
            const translation = this.getNestedTranslation(key);
            if (translation) {
                input.placeholder = translation;
            }
        });
    }

    getNestedTranslation(key) {
        if (typeof translations === 'undefined') return key;

        return key.split('.').reduce((obj, k) => {
            return obj && obj[k];
        }, translations[this.currentLang]);
    }
}

// =========================================
// FAQ Manager
// =========================================
class FAQManager {
    constructor() {
        this.container = document.getElementById('faq-container');
        if (!this.container) return;

        this.initAccordion();
    }

    initAccordion() {
        const items = document.querySelectorAll('.faq-item');

        items.forEach(item => {
            const header = item.querySelector('.faq-header');
            header.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all others
                items.forEach(i => {
                    i.classList.remove('active');
                    const icon = i.querySelector('.faq-icon');
                    if(icon) icon.style.transform = 'rotate(0deg)';
                    const body = i.querySelector('.faq-body');
                    if(body) body.style.maxHeight = null;
                });

                // Toggle current
                if (!isActive) {
                    item.classList.add('active');
                    const icon = item.querySelector('.faq-icon');
                    if(icon) icon.style.transform = 'rotate(180deg)';
                    const body = item.querySelector('.faq-body');
                    if(body) body.style.maxHeight = body.scrollHeight + "px";
                }
            });
        });
    }
}

// =========================================
// Navbar Scroll Effect
// =========================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg', 'glass-nav');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.remove('shadow-lg', 'glass-nav');
        navbar.classList.add('bg-transparent');
    }
});

// =========================================
// Mobile Menu Toggle
// =========================================
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
let isMenuOpen = false;

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('hidden');
            mobileBtn.innerHTML = '<i class="fa-solid fa-xmark text-2xl"></i>';
        } else {
            mobileMenu.classList.add('hidden');
            mobileBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            isMenuOpen = false;
            mobileMenu.classList.add('hidden');
            mobileBtn.innerHTML = '<i class="fa-solid fa-bars text-2xl"></i>';
        });
    });
}
