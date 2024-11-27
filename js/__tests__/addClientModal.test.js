/**
 * @jest-environment jsdom
 */

describe('AddClientModal', () => {
    let addClientModal;
    let mockClientManager;

    // Mock client data
    const mockClientData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: {
            street: '123 Main St',
            city: 'Anytown',
            state: 'ST',
            zipCode: '12345'
        },
        category: 'individual',
        status: 'prospect',
        preferredContact: 'email',
        bestTimeToContact: 'morning',
        newsletterSubscribed: true,
        notes: 'Test client notes'
    };

    beforeEach(() => {
        // Mock ClientManager
        mockClientManager = {
            addClient: jest.fn().mockImplementation(clientData => ({
                id: Date.now(),
                ...clientData
            }))
        };

        // Mock window.ClientManager
        window.ClientManager = jest.fn().mockImplementation(() => mockClientManager);

        // Initialize AddClientModal
        addClientModal = new AddClientModal();
    });

    afterEach(() => {
        // Clean up the modal if it exists
        const modal = document.querySelector('#addClientModal');
        if (modal) {
            document.body.removeChild(modal);
        }
        jest.clearAllMocks();
    });

    describe('Initialization', () => {
        test('should create modal structure', () => {
            const modal = document.querySelector('#addClientModal');
            expect(modal).toBeTruthy();
            expect(modal.querySelector('.modal-content')).toBeTruthy();
            expect(modal.querySelector('#addClientForm')).toBeTruthy();
        });

        test('should have all required form fields', () => {
            const form = document.querySelector('#addClientForm');
            const requiredFields = form.querySelectorAll('[required]');
            
            expect(requiredFields).toBeTruthy();
            expect(requiredFields.length).toBeGreaterThan(0);
        });
    });

    describe('Modal Controls', () => {
        test('should show modal', () => {
            addClientModal.showModal();
            const modal = document.querySelector('#addClientModal');
            
            expect(modal.classList.contains('active')).toBe(true);
        });

        test('should hide modal', () => {
            addClientModal.showModal();
            addClientModal.hideModal();
            const modal = document.querySelector('#addClientModal');
            
            expect(modal.classList.contains('active')).toBe(false);
        });

        test('should close modal with close button', () => {
            addClientModal.showModal();
            const closeButton = document.querySelector('#closeAddClientModal');
            closeButton.click();
            
            const modal = document.querySelector('#addClientModal');
            expect(modal.classList.contains('active')).toBe(false);
        });

        test('should close modal with cancel button', () => {
            addClientModal.showModal();
            const cancelButton = document.querySelector('#cancelAddClient');
            cancelButton.click();
            
            const modal = document.querySelector('#addClientModal');
            expect(modal.classList.contains('active')).toBe(false);
        });
    });

    describe('Form Validation', () => {
        test('should validate required fields', () => {
            const form = document.querySelector('#addClientForm');
            const saveButton = document.querySelector('#saveClient');
            
            // Mock form validation
            form.checkValidity = jest.fn().mockReturnValue(false);
            form.reportValidity = jest.fn();
            
            saveButton.click();
            
            expect(form.checkValidity).toHaveBeenCalled();
            expect(form.reportValidity).toHaveBeenCalled();
            expect(mockClientManager.addClient).not.toHaveBeenCalled();
        });

        test('should validate individual fields', () => {
            const nameInput = document.querySelector('#clientName');
            
            // Mock validation methods
            const mockValidityState = {
                valid: false,
                valueMissing: true
            };
            
            Object.defineProperty(nameInput, 'validity', {
                get: () => mockValidityState
            });
            
            nameInput.checkValidity = jest.fn().mockReturnValue(false);
            
            // Trigger validation
            nameInput.dispatchEvent(new Event('input'));
            
            const errorMessage = nameInput.nextElementSibling;
            expect(errorMessage?.classList.contains('error-message')).toBe(true);
            expect(errorMessage?.textContent).toBeTruthy();
        });
    });

    describe('Client Creation', () => {
        test('should create new client with valid data', () => {
            addClientModal.showModal();
            
            // Fill form with mock data
            const form = document.querySelector('#addClientForm');
            Object.entries(mockClientData).forEach(([key, value]) => {
                const input = form.querySelector(`[name="${key}"]`);
                if (input) {
                    if (input.type === 'checkbox') {
                        input.checked = value;
                    } else {
                        input.value = value;
                    }
                }
            });

            // Mock form validation
            form.checkValidity = jest.fn().mockReturnValue(true);
            
            // Submit form
            const saveButton = document.querySelector('#saveClient');
            saveButton.click();
            
            expect(mockClientManager.addClient).toHaveBeenCalledWith(expect.objectContaining({
                name: mockClientData.name,
                email: mockClientData.email,
                phone: mockClientData.phone
            }));
            
            // Modal should be closed
            const modal = document.querySelector('#addClientModal');
            expect(modal.classList.contains('active')).toBe(false);
        });

        test('should show success notification after client creation', () => {
            // Mock successful client creation
            const form = document.querySelector('#addClientForm');
            form.checkValidity = jest.fn().mockReturnValue(true);
            
            const saveButton = document.querySelector('#saveClient');
            saveButton.click();
            
            const notification = document.querySelector('.notification.success');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toContain('successfully');
        });

        test('should handle client creation error', () => {
            // Mock client creation error
            mockClientManager.addClient.mockImplementationOnce(() => {
                throw new Error('Creation failed');
            });
            
            const form = document.querySelector('#addClientForm');
            form.checkValidity = jest.fn().mockReturnValue(true);
            
            const saveButton = document.querySelector('#saveClient');
            saveButton.click();
            
            const notification = document.querySelector('.notification.error');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toContain('Error');
        });
    });

    describe('Form Reset', () => {
        test('should reset form when modal is closed', () => {
            addClientModal.showModal();
            
            // Fill some form fields
            const nameInput = document.querySelector('#clientName');
            nameInput.value = 'Test Name';
            
            // Close modal
            addClientModal.hideModal();
            
            // Check if form was reset
            expect(nameInput.value).toBe('');
        });
    });

    describe('Notifications', () => {
        test('should show and auto-hide notifications', () => {
            jest.useFakeTimers();
            
            addClientModal.showNotification('Test message', 'success');
            
            const notification = document.querySelector('.notification');
            expect(notification).toBeTruthy();
            expect(notification.textContent).toBe('Test message');
            
            // Fast-forward time
            jest.advanceTimersByTime(3000);
            
            expect(document.querySelector('.notification')).toBeFalsy();
            
            jest.useRealTimers();
        });
    });
});
