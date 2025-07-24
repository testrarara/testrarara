// Radish Project - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Radish Garden Loading Screen (Homepage Only)
    function addPageLoader() {
        // Only show loading on homepage
        if (!window.location.pathname.endsWith('index.html') && window.location.pathname !== '/' && window.location.pathname !== '') {
            return;
        }
        
        const loader = document.createElement('div');
        loader.className = 'loading-garden';
        loader.innerHTML = `
            <div class="garden-scene">
                <div class="garden-ground"></div>
                <div class="garden-radish"></div>
                <div class="garden-radish"></div>
                <div class="garden-radish"></div>
                <div class="garden-radish"></div>
                <div class="garden-radish"></div>
                <div class="garden-radish"></div>
            </div>
            <div style="font-family: 'Fredoka One', cursive; font-size: 2.5rem; color: #2E7D32;
                       text-shadow: 2px 2px 4px rgba(0,0,0,0.1); animation: bounce 1s infinite;">
                CARROT LOADING...
            </div>
            <div style="font-family: 'Nunito', sans-serif; font-size: 1.2rem; color: #4CAF50; 
                       margin-top: 1rem; text-align: center;">
                Welcome to the carrot garden! 🥕🌱
            </div>
        `;
        document.body.appendChild(loader);
        
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.5s ease';
            setTimeout(() => loader.remove(), 500);
        }, 2500);
    }
    
    // Add bounce animation to images
    function addImageAnimations() {
        const images = document.querySelectorAll('.art-image');
        images.forEach(img => {
            img.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(-2deg)';
                this.style.transition = 'all 0.3s ease';
            });
            
            img.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    }
    
    // Add CSS animations for floating and bounce effects
    const style = document.createElement('style');
    style.textContent = `
        .floating {
            animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);

    // Green pastoral color splash effect
    function createColorSplash(e) {
        const colors = ['#4CAF50', '#81C784', '#8BC34A', '#2E7D32', '#81D4FA', '#FFB74D'];
        const splash = document.createElement('div');
        splash.style.cssText = `
            position: fixed;
            pointer-events: none;
            width: 15px;
            height: 15px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            transform: translate(-50%, -50%);
            animation: splashEffect 1s ease-out forwards;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            z-index: 1000;
        `;
        
        document.body.appendChild(splash);
        setTimeout(() => splash.remove(), 1000);
    }
    
    // Add splash effect CSS
    const splashStyle = document.createElement('style');
    splashStyle.textContent = `
        @keyframes splashEffect {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(2.5); opacity: 0; }
        }
    `;
    document.head.appendChild(splashStyle);
    
    // Add click splash effects to buttons
    document.querySelectorAll('.btn-art').forEach(btn => {
        btn.addEventListener('click', createColorSplash);
    });
    
    // Navigation active state
    function setActiveNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage || 
                (currentPage === '' && link.getAttribute('href') === 'index.html')) {
                link.classList.add('active');
            }
        });
    }
    
    // Reward calculator function
    window.calculateRewards = function() {
        const level = document.getElementById('userLevel')?.value;
        const referrals = parseInt(document.getElementById('referralCount')?.value) || 0;
        const resultDiv = document.getElementById('rewardResult');
        
        if (!level || !resultDiv) return;
        
        const rewardData = {
            'B1': { computing: 20, generations: 2, community: 0 },
            'B2': { computing: 20, generations: 4, community: 0 },
            'B3': { computing: 20, generations: 6, community: 0 },
            'B4': { computing: 20, generations: 8, community: 4 },
            'B5': { computing: 20, generations: 10, community: 1.6 },
            'B6': { computing: 20, generations: 12, community: 0.8 }
        };
        
        const reward = rewardData[level];
        const totalComputing = (reward.computing * referrals) / 100;
        
        resultDiv.innerHTML = `
            <div class="art-card bg-sage" style="transform: rotate(0deg);">
                <h4>Your Potential Rewards</h4>
                <p><strong>Computing Power:</strong> ${reward.computing}% from ${reward.generations} generations</p>
                <p><strong>Community Reward:</strong> $${reward.community} USDT equivalent</p>
                <p><strong>Estimated Computing from ${referrals} referrals:</strong> ${totalComputing.toFixed(2)}%</p>
            </div>
        `;
        
        // Add animation to result
        resultDiv.style.animation = 'bounce 0.5s ease';
        setTimeout(() => resultDiv.style.animation = '', 500);
    };
    
    // Initialize functions
    addPageLoader();
    addImageAnimations();
    setActiveNavigation();
    
    // Add floating animation to hero images
    document.querySelectorAll('.hero-section img').forEach(img => {
        img.classList.add('floating');
    });
    
    // Smooth scroll effects for cards
    window.addEventListener('scroll', function() {
        const cards = document.querySelectorAll('.art-card, .community-card, .event-card');
        const scrollTop = window.pageYOffset;
        
        cards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardHeight = card.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrollTop + windowHeight > cardTop && scrollTop < cardTop + cardHeight) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    });
    
    console.log('🐴🥕 Radish Pastoral Website Loaded! Welcome to the countryside!');
}); 