import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private pendingRequests = signal(0);

    readonly isLoading = signal(false);

    show(): void {
        this.pendingRequests.update(count => count + 1);
        this.isLoading.set(true);
    }

    hide(): void {
        this.pendingRequests.update(count => Math.max(0, count - 1));

        if (this.pendingRequests() === 0) {
            this.isLoading.set(false);
        }
    }
}
