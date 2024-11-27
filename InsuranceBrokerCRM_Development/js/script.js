document.addEventListener('DOMContentLoaded', function() {
    // Task Checkbox Functionality
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

    // Refresh Button Animation
    const refreshButton = document.querySelector('.refresh-button');
    if (refreshButton) {
        refreshButton.addEventListener('click', function() {
            const icon = this.querySelector('i');
            icon.style.transition = 'transform 0.5s';
            icon.style.transform = 'rotate(360deg)';
            
            // Reset the transform after animation
            setTimeout(() => {
                icon.style.transition = 'none';
                icon.style.transform = 'rotate(0deg)';
            }, 500);
        });
    }

    // Task Filters
    const taskFilters = document.querySelectorAll('.task-filters span');
    taskFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            taskFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
        });
    });

    // Search Bar Functionality
    const searchBar = document.querySelector('.search-bar input');
    if (searchBar) {
        searchBar.addEventListener('focus', function() {
            this.parentElement.style.boxShadow = '0 0 0 2px #4299e1';
        });

        searchBar.addEventListener('blur', function() {
            this.parentElement.style.boxShadow = 'none';
        });
    }

    // Initialize current time
    updateCurrentTime();
    // Update time every minute
    setInterval(updateCurrentTime, 60000);
});

// Function to update current time in the welcome message
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

// Mock data update function (for demo purposes)
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
