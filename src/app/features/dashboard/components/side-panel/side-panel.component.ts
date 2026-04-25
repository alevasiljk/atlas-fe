import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { DashboardFacade } from '../../services/dashboard.facade';
import { DashboardState } from '../../state/dashboard.state';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
})
export class SidePanelComponent {
  readonly state$: Observable<DashboardState>;

  expandedTicketId: string | null = null;

  constructor(private readonly facade: DashboardFacade) {
    this.state$ = this.facade.state$;
  }

  close(): void {
    this.facade.closeSidePanel();
    this.expandedTicketId = null;
  }

  toggle(ticketId: string): void {
    this.expandedTicketId = this.expandedTicketId === ticketId ? null : ticketId;
  }

  isExpanded(ticketId: string): boolean {
    return this.expandedTicketId === ticketId;
  }

  trackByTicketId(_: number, ticket: any): string {
    return ticket.id;
  }
}
