import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    private requestCount = 0;
    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    private loadingTimeout: ReturnType<typeof setTimeout> | null = null;
    private readonly DELAY_MS = 300;

    public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

    show(): void {
        this.requestCount++;

        if (this.requestCount === 1 && !this.loadingTimeout) {
            this.loadingTimeout = setTimeout(() => {
                if (this.requestCount > 0) {
                    this.isLoadingSubject.next(true);
                }
                this.loadingTimeout = null;
            }, this.DELAY_MS);
        } else if (this.requestCount > 1 && this.isLoadingSubject.value) {
            return;
        }
    }

    hide(): void {
        this.requestCount--;

        if (this.requestCount <= 0) {
            this.requestCount = 0;

            if (this.loadingTimeout) {
                clearTimeout(this.loadingTimeout);
                this.loadingTimeout = null;
            }

            if (this.isLoadingSubject.value) {
                this.isLoadingSubject.next(false);
            }
        }
    }
}
