import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class RoutingService {
    constructor(private router: Router) {}

    changeViewToDashboard(): void {
        this.router.navigateByUrl('');
    }

    changeViewToGameConfig(): void {
        this.router.navigateByUrl('/config');
    }

    changeViewToGame(): void {
        this.router.navigateByUrl('/game');
    }
}
