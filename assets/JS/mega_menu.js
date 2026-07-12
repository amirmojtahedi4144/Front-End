document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate toggle button
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Handle mega menu on mobile
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const megaMenu = item.querySelector('.mega-menu');
        const navLink = item.querySelector('.nav-link');
        
        if (megaMenu && navLink) {
            navLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other mega menus
                    const allMegaMenus = document.querySelectorAll('.mega-menu');
                    allMegaMenus.forEach(menu => {
                        if (menu !== megaMenu) {
                            menu.classList.remove('active');
                        }
                    });
                    
                    // Toggle current mega menu
                    megaMenu.classList.toggle('active');
                    
                    // Rotate arrow icon
                    const arrow = this.querySelector('.fa-chevron-down');
                    if (arrow) {
                        arrow.style.transform = megaMenu.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0deg)';
                    }
                }
            });
        }
    });
    
    // Add hover effect to mega menu items (desktop only)
    const megaMenuItems = document.querySelectorAll('.mega-menu-section ul li a');
    
    megaMenuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateX(5px)';
                this.style.paddingLeft = '1rem';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'none';
                this.style.paddingLeft = '0.5rem';
            }
        });
    });
    
    // Add hover effect to feature items in mega menu (desktop only)
    const featureItems = document.querySelectorAll('.feature-item');
    featureItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(-5px) scale(1.05)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
            
            // Reset mega menu display and arrow rotation
            const allMegaMenus = document.querySelectorAll('.mega-menu');
            const allArrows = document.querySelectorAll('.fa-chevron-down');
            
            allMegaMenus.forEach(menu => {
                menu.classList.remove('active');
                menu.style.display = '';
            });
            
            allArrows.forEach(arrow => {
                arrow.style.transform = 'rotate(0deg)';
            });
        }
    });
});
