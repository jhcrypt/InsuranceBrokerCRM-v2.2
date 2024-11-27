class ClientManager {
    constructor() {
        this.clients = [];
        this.loadClients();
    }

    // Load clients from storage
    loadClients() {
        const savedClients = localStorage.getItem('clients');
        if (savedClients) {
            this.clients = JSON.parse(savedClients);
        }
    }

    // Save clients to storage
    saveClients() {
        localStorage.setItem('clients', JSON.stringify(this.clients));
    }

    // Add new client
    addClient(clientData) {
        const newClient = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...clientData
        };

        this.clients.push(newClient);
        this.saveClients();
        return newClient;
    }

    // Get client by ID
    getClient(id) {
        return this.clients.find(client => client.id === id);
    }

    // Update client
    updateClient(id, updates) {
        const client = this.getClient(id);
        if (client) {
            Object.assign(client, {
                ...updates,
                updatedAt: new Date().toISOString()
            });
            this.saveClients();
            return client;
        }
        return null;
    }

    // Delete client
    deleteClient(id) {
        const index = this.clients.findIndex(client => client.id === id);
        if (index !== -1) {
            this.clients.splice(index, 1);
            this.saveClients();
            return true;
        }
        return false;
    }

    // Search clients
    searchClients(query) {
        query = query.toLowerCase();
        return this.clients.filter(client => 
            client.name?.toLowerCase().includes(query) ||
            client.email?.toLowerCase().includes(query) ||
            client.phone?.toLowerCase().includes(query)
        );
    }

    // Get clients by status
    getClientsByStatus(status) {
        return this.clients.filter(client => client.status === status);
    }

    // Get clients by category
    getClientsByCategory(category) {
        return this.clients.filter(client => client.category === category);
    }
}

// Export the ClientManager class
window.ClientManager = ClientManager;
