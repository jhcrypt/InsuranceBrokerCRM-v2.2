class AiderHandler {
    private aiderProcess: ChildProcess;
    private commandQueue: Queue<AiderCommand>;

    async executeWorkflow(request: UserRequest): Promise<void> {
        try {
            // 1. Initialize Aider if needed
            await this.ensureAiderRunning();

            // 2. Process files needed for the request
            const files = await this.determineRequiredFiles(request);
            await this.addFilesToAider(files);

            // 3. Send code change request
            await this.sendCodeRequest(request);

            // 4. Monitor and sync changes
            await this.monitorChanges();

            // 5. Commit changes through Neo's git management
            await this.synchronizeGitChanges();
        } catch (error) {
            await this.handleError(error);
        }
    }

    private async ensureAiderRunning(): Promise<void> {
        if (!this.aiderProcess || !this.isProcessActive()) {
            this.aiderProcess = await this.startAiderProcess();
            await this.initializeAiderSession();
        }
    }

    private async addFilesToAider(files: string[]): Promise<void> {
        for (const file of files) {
            await this.executeAiderCommand('/add', [file]);
        }
    }

    private async monitorChanges(): Promise<void> {
        return new Promise((resolve, reject) => {
            const watcher = new FileWatcher();
            watcher.on('change', this.handleFileChange.bind(this));
            watcher.on('complete', resolve);
            watcher.on('error', reject);
        });
    }
}