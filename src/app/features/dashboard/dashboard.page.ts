import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DashboardFacade } from './services/dashboard.facade';
import { DashboardState } from './state/dashboard.state';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <p *ngIf="state$ | async as state">
        Loading: {{ state.loading }}
      </p>

      <p *ngIf="state$ | async as state">
        Tickets count: {{ state.tickets.length }}
      </p>
    </div>
  `,
})
export class DashboardPage {
  readonly state$: Observable<DashboardState>;

  constructor(private readonly facade: DashboardFacade) {
    this.state$ = this.facade.state$;
  }
}