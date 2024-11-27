document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    let clientList = null;
    let documentList = null;
    let calendar = null;

    // Preserve existing task checkbox functionality
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.style.opacity = '0.5';
            } else {
                taskItem.style.opacity = '1';
            }
        });
    });

    // Preserve refresh button animation
    const refreshButton = document.querySelector('.refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.style.transition = 'transform 0.5s';
            icon.style.transform = 'rotate(360deg)';
            
            setTimeout(() => {
                icon.style.transition = 'none';
                icon.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }

    // Preserve task filters
    const taskFilters = document.querySelectorAll('.task-filters span');
    taskFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            taskFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Preserve search bar functionality
    const searchBar = document.querySelector('.search-bar input');
    if (searchBar) {
        searchBar.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px #4299e1';
        });

        searchBar.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    }

    // Restore navigation functionality
    function showSection(sectionId) {
        console.log('Showing section:', sectionId);

        // Hide all sections first
        document.querySelectorAll('main > section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show the selected section
        const section = document.getElementById(sectionId);
        if (section) {
            section.classList.remove('hidden');

            // Initialize or refresh components based on section
            if (sectionId === 'calendar') {
                console.log('Initializing calendar section');
                if (!calendar) {
                    calendar = new Calendar();
                }
                calendar.initialize();
            } else if (sectionId === 'clients') {
                console.log('Initializing clients section');
                clientList = new ClientList('clientListView');
                clientList.initialize();
            } else if (sectionId === 'documents' && !documentList) {
                documentList = new DocumentList('documentListView');
                documentList.initialize();
            }
        }

        // Update active state in navigation
        document.querySelectorAll('.sidebar a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + sectionId) {
                link.classList.add('active');
            }
        });

        // Remove any existing modals
        const existingModals = document.querySelectorAll('.modal');
        existingModals.forEach(modal => modal.remove());

        // Update URL hash without triggering hashchange
        const currentHash = window.location.hash.substring(1);
        if (currentHash !== sectionId) {
            history.pushState(null, '', `#${sectionId}`);
        }
    }

    // Add click event listeners to all sidebar links
    document.querySelectorAll('.sidebar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            const sectionId = this.getAttribute('href').substring(1);
            console.log('Navigation clicked:', sectionId);
            showSection(sectionId);
        });
    });

    // Handle initial page load
    const hash = window.location.hash.substring(1);
    const initialSection = hash || 'dashboard';
    console.log('Initial section:', initialSection);
    
    // Initialize calendar if starting on calendar page
    if (initialSection === 'calendar') {
        console.log('Starting on calendar page');
        calendar = new Calendar();
        setTimeout(() => {
            calendar.initialize();
        }, 0);
    }
    
    showSection(initialSection);

    // Handle browser back/forward
    window.addEventListener('popstate', function() {
        const newHash = window.location.hash.substring(1) || 'dashboard';
        console.log('Hash changed to:', newHash);
        showSection(newHash);
    });

    // Handle calendar button in top nav
    document.querySelector('.btn-calendar')?.addEventListener('click', function() {
        console.log('Calendar button clicked');
        showSection('calendar');
    });

    // Preserve current time update functionality
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000);
});

// Preserve existing time update function
function updateCurrentTime() {
    const welcomeText = document.querySelector('.welcome-text h1');
    const hour = new Date().getHours();
    let greeting = 'Welcome back';
    
    if (hour < 12) {
        greeting = 'Good morning';
    } else if (hour < 18) {
        greeting = 'Good afternoon';
    } else {
        greeting = 'Good evening';
    }
    
    if (welcomeText) {
        welcomeText.textContent = greeting;
    }
}

// Preserve metrics update function
function updateMetrics() {
    const metrics = {
        activePolicies: Math.floor(Math.random() * 20) + 80,
        clientRetention: Math.floor(Math.random() * 10) + 90
    };

    const policyProgress = document.querySelector('.metric:first-child .progress');
    const retentionProgress = document.querySelector('.metric:last-child .progress');
    const policyPercentage = document.querySelector('.metric:first-child .percentage');
    const retentionPercentage = document.querySelector('.metric:last-child .percentage');

    if (policyProgress && policyPercentage) {
        policyProgress.style.width = metrics.activePolicies + '%';
        policyPercentage.textContent = metrics.activePolicies + '%';
    }

    if (retentionProgress && retentionPercentage) {
        retentionProgress.style.width = metrics.clientRetention + '%';
        retentionPercentage.textContent = metrics.clientRetention + '%';
    }
}
