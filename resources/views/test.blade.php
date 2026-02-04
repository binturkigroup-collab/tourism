<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Properties Website Header</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: #f5f5f5;
        }

        /* Header Styles */
        .header {
            background: #ffffff;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1000;
        }

        .header-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 80px;
        }

        /* Logo */
        .logo {
            display: flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            color: #1a1a2e;
        }

        .logo-icon {
            width: 45px;
            height: 45px;
            background: linear-gradient(135deg, #c9a227 0%, #e8d48b 50%, #c9a227 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .logo-icon svg {
            width: 28px;
            height: 28px;
            fill: #1a1a2e;
        }

        .logo-text {
            font-size: 24px;
            font-weight: 700;
            color: #1a1a2e;
        }

        .logo-text span {
            color: #c9a227;
        }

        /* Navigation */
        .nav {
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .nav-link {
            text-decoration: none;
            color: #4a4a4a;
            font-size: 15px;
            font-weight: 500;
            padding: 10px 16px;
            border-radius: 8px;
            transition: all 0.3s ease;
            position: relative;
        }

        .nav-link:hover {
            color: #c9a227;
            background: rgba(201, 162, 39, 0.08);
        }

        .nav-link.active {
            color: #c9a227;
            background: rgba(201, 162, 39, 0.12);
        }

        .nav-link.active::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 20px;
            height: 3px;
            background: #c9a227;
            border-radius: 2px;
        }

        /* Language Switcher */
        .lang-switcher {
            position: relative;
            margin-left: 16px;
        }

        .lang-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            background: #f8f8f8;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: #4a4a4a;
            transition: all 0.3s ease;
        }

        .lang-btn:hover {
            border-color: #c9a227;
            background: #fff;
        }

        .lang-btn svg {
            width: 18px;
            height: 18px;
            transition: transform 0.3s ease;
        }

        .lang-btn.open svg {
            transform: rotate(180deg);
        }

        .lang-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
            min-width: 160px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 100;
            overflow: hidden;
        }

        .lang-dropdown.open {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .lang-option {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            cursor: pointer;
            transition: background 0.2s ease;
            font-size: 14px;
            color: #4a4a4a;
        }

        .lang-option:hover {
            background: rgba(201, 162, 39, 0.1);
        }

        .lang-option.selected {
            background: rgba(201, 162, 39, 0.15);
            color: #c9a227;
            font-weight: 500;
        }

        .lang-flag {
            width: 24px;
            height: 16px;
            border-radius: 2px;
            object-fit: cover;
        }

        /* Mobile Menu Button */
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            gap: 5px;
            padding: 10px;
            background: transparent;
            border: none;
            cursor: pointer;
        }

        .mobile-menu-btn span {
            width: 24px;
            height: 2px;
            background: #1a1a2e;
            border-radius: 2px;
            transition: all 0.3s ease;
        }

        .mobile-menu-btn.open span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }

        .mobile-menu-btn.open span:nth-child(2) {
            opacity: 0;
        }

        .mobile-menu-btn.open span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }

        /* Mobile Navigation */
        .mobile-nav {
            display: none;
            position: fixed;
            top: 80px;
            left: 0;
            right: 0;
            background: #ffffff;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            padding: 20px;
            transform: translateY(-100%);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 999;
        }

        .mobile-nav.open {
            transform: translateY(0);
            opacity: 1;
        }

        .mobile-nav .nav-link {
            display: block;
            padding: 14px 16px;
            border-bottom: 1px solid #f0f0f0;
        }

        .mobile-nav .nav-link:last-of-type {
            border-bottom: none;
        }

        .mobile-nav .lang-switcher {
            margin: 16px 0 0 0;
            padding-top: 16px;
            border-top: 1px solid #e0e0e0;
        }

        .mobile-nav .lang-btn {
            width: 100%;
            justify-content: center;
        }

        /* CTA Button */
        .cta-btn {
            background: linear-gradient(135deg, #c9a227 0%, #dbb932 100%);
            color: #1a1a2e;
            padding: 12px 24px;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            margin-left: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(201, 162, 39, 0.3);
        }

        .cta-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(201, 162, 39, 0.4);
        }

        /* Responsive Styles */
        @media (max-width: 1200px) {
            .nav-link {
                padding: 10px 12px;
                font-size: 14px;
            }
        }

        @media (max-width: 1024px) {
            .nav,
            .cta-btn {
                display: none;
            }

            .mobile-menu-btn {
                display: flex;
            }

            .mobile-nav {
                display: block;
            }

            .mobile-nav .cta-btn {
                display: block;
                text-align: center;
                margin: 16px 0 0 0;
            }
        }

        @media (max-width: 480px) {
            .header-container {
                padding: 0 16px;
                height: 70px;
            }

            .logo-text {
                font-size: 20px;
            }

            .logo-icon {
                width: 38px;
                height: 38px;
            }

            .mobile-nav {
                top: 70px;
            }
        }

        /* Demo content below header */
        .demo-content {
            margin-top: 120px;
            padding: 40px;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
<!-- Header Component -->
<header class="header">
    <div class="header-container">
        <!-- Logo -->
        <a href="/" class="logo">
            <div class="logo-icon">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 3L2 12h3v9h6v-6h2v6h6v-9h3L12 3z"/>
                </svg>
            </div>
            <span class="logo-text">Prestige<span>Palace</span></span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="nav">
            <a href="/" class="nav-link active">Home</a>
            <a href="/about" class="nav-link">About Us</a>
            <a href="/properties" class="nav-link">Properties</a>
            <a href="/projects" class="nav-link">Projects</a>
            <a href="/developers" class="nav-link">Developers</a>
            <a href="/communities" class="nav-link">Communities</a>
            <a href="/contact" class="nav-link">Contact Us</a>

            <!-- Language Switcher -->
            <div class="lang-switcher">
                <button class="lang-btn" id="langBtn">
                    <span id="currentLang">EN</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </button>
                <div class="lang-dropdown" id="langDropdown">
                    <div class="lang-option selected" data-lang="en">
                        <img src="https://flagcdn.com/w40/gb.png" alt="English" class="lang-flag">
                        <span>English</span>
                    </div>
                    <div class="lang-option" data-lang="ar">
                        <img src="https://flagcdn.com/w40/ae.png" alt="Arabic" class="lang-flag">
                        <span>العربية</span>
                    </div>
                    <div class="lang-option" data-lang="ku">
                        <img src="https://flagcdn.com/w40/iq.png" alt="Kurdish" class="lang-flag">
                        <span>کوردی</span>
                    </div>
                </div>
            </div>
        </nav>

        <!-- CTA Button (Desktop) -->
        <a href="/contact" class="cta-btn">Get Started</a>

        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn" id="mobileMenuBtn">
            <span></span>
            <span></span>
            <span></span>
        </button>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" id="mobileNav">
        <a href="/" class="nav-link active">Home</a>
        <a href="/about" class="nav-link">About Us</a>
        <a href="/properties" class="nav-link">Properties</a>
        <a href="/projects" class="nav-link">Projects</a>
        <a href="/developers" class="nav-link">Developers</a>
        <a href="/communities" class="nav-link">Communities</a>
        <a href="/contact" class="nav-link">Contact Us</a>

        <!-- Mobile Language Switcher -->
        <div class="lang-switcher">
            <button class="lang-btn" id="mobileLangBtn">
                <span id="mobileLangText">EN - English</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M6 9l6 6 6-6"/>
                </svg>
            </button>
            <div class="lang-dropdown" id="mobileLangDropdown">
                <div class="lang-option selected" data-lang="en">
                    <img src="https://flagcdn.com/w40/gb.png" alt="English" class="lang-flag">
                    <span>English</span>
                </div>
                <div class="lang-option" data-lang="ar">
                    <img src="https://flagcdn.com/w40/ae.png" alt="Arabic" class="lang-flag">
                    <span>العربية</span>
                </div>
                <div class="lang-option" data-lang="ku">
                    <img src="https://flagcdn.com/w40/iq.png" alt="Kurdish" class="lang-flag">
                    <span>کوردی</span>
                </div>
            </div>
        </div>

        <!-- Mobile CTA -->
        <a href="/contact" class="cta-btn">Get Started</a>
    </nav>
</header>

<!-- Demo Content -->
<div class="demo-content">
    <h1>Header Component for Laravel Blade</h1>
    <p>Resize window to see responsive behavior</p>
</div>

<script>
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileNav.classList.toggle('open');
    });

    // Language Switcher - Desktop
    const langBtn = document.getElementById('langBtn');
    const langDropdown = document.getElementById('langDropdown');
    const currentLang = document.getElementById('currentLang');

    langBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('open');
        langDropdown.classList.toggle('open');
    });

    // Language Switcher - Mobile
    const mobileLangBtn = document.getElementById('mobileLangBtn');
    const mobileLangDropdown = document.getElementById('mobileLangDropdown');
    const mobileLangText = document.getElementById('mobileLangText');

    mobileLangBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('open');
        mobileLangDropdown.classList.toggle('open');
    });

    // Language Selection
    const langOptions = document.querySelectorAll('.lang-option');
    const langLabels = {
        'en': 'EN',
        'ar': 'AR',
        'ku': 'KU'
    };
    const langFullLabels = {
        'en': 'EN - English',
        'ar': 'AR - العربية',
        'ku': 'KU - کوردی'
    };

    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const lang = this.dataset.lang;

            // Update all options
            langOptions.forEach(opt => opt.classList.remove('selected'));
            document.querySelectorAll(`[data-lang="${lang}"]`).forEach(opt => {
                opt.classList.add('selected');
            });

            // Update button text
            currentLang.textContent = langLabels[lang];
            mobileLangText.textContent = langFullLabels[lang];

            // Close dropdowns
            langBtn.classList.remove('open');
            langDropdown.classList.remove('open');
            mobileLangBtn.classList.remove('open');
            mobileLangDropdown.classList.remove('open');

            // Here you would typically redirect or update page content
            // window.location.href = '/' + lang + window.location.pathname;
            console.log('Language changed to:', lang);
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function() {
        langBtn.classList.remove('open');
        langDropdown.classList.remove('open');
        mobileLangBtn.classList.remove('open');
        mobileLangDropdown.classList.remove('open');
    });

    // Close mobile menu when clicking nav links
    const mobileNavLinks = mobileNav.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('open');
            mobileNav.classList.remove('open');
        });
    });

    // Scroll behavior - add shadow on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.12)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.08)';
        }
    });
</script>
</body>
</html>
