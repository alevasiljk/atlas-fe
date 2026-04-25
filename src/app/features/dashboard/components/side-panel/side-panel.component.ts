import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { DashboardFacade } from '../../services/dashboard.facade';
import { DashboardState } from '../../state/dashboard.state';
import { GroupDetailsTicketDto } from '../../../../core/dto/group-details.dto';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatExpansionModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
})
export class SidePanelComponent implements OnDestroy {
  // ─────────────────────────────────────────────
  // Legacy template-bound properties (DO NOT RENAME)
  // ─────────────────────────────────────────────

  ticket: GroupDetailsTicketDto | null = null;
  groupTickets: GroupDetailsTicketDto[] = [];
  otherGroupTickets: GroupDetailsTicketDto[] = [];

  loading = false;
  error: string | null = null;
  noGroup = false;

  // Analysis (placeholder only – no API yet)
  analysisText: string | null = null;
  copied = false;
  feedback: 'up' | 'down' | null = null;

  private subscription = new Subscription();

  constructor(private readonly facade: DashboardFacade) {
    this.subscription.add(
      this.facade.state$.subscribe((state: DashboardState) => {
        this.mapStateToLegacyBindings(state);
      }),
    );
  }

  // ─────────────────────────────────────────────
  // UI → Facade actions
  // ─────────────────────────────────────────────

  onClose(): void {
    this.facade.closeSidePanel();
  }

  // Legacy handlers (present but disabled behavior-wise)

  generateAnalysis(): void {
    // intentionally left blank
    // backend API not implemented yet
  }

  copyGroupAnalysis(): void {
    // placeholder UI behavior only
    if (this.analysisText) {
      navigator.clipboard.writeText(this.analysisText);
      this.copied = true;
    }
  }

  onFeedback(value: 'up' | 'down'): void {
    // placeholder UI state only
    this.feedback = value;
  }

  // ─────────────────────────────────────────────
  // Internal mapping (UI adapter only)
  // ─────────────────────────────────────────────

  private mapStateToLegacyBindings(state: DashboardState): void {
    this.loading = state.loading;
    this.error = null; // backend errors are not modeled here yet

    if (!state.selectedGroup) {
      this.noGroup = true;
      this.ticket = null;
      this.groupTickets = [];
      this.otherGroupTickets = [];
      return;
    }

    this.noGroup = false;

    const tickets = state.selectedGroup.tickets ?? [];

    // Backend guarantees:
    // - clicked ticket is FIRST
    this.ticket = tickets[0] ?? null;
    this.groupTickets = tickets;
    this.otherGroupTickets = tickets.slice(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
