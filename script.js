
// Language configuration
const languages = [
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'العربية' },
    { code: 'fr', name: 'Français' },
    { code: 'es', name: 'Español' },
    { code: 'zh', name: '中文' },
    { code: 'hi', name: 'हिंदी' },
    { code: 'ru', name: 'Русский' }
];

const currentLang = localStorage.getItem('lang') || 'en';
document.documentElement.lang = currentLang;
document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

function updateContent(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('lang', lang);
}

// Modal Functions
function showModal(title, content) {
    const modal = document.getElementById('featureModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    modalTitle.textContent = title;
    modalContent.innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('featureModal').style.display = 'none';
}

function showMissionModal() {
    showModal('🎯 Daily Missions', `
        <div class="mission-list">
            <div class="mission">
                <h3>Morning Champion</h3>
                <p>Get to work before 8:00 AM using green transport</p>
                <div class="progress">Progress: 2/3 rides this week</div>
            </div>
            <div class="mission">
                <h3>Explorer</h3>
                <p>Visit a new station this week</p>
                <div class="progress">Not started</div>
            </div>
        </div>
    `);
}

function showARModal() {
    showModal('🧭 AR Experiences', `
        <div class="ar-features">
            <p>Available AR experiences near you:</p>
            <ul>
                <li>Ancient Saudi Stories at Central Station</li>
                <li>Green Commuter Challenge at North Terminal</li>
                <li>Cultural Heritage Tour at West Station</li>
            </ul>
        </div>
    `);
}

function showSquadModal() {
    showModal('👫 Squads & Social', `
        <div class="squad-info">
            <h3>Your Squad: Road Warriors</h3>
            <p>Squad Rank: #3 in Riyadh</p>
            <p>Weekly Challenge: 500km green travel</p>
            <button class="feature-button">Invite Friends</button>
        </div>
    `);
}

function showEcoModal() {
    showModal('🌍 Eco Wallet', `
        <div class="eco-stats">
            <h3>Your Impact</h3>
            <p>CO₂ Saved: 125kg</p>
            <p>Rihala Points: 2,500</p>
            <h4>Available Rewards:</h4>
            <ul>
                <li>Plant a Tree (500 credits)</li>
                <li>Free Coffee at Station Café (200 credits)</li>
                <li>Limited Edition NFT Badge (1000 credits)</li>
            </ul>
        </div>
    `);
}

function showExperienceDetails(title, description) {
    showModal('🎮 Experience Details', `
        <div class="experience-details">
            <h3>${title}</h3>
            <p>${description}</p>
            <div class="progress-bar">
                <div class="progress" style="width: 60%"></div>
            </div>
            <button class="feature-button">Start Experience</button>
        </div>
    `);
}

function showRewardDetails(title, description, points) {
    showModal('🏆 Reward Details', `
        <div class="reward-details">
            <h3>${title}</h3>
            <p>${description}</p>
            <p class="points">Points needed: ${points}</p>
            <button class="feature-button">Claim Reward</button>
        </div>
    `);
}

document.addEventListener('DOMContentLoaded', () => {
    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('featureModal');
        if (event.target === modal) {
            closeModal();
        }
    }
    
    // Initialize content with saved language
    updateContent(currentLang);

    // Initialize animations
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Populate language selector
    const languageSelect = document.getElementById('languageSelect');
    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang.code;
        option.textContent = lang.name;
        languageSelect.appendChild(option);
    });

    // Language selector event listener
    languageSelect.addEventListener('change', (e) => {
        updateContent(e.target.value);
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate feature cards on scroll
    const cards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
