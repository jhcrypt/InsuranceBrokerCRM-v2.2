class Calendar {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.currentDate = new Date();
        this.selectedDate = null;
        this.appointments = [];
        this.clientManager = new ClientManager();
    }

    initialize() {
        this.render();
        this.attachEventListeners();
        this.loadAppointments();
    }

    render() {
        this.container.innerHTML = `
            <div class="calendar-container">
                <!-- Calendar Header -->
                <div class="calendar-header">
                    <div class="calendar-title">
                        <h2>Calendar</h2>
                        <button class="btn-add" id="addAppointmentBtn">
                            <i class="fas fa-plus"></i> New Appointment
                        </button>
                    </div>
                    <div class="calendar-nav">
                        <button class="btn-icon" id="prevMonth">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h3 id="currentMonth"></h3>
                        <button class="btn-icon" id="nextMonth">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div class="calendar-views">
                        <button class="btn-view active" data-view="month">Month</button>
                        <button class="btn-view" data-view="week">Week</button>
                        <button class="btn-view" data-view="day">Day</button>
                    </div>
                </div>

                <!-- Calendar Grid -->
                <div class="calendar-grid">
                    <div class="calendar-weekdays">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div class="calendar-days" id="calendarDays"></div>
                </div>

                <!-- Appointments List -->
                <div class="appointments-list">
                    <h3>Upcoming Appointments</h3>
                    <div id="appointmentsList"></div>
                </div>
            </div>

            <!-- Add Appointment Modal -->
            <div class="modal" id="appointmentModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Schedule Appointment</h3>
                        <button class="btn-close" id="closeAppointmentModal">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="appointmentForm">
                            <div class="form-group">
                                <label for="appointmentClient">Client*</label>
                                <select id="appointmentClient" name="clientId" required>
                                    <option value="">Select Client</option>
                                </select>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="appointmentDate">Date*</label>
                                    <input type="date" id="appointmentDate" name="date" required>
                                </div>
                                <div class="form-group">
                                    <label for="appointmentTime">Time*</label>
                                    <input type="time" id="appointmentTime" name="time" required>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="appointmentType">Type*</label>
                                <select id="appointmentType" name="type" required>
                                    <option value="consultation">Initial Consultation</option>
                                    <option value="review">Policy Review</option>
                                    <option value="claim">Claim Discussion</option>
                                    <option value="renewal">Renewal Meeting</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="appointmentLocation">Location</label>
                                <select id="appointmentLocation" name="location">
                                    <option value="office">Office</option>
                                    <option value="virtual">Virtual Meeting</option>
                                    <option value="phone">Phone Call</option>
                                    <option value="client">Client Location</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="appointmentDuration">Duration</label>
                                <select id="appointmentDuration" name="duration">
                                    <option value="30">30 minutes</option>
                                    <option value="60">1 hour</option>
                                    <option value="90">1.5 hours</option>
                                    <option value="120">2 hours</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="appointmentNotes">Notes</label>
                                <textarea id="appointmentNotes" name="notes" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" id="cancelAppointment">Cancel</button>
                        <button class="btn-primary" id="saveAppointment">Schedule</button>
                    </div>
                </div>
            </div>
        `;

        this.updateCalendar();
        this.populateClientDropdown(); // Add this line to populate clients
    }

    // Add this method to populate client dropdown
    populateClientDropdown() {
        const clientSelect = document.getElementById('appointmentClient');
        if (!clientSelect) return;

        // Clear existing options except the first one
        while (clientSelect.options.length > 1) {
            clientSelect.remove(1);
        }

        // Get clients from ClientManager
        const clients = this.clientManager.clients || [];
        
        // Add client options
        clients.forEach(client => {
            const option = document.createElement('option');
            option.value = client.id;
            option.textContent = client.name;
            clientSelect.appendChild(option);
        });
    }

    attachEventListeners() {
        // Navigation
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.updateCalendar();
        });

        document.getElementById('nextMonth')?.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.updateCalendar();
        });

        // View toggles
        const viewButtons = document.querySelectorAll('.btn-view');
        viewButtons.forEach(button => {
            button.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                button.classList.add('active');
                this.updateCalendar(button.dataset.view);
            });
        });

        // Add appointment
        document.getElementById('addAppointmentBtn')?.addEventListener('click', () => {
            this.showAppointmentModal();
        });

        // Modal controls
        document.getElementById('closeAppointmentModal')?.addEventListener('click', () => {
            this.hideAppointmentModal();
        });

        document.getElementById('cancelAppointment')?.addEventListener('click', () => {
            this.hideAppointmentModal();
        });

        document.getElementById('saveAppointment')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveAppointment();
        });

        // Form validation
        const form = document.getElementById('appointmentForm');
        if (form) {
            form.addEventListener('input', (e) => {
                const target = e.target;
                if (target instanceof HTMLInputElement && target.required) {
                    this.validateField(target);
                }
            });
        }
    }

    validateField(field) {
        const isValid = field.checkValidity();
        field.classList.toggle('invalid', !isValid);
        
        // Show/hide error message
        let errorMessage = field.nextElementSibling;
        if (!errorMessage || !errorMessage.classList.contains('error-message')) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            field.parentNode.insertBefore(errorMessage, field.nextSibling);
        }
        errorMessage.textContent = isValid ? '' : field.validationMessage;
    }

    updateCalendar(view = 'month') {
        const monthYear = this.currentDate.toLocaleString('default', { 
            month: 'long', 
            year: 'numeric' 
        });
        document.getElementById('currentMonth').textContent = monthYear;

        if (view === 'month') {
            this.renderMonthView();
        } else if (view === 'week') {
            this.renderWeekView();
        } else {
            this.renderDayView();
        }
    }

    renderMonthView() {
        const daysContainer = document.getElementById('calendarDays');
        if (!daysContainer) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();
        
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        
        const startingDay = firstDay.getDay();
        const totalDays = lastDay.getDate();

        let html = '';
        
        // Previous month days
        for (let i = 0; i < startingDay; i++) {
            html += '<div class="calendar-day inactive"></div>';
        }

        // Current month days
        for (let day = 1; day <= totalDays; day++) {
            const date = new Date(year, month, day);
            const appointments = this.getAppointmentsForDate(date);
            const isToday = this.isToday(date);
            
            html += `
                <div class="calendar-day ${isToday ? 'today' : ''}" data-date="${date.toISOString()}">
                    <span class="day-number">${day}</span>
                    ${appointments.map(apt => `
                        <div class="appointment-dot" 
                             style="background-color: ${this.getAppointmentColor(apt.type)}"
                             title="${apt.client.name} - ${apt.type}">
                        </div>
                    `).join('')}
                </div>
            `;
        }

        daysContainer.innerHTML = html;
        this.updateAppointmentsList();
    }

    renderWeekView() {
        // Week view implementation will be added
    }

    renderDayView() {
        // Day view implementation will be added
    }

    getAppointmentsForDate(date) {
        return this.appointments.filter(apt => {
            const aptDate = new Date(apt.date);
            return aptDate.toDateString() === date.toDateString();
        });
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    getAppointmentColor(type) {
        const colors = {
            consultation: '#4299e1',
            review: '#48bb78',
            claim: '#ed8936',
            renewal: '#667eea',
            other: '#a0aec0'
        };
        return colors[type] || colors.other;
    }

    updateAppointmentsList() {
        const container = document.getElementById('appointmentsList');
        if (!container) return;

        const today = new Date();
        const upcomingAppointments = this.appointments
            .filter(apt => new Date(apt.date) >= today)
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 5);

        container.innerHTML = upcomingAppointments.map(apt => `
            <div class="appointment-item">
                <div class="appointment-time">
                    ${this.formatDate(apt.date)} ${apt.time}
                </div>
                <div class="appointment-info">
                    <h4>${apt.client.name}</h4>
                    <p>${apt.type} - ${apt.location}</p>
                </div>
                <div class="appointment-actions">
                    <button class="btn-icon" onclick="editAppointment(${apt.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="deleteAppointment(${apt.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('') || '<p class="no-appointments">No upcoming appointments</p>';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    }

    showAppointmentModal(date = null) {
        const modal = document.getElementById('appointmentModal');
        if (!modal) return;

        // Populate client dropdown
        this.populateClientDropdown();

        // Set date if provided
        if (date) {
            const dateInput = document.getElementById('appointmentDate');
            if (dateInput) {
                dateInput.value = date.toISOString().split('T')[0];
            }
        }

        modal.classList.add('active');
    }

    hideAppointmentModal() {
        const modal = document.getElementById('appointmentModal');
        if (modal) {
            modal.classList.remove('active');
            document.getElementById('appointmentForm')?.reset();
        }
    }

    saveAppointment() {
        const form = document.getElementById('appointmentForm');
        if (!form) return;

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const appointmentData = {
            id: Date.now(),
            clientId: formData.get('clientId'),
            date: formData.get('date'),
            time: formData.get('time'),
            type: formData.get('type'),
            location: formData.get('location'),
            duration: formData.get('duration'),
            notes: formData.get('notes'),
            client: this.clientManager.getClient(formData.get('clientId'))
        };

        this.appointments.push(appointmentData);
        this.hideAppointmentModal();
        this.updateCalendar();
        
        // Show success message
        this.showNotification('Appointment scheduled successfully!', 'success');
    }

    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    loadAppointments() {
        // In a real implementation, this would load from a backend
        // For now, we'll use mock data
        this.appointments = [
            {
                id: 1,
                clientId: 1,
                client: { id: 1, name: 'John Doe' },
                date: '2024-01-15',
                time: '09:30',
                type: 'consultation',
                location: 'office',
                duration: 60,
                notes: 'Initial consultation for auto insurance'
            },
            {
                id: 2,
                clientId: 2,
                client: { id: 2, name: 'Jane Smith' },
                date: '2024-01-16',
                time: '14:00',
                type: 'review',
                location: 'virtual',
                duration: 30,
                notes: 'Annual policy review'
            }
        ];

        this.updateCalendar();
    }
}

// Export the Calendar class
window.Calendar = Calendar;

// Global functions for appointment actions
window.editAppointment = function(appointmentId) {
    // Implementation will be added
    console.log('Edit appointment:', appointmentId);
};

window.deleteAppointment = function(appointmentId) {
    // Implementation will be added
    console.log('Delete appointment:', appointmentId);
};
