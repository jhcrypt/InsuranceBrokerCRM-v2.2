class AddClientModal {
    constructor() {
        this.clientManager = new ClientManager();
        this.createModal();
    }

    createModal() {
        const modalHtml = `
            <div class="modal" id="addClientModal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add New Client</h3>
                        <button class="btn-close" id="closeAddClientModal">×</button>
                    </div>
                    <div class="modal-body">
                        <form id="addClientForm">
                            <!-- Basic Information -->
                            <div class="form-section">
                                <h4>Basic Information</h4>
                                <div class="form-group">
                                    <label for="clientName">Full Name</label>
                                    <input type="text" id="clientName" name="name">
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="clientEmail">Email</label>
                                        <input type="email" id="clientEmail" name="email">
                                    </div>
                                    <div class="form-group">
                                        <label for="clientPhone">Phone</label>
                                        <input type="tel" id="clientPhone" name="phone">
                                    </div>
                                </div>
                            </div>

                            <!-- Address -->
                            <div class="form-section">
                                <h4>Address</h4>
                                <div class="form-group">
                                    <label for="clientAddress">Street Address</label>
                                    <input type="text" id="clientAddress" name="address">
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="clientCity">City</label>
                                        <input type="text" id="clientCity" name="city">
                                    </div>
                                    <div class="form-group">
                                        <label for="clientState">State</label>
                                        <input type="text" id="clientState" name="state">
                                    </div>
                                    <div class="form-group">
                                        <label for="clientZip">ZIP Code</label>
                                        <input type="text" id="clientZip" name="zipCode">
                                    </div>
                                </div>
                            </div>

                            <!-- Client Details -->
                            <div class="form-section">
                                <h4>Client Details</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="clientType">Client Type</label>
                                        <select id="clientType" name="category">
                                            <option value="individual">Individual</option>
                                            <option value="business">Business</option>
                                            <option value="family">Family</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="clientStatus">Status</label>
                                        <select id="clientStatus" name="status">
                                            <option value="prospect">Prospect</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <!-- Communication Preferences -->
                            <div class="form-section">
                                <h4>Communication Preferences</h4>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="preferredContact">Preferred Contact Method</label>
                                        <select id="preferredContact" name="preferredContact">
                                            <option value="email">Email</option>
                                            <option value="phone">Phone</option>
                                            <option value="text">Text</option>
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label for="bestTime">Best Time to Contact</label>
                                        <select id="bestTime" name="bestTimeToContact">
                                            <option value="morning">Morning</option>
                                            <option value="afternoon">Afternoon</option>
                                            <option value="evening">Evening</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group checkbox-group">
                                    <input type="checkbox" id="newsletterSubscribed" name="newsletterSubscribed">
                                    <label for="newsletterSubscribed">Subscribe to Newsletter</label>
                                </div>
                            </div>

                            <!-- Notes -->
                            <div class="form-section">
                                <h4>Additional Notes</h4>
                                <div class="form-group">
                                    <textarea id="clientNotes" name="notes" rows="3" 
                                              placeholder="Enter any additional notes about the client..."></textarea>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button class="btn-secondary" id="cancelAddClient">Cancel</button>
                        <button class="btn-primary" id="saveClient">Add Client</button>
                    </div>
                </div>
            </div>
        `;

        // Add modal to document
        const modalContainer = document.createElement('div');
        modalContainer.innerHTML = modalHtml;
        document.body.appendChild(modalContainer.firstElementChild);

        this.attachEventListeners();
    }

    attachEventListeners() {
        // Close modal
        document.getElementById('closeAddClientModal')?.addEventListener('click', () => {
            this.hideModal();
        });

        // Cancel button
        document.getElementById('cancelAddClient')?.addEventListener('click', () => {
            this.hideModal();
        });

        // Save client
        document.getElementById('saveClient')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.saveClient();
        });
    }

    showModal() {
        const modal = document.getElementById('addClientModal');
        if (modal) {
            modal.classList.add('active');
        }
    }

    hideModal() {
        const modal = document.getElementById('addClientModal');
        if (modal) {
            modal.classList.remove('active');
            document.getElementById('addClientForm')?.reset();
        }
    }

    saveClient() {
        const form = document.getElementById('addClientForm');
        if (!form) return;

        const formData = new FormData(form);
        const clientData = {
            name: formData.get('name') || 'Unnamed Client',
            email: formData.get('email') || '',
            phone: formData.get('phone') || '',
            address: {
                street: formData.get('address') || '',
                city: formData.get('city') || '',
                state: formData.get('state') || '',
                zipCode: formData.get('zipCode') || ''
            },
            category: formData.get('category') || 'individual',
            status: formData.get('status') || 'prospect',
            preferredContact: formData.get('preferredContact') || 'email',
            bestTimeToContact: formData.get('bestTimeToContact') || 'morning',
            newsletterSubscribed: formData.get('newsletterSubscribed') === 'on',
            notes: formData.get('notes') || ''
        };

        try {
            const newClient = this.clientManager.addClient(clientData);
            this.hideModal();
            
            // Refresh client list if it exists
            const clientList = new ClientList('clientListView');
            clientList.loadClients();

            // Show success message
            this.showNotification('Client added successfully!', 'success');
        } catch (error) {
            console.error('Error adding client:', error);
            this.showNotification('Error adding client. Please try again.', 'error');
        }
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
}

// Export the AddClientModal class
window.AddClientModal = AddClientModal;
