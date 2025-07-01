// Mobile menu toggle
        const hamburger = document.getElementById('hamburger');
        const navMobile = document.getElementById('navMobile');
        const overlay = document.getElementById('overlay');

        function toggleMobileMenu() {
            hamburger.classList.toggle('active');
            navMobile.classList.toggle('active');
            overlay.classList.toggle('active');
            
            // Prevent scrolling when menu is open
            document.body.style.overflow = navMobile.classList.contains('active') ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMobileMenu);
        overlay.addEventListener('click', toggleMobileMenu);

        // Mobile dropdown toggle
        function toggleMobileDropdown(id) {
            const dropdown = document.getElementById(id);
            const arrow = dropdown.previousElementSibling.querySelector('.dropdown-arrow');
            
            dropdown.classList.toggle('active');
            arrow.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
        }

        // Close mobile menu when clicking on links
        document.querySelectorAll('.nav-mobile a').forEach(link => {
            link.addEventListener('click', () => {
                if (!link.closest('.mobile-dropdown-content')) {
                    toggleMobileMenu();
                }
            });
        });

        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Close mobile menu on resize to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMobile.classList.remove('active');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Add scroll effect to header
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });