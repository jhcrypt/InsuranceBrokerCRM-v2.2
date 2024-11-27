/**
 * @jest-environment jsdom
 */

describe('Calendar', () => {
    let calendar;
    let container;
    let mockClientManager;

    // Mock appointment data
    const mockAppointments = [
        {
            id: 1,
            clientId: 1,
            client: { id: 1, name: 'John Doe' },
            date: '2024-01-15',
            time: '09:30',
            type: 'consultation',
            location: 'office',
            duration: 60,
            notes: 'Initial consultation'
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
            notes: 'Policy review'
        }
    ];

    beforeEach(() => {
        // Create container element
        container = document.createElement('div');
        container.id = 'calendarView';
        document.body.appendChild(container);

        // Mock ClientManager
        mockClientManager = {
            clients: [
                { id: 1, name: 'John Doe' },
                { id: 2, name: 'Jane Smith' }
            ],
            getClient: jest.fn().mockImplementation(id => 
                mockClientManager.clients.find(c => c.id === id)
            )
        };

        // Mock window.ClientManager
        window.ClientManager = jest.fn().mockImplementation(() => mockClientManager);

        // Initialize Calendar
        calendar = new Calendar('calendarView');
        calendar.appointments = [...mockAppointments];
        calendar.initialize();
    });

    afterEach(() => {
        document.body.removeChild(container);
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        test('should render calendar container', () => {
            expect(container.querySelector('.calendar-container')).toBeTruthy();
            expect(container.querySelector('.calendar-header')).toBeTruthy();
            expect(container.querySelector('.calendar-grid')).toBeTruthy();
            expect(container.querySelector('.appointments-list')).toBeTruthy();
        });

        test('should display current month and year', () => {
            const monthYear = container.querySelector('#currentMonth');
            const currentDate = new Date();
            const expected = currentDate.toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            });
            
            expect(monthYear.textContent).toBe(expected);
        });

        test('should load initial appointments', () => {
            const appointmentsList = container.querySelector('#appointmentsList');
            const appointments = appointmentsList.querySelectorAll('.appointment-item');
            
            expect(appointments.length).toBe(mockAppointments.length);
        });
    });

    describe('Calendar Navigation', () => {
        test('should navigate to previous month', () => {
            const prevButton = container.querySelector('#prevMonth');
            const monthDisplay = container.querySelector('#currentMonth');
            const initialMonth = monthDisplay.textContent;
            
            prevButton.click();
            
            expect(monthDisplay.textContent).not.toBe(initialMonth);
        });

        test('should navigate to next month', () => {
            const nextButton = container.querySelector('#nextMonth');
            const monthDisplay = container.querySelector('#currentMonth');
            const initialMonth = monthDisplay.textContent;
            
            nextButton.click();
            
            expect(monthDisplay.textContent).not.toBe(initialMonth);
        });
    });

    describe('View Switching', () => {
        test('should switch between views', () => {
            const viewButtons = container.querySelectorAll('.btn-view');
            
            viewButtons.forEach(button => {
                button.click();
                expect(button.classList.contains('active')).toBe(true);
                viewButtons.forEach(otherButton => {
                    if (otherButton !== button) {
                        expect(otherButton.classList.contains('active')).toBe(false);
                    }
                });
            });
        });
    });

    describe('Appointment Management', () => {
        test('should show appointment modal', () => {
            const addButton = container.querySelector('#addAppointmentBtn');
            addButton.click();

            const modal = document.querySelector('#appointmentModal');
            expect(modal.classList.contains('active')).toBe(true);
        });

        test('should populate client dropdown in modal', () => {
            calendar.showAppointmentModal();
            
            const clientSelect = document.querySelector('#appointmentClient');
            const options = clientSelect.querySelectorAll('option');
            
            expect(options.length).toBe(mockClientManager.clients.length + 1); // +1 for default option
            expect(options[1].textContent).toBe('John Doe');
            expect(options[2].textContent).toBe('Jane Smith');
        });

        test('should validate required fields', () => {
            calendar.showAppointmentModal();
            
            const saveButton = document.querySelector('#saveAppointment');
            const form = document.querySelector('#appointmentForm');
            
            // Mock form validation
            form.checkValidity = jest.fn().mockReturnValue(false);
            form.reportValidity = jest.fn();
            
            saveButton.click();
            
            expect(form.checkValidity).toHaveBeenCalled();
            expect(form.reportValidity).toHaveBeenCalled();
        });

        test('should save valid appointment', () => {
            calendar.showAppointmentModal();
            
            // Fill form
            const form = document.querySelector('#appointmentForm');
            form.querySelector('#appointmentClient').value = '1';
            form.querySelector('#appointmentDate').value = '2024-01-20';
            form.querySelector('#appointmentTime').value = '10:00';
            form.querySelector('#appointmentType').value = 'consultation';
            
            // Mock form validation
            form.checkValidity = jest.fn().mockReturnValue(true);
            
            const saveButton = document.querySelector('#saveAppointment');
            saveButton.click();
            
            expect(calendar.appointments.length).toBe(mockAppointments.length + 1);
            expect(document.querySelector('#appointmentModal').classList.contains('active')).toBe(false);
        });
    });

    describe('Calendar Display', () => {
        test('should mark today\'s date', () => {
            const today = container.querySelector('.calendar-day.today');
            expect(today).toBeTruthy();
        });

        test('should display appointment indicators', () => {
            const appointmentDots = container.querySelectorAll('.appointment-dot');
            expect(appointmentDots.length).toBeGreaterThan(0);
        });

        test('should update appointments list', () => {
            const appointmentsList = container.querySelector('#appointmentsList');
            const appointments = appointmentsList.querySelectorAll('.appointment-item');
            
            expect(appointments.length).toBe(mockAppointments.length);
            expect(appointments[0].textContent).toContain('John Doe');
            expect(appointments[1].textContent).toContain('Jane Smith');
        });
    });

    describe('Date Formatting', () => {
        test('should format dates correctly', () => {
            const formattedDate = calendar.formatDate('2024-01-15');
            expect(formattedDate).toMatch(/Jan 15/);
        });
    });

    describe('Appointment Actions', () => {
        test('should handle edit appointment', () => {
            const editButton = container.querySelector('button[onclick^="editAppointment"]');
            
            // Mock global editAppointment function
            window.editAppointment = jest.fn();
            editButton.click();
            
            expect(window.editAppointment).toHaveBeenCalled();
        });

        test('should handle delete appointment', () => {
            const deleteButton = container.querySelector('button[onclick^="deleteAppointment"]');
            
            // Mock global deleteAppointment function
            window.deleteAppointment = jest.fn();
            deleteButton.click();
            
            expect(window.deleteAppointment).toHaveBeenCalled();
        });
    });

    describe('Responsive Design', () => {
        test('should adjust layout for mobile view', () => {
            // Mock mobile viewport
            global.innerWidth = 375;
            global.dispatchEvent(new Event('resize'));

            const calendarTitle = container.querySelector('.calendar-title');
            const computedStyle = window.getComputedStyle(calendarTitle);
            
            expect(computedStyle.flexDirection).toBe('column');
        });
    });
});
