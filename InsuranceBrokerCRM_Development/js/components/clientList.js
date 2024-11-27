class ClientList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.clientManager = new ClientManager();
        this.currentView = 'grid'; // or 'list'
        this.filters = {
            status: 'all',
            category: 'all',
            search: ''
        };
    }

    initialize() {
        this.render();
        this.attachEventListeners();
        this.loadClients();
    }

    render() {
        this.container.innerHTML = `
            <div class="client-list">
                <!-- Filters -->
                <div class="filters">
                    <div class="filter-group">
                        <select id="statusFilter" class="filter-select">
                            <option value="all">All Status</option>
                            <option value="prospect">Prospects</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <div class="filter-group">
                        <select id="categoryFilter" class="filter-select">
                            <option value="all">All Categories</option>
                            <option value="individual">Individual</option>
                            <option value="business">Business</option>
                            <option value="family">Family</option>
                        </select>
                    </div>
                    <div class="search-group">
                        <input type="text" id="clientSearch" 
                               placeholder="Search clients..." 
                               class="search-input">
                    </div>
                </div>

                <!-- Client Grid/List Container -->
                <div class="client-container" id="clientContainer">
                    <!-- Clients will be dynamically added here -->
                </div>

                <!-- Delete Confirmation Modal -->
                <div class="modal" id="deleteConfirmModal">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Delete Client</h3>
                            <button class="btn-close" id="closeDeleteModal">×</button>
                        </div>
                        <div class="modal-body">
                            <p>Are you sure you want to delete this client? This action cannot be undone.</p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn-secondary" id="cancelDelete">Cancel</button>
                            <button class="btn-danger" id="confirmDelete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Filters
        this.container.querySelector('#statusFilter')?.addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.loadClients();
        });

        this.container.querySelector('#categoryFilter')?.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.loadClients();
        });

        // Search
        this.container.querySelector('#clientSearch')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.loadClients();
        });

        // Delete modal controls
        this.container.querySelector('#closeDeleteModal')?.addEventListener('click', () => {
            this.hideDeleteModal();
        });

        this.container.querySelector('#cancelDelete')?.addEventListener('click', () => {
            this.hideDeleteModal();
        });

        this.container.querySelector('#confirmDelete')?.addEventListener('click', () => {
            const modal = this.container.querySelector('#deleteConfirmModal');
            const clientId = parseInt(modal.dataset.clientId);
            if (clientId) {
                const success = this.clientManager.deleteClient(clientId);
                if (success) {
                    this.showNotification('Client deleted successfully', 'success');
                    this.loadClients(); // Refresh the list
                } else {
                    this.showNotification('Error deleting client', 'error');
                }
            }
            this.hideDeleteModal();
        });
    }

    loadClients() {
        let clients = this.clientManager.clients;

        // Apply filters
        if (this.filters.status !== 'all') {
            clients = clients.filter(client => client.status === this.filters.status);
        }

        if (this.filters.category !== 'all') {
            clients = clients.filter(client => client.category === this.filters.category);
        }

        if (this.filters.search) {
            const search = this.filters.search.toLowerCase();
            clients = clients.filter(client => 
                (client.name || '').toLowerCase().includes(search) ||
                (client.email || '').toLowerCase().includes(search) ||
                (client.phone || '').toLowerCase().includes(search)
            );
        }

        // Render clients
        const container = this.container.querySelector('#clientContainer');
        container.className = `client-container ${this.currentView}-view`;

        if (this.currentView === 'grid') {
            this.renderGridView(container, clients);
        } else {
            this.renderListView(container, clients);
        }
    }

    renderGridView(container, clients) {
        container.innerHTML = clients.map(client => `
            <div class="client-card" data-id="${client.id}">
                <div class="client-info">
                    <h3>${client.name || 'Unnamed Client'}</h3>
                    <p class="client-category">${client.category}</p>
                    <div class="status-badge ${client.status}">${client.status}</div>
                    <div class="contact-info">
                        <p><i class="fas fa-envelope"></i> ${client.email || 'N/A'}</p>
                        <p><i class="fas fa-phone"></i> ${client.phone || 'N/A'}</p>
                    </div>
                </div>
                <div class="client-metrics">
                    <div class="metric">
                        <span class="metric-value">${client.policies?.length || 0}</span>
                        <span class="metric-label">Policies</span>
                    </div>
                    <div class="metric">
                        <span class="metric-value">${client.quotes?.length || 0}</span>
                        <span class="metric-label">Quotes</span>
                    </div>
                </div>
                <div class="client-actions">
                    <button class="btn-icon" onclick="viewClient(${client.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="contactClient(${client.id})">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="btn-icon btn-danger" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderListView(container, clients) {
        container.innerHTML = `
            <table class="client-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Policies</th>
                        <th>Last Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${clients.map(client => `
                        <tr data-id="${client.id}">
                            <td>${client.name || 'Unnamed Client'}</td>
                            <td><div class="status-badge ${client.status}">${client.status}</div></td>
                            <td>${client.category}</td>
                            <td>${client.email || 'N/A'}</td>
                            <td>${client.phone || 'N/A'}</td>
                            <td>${client.policies?.length || 0}</td>
                            <td>${this.formatDate(client.lastContactDate)}</td>
                            <td class="actions">
                                <button class="btn-icon" onclick="viewClient(${client.id})">
                                    <i class="fas fa-eye"></i>
                                </button>
                                <button class="btn-icon" onclick="editClient(${client.id})">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn-icon" onclick="contactClient(${client.id})">
                                    <i class="fas fa-comment"></i>
                                </button>
                                <button class="btn-icon btn-danger" onclick="deleteClient(${client.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    formatDate(dateString) {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    }

    showDeleteModal(clientId) {
        const modal = this.container.querySelector('#deleteConfirmModal');
        if (modal) {
            modal.classList.add('active');
            modal.dataset.clientId = clientId;
        }
    }

    hideDeleteModal() {
        const modal = this.container.querySelector('#deleteConfirmModal');
        if (modal) {
            modal.classList.remove('active');
            delete modal.dataset.clientId;
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

// Export the ClientList class
window.ClientList = ClientList;

// Global functions for client actions
window.viewClient = function(clientId) {
    // Implementation will be added
    console.log('View client:', clientId);
};

window.editClient = function(clientId) {
    // Implementation will be added
    console.log('Edit client:', clientId);
};

window.contactClient = function(clientId) {
    // Implementation will be added
    console.log('Contact client:', clientId);
};

window.deleteClient = function(clientId) {
    const clientList = new ClientList('clientListView');
    clientList.showDeleteModal(clientId);
};
