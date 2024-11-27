class ClientList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.clientManager = new ClientManager();
        this.currentView = 'grid'; // or 'table'
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
                <!-- Filters and View Toggle -->
                <div class="list-header">
                    <div class="list-filters">
                        <div class="filter-group">
                            <select id="statusFilter" class="filter-select">
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="prospect">Prospect</option>
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
                            <input type="text" id="clientSearch" placeholder="Search clients..." class="search-input">
                        </div>
                    </div>
                    <div class="list-actions">
                        <button class="btn-view-toggle" id="viewToggle">
                            <i class="fas fa-th-large"></i>
                        </button>
                        <button class="btn-primary" id="addClientBtn">
                            <i class="fas fa-plus"></i> Add Client
                        </button>
                    </div>
                </div>

                <!-- Client Grid/Table View -->
                <div class="client-grid" id="clientGrid">
                    <!-- Clients will be dynamically added here -->
                </div>

                <!-- Pagination -->
                <div class="list-pagination">
                    <span class="pagination-info">
                        Showing <span id="startCount">0</span> - <span id="endCount">0</span> of <span id="totalCount">0</span>
                    </span>
                    <div class="pagination-controls">
                        <button class="btn-page" id="prevPage" disabled>
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <button class="btn-page" id="nextPage" disabled>
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        // Status filter
        document.getElementById('statusFilter')?.addEventListener('change', (e) => {
            this.filters.status = e.target.value;
            this.loadClients();
        });

        // Category filter
        document.getElementById('categoryFilter')?.addEventListener('change', (e) => {
            this.filters.category = e.target.value;
            this.loadClients();
        });

        // Search input
        document.getElementById('clientSearch')?.addEventListener('input', (e) => {
            this.filters.search = e.target.value;
            this.loadClients();
        });

        // View toggle
        document.getElementById('viewToggle')?.addEventListener('click', () => {
            this.currentView = this.currentView === 'grid' ? 'table' : 'grid';
            this.loadClients();
        });

        // Add client button
        document.getElementById('addClientBtn')?.addEventListener('click', () => {
            this.showAddClientModal();
        });

        // Pagination
        document.getElementById('prevPage')?.addEventListener('click', () => {
            this.previousPage();
        });

        document.getElementById('nextPage')?.addEventListener('click', () => {
            this.nextPage();
        });
    }

    loadClients() {
        const clients = this.filterClients();
        this.renderClients(clients);
        this.updatePagination(clients.length);
    }

    filterClients() {
        return this.clientManager.clients.filter(client => {
            const matchesStatus = this.filters.status === 'all' || client.status === this.filters.status;
            const matchesCategory = this.filters.category === 'all' || client.category === this.filters.category;
            const matchesSearch = !this.filters.search || 
                client.name.toLowerCase().includes(this.filters.search.toLowerCase()) ||
                client.email.toLowerCase().includes(this.filters.search.toLowerCase());

            return matchesStatus && matchesCategory && matchesSearch;
        });
    }

    renderClients(clients) {
        const grid = document.getElementById('clientGrid');
        if (!grid) return;

        if (this.currentView === 'grid') {
            this.renderGridView(grid, clients);
        } else {
            this.renderTableView(grid, clients);
        }
    }

    renderGridView(container, clients) {
        container.className = 'client-grid';
        container.innerHTML = clients.map(client => `
            <div class="client-card" data-client-id="${client.id}">
                <div class="client-card-header">
                    <div class="client-info">
                        <h3>${client.name}</h3>
                        <span class="client-category">${client.category}</span>
                    </div>
                    <div class="client-status">
                        <span class="status-badge ${client.status}">${client.status}</span>
                    </div>
                </div>
                <div class="client-card-content">
                    <div class="client-contact">
                        <p><i class="fas fa-envelope"></i> ${client.email}</p>
                        <p><i class="fas fa-phone"></i> ${client.phone}</p>
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
                </div>
                <div class="client-card-footer">
                    <button class="btn-icon" onclick="viewClient(${client.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="btn-icon" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon" onclick="contactClient(${client.id})">
                        <i class="fas fa-comment"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    renderTableView(container, clients) {
        container.className = 'client-table';
        container.innerHTML = `
            <table>
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
                        <tr data-client-id="${client.id}">
                            <td>${client.name}</td>
                            <td><span class="status-badge ${client.status}">${client.status}</span></td>
                            <td>${client.category}</td>
                            <td>${client.email}</td>
                            <td>${client.phone}</td>
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
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    updatePagination(totalClients) {
        const startCount = document.getElementById('startCount');
        const endCount = document.getElementById('endCount');
        const totalCount = document.getElementById('totalCount');
        const prevButton = document.getElementById('prevPage');
        const nextButton = document.getElementById('nextPage');

        if (startCount) startCount.textContent = totalClients > 0 ? '1' : '0';
        if (endCount) endCount.textContent = totalClients.toString();
        if (totalCount) totalCount.textContent = totalClients.toString();
        if (prevButton) prevButton.disabled = true; // For now, no pagination
        if (nextButton) nextButton.disabled = true; // For now, no pagination
    }

    formatDate(dateString) {
        if (!dateString) return 'Never';
        return new Date(dateString).toLocaleDateString();
    }

    showAddClientModal() {
        // Implementation will be added later
        console.log('Show add client modal');
    }

    previousPage() {
        // Implementation will be added later
        console.log('Previous page');
    }

    nextPage() {
        // Implementation will be added later
        console.log('Next page');
    }
}

// Export the ClientList class
window.ClientList = ClientList;
