import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { DashboardFacade } from '../../services/dashboard.facade';
import { PriorityDto } from '../../../../core/dto/priority.dto';
import { GroupDropdownDto } from '../../../../core/dto/group-dropdown.dto';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatToolbarModule],
})
export class ToolbarComponent {
  status: 'ALL' | 'RESOLVED' | 'UNRESOLVED' = 'ALL';
  priority = '';
  searchText = '';

  groupsExpanded = false;
  selectedGroupIds: string[] = [];

  priorities: PriorityDto[] = [];
  groups: GroupDropdownDto[] = [];

  // privremeni i18n stub ako ga HTML koristi
  readonly i18n = {
    labels: () => ({
      statusAll: 'All',
      statusResolved: 'Resolved',
      statusUnresolved: 'Unresolved',
      allPriorities: 'All priorities',
      groups: 'Groups',
      searchPlaceholder: 'Search',
    }),
    lang: () => 'EN',
    setLanguage: (_: string) => {},
  };

  constructor(private readonly facade: DashboardFacade) {
    this.facade.state$.subscribe((state) => {
      this.priorities = state.priorities;
      this.groups = state.groups;
      this.selectedGroupIds = state.filter.groupIds ?? [];
      this.searchText = state.filter.searchText ?? '';
    });
  }

  onStatusChange(value: 'ALL' | 'RESOLVED' | 'UNRESOLVED'): void {
    this.status = value;

    this.facade.updateFilter({
      status: value === 'ALL' ? undefined : value === 'RESOLVED' ? 'resolved' : 'unresolved',
    });
  }

  onPriorityChange(value: string): void {
    this.priority = value;
    this.facade.updateFilter({ priority: value || undefined });
  }

  onSearchChange(text: string): void {
    this.searchText = text;
    this.facade.updateFilter({ searchText: text || undefined });
  }

  toggleGroups(): void {
    this.groupsExpanded = !this.groupsExpanded;
  }

  onGroupToggle(groupId: string, checked: boolean): void {
    const next = new Set(this.selectedGroupIds);
    checked ? next.add(groupId) : next.delete(groupId);

    this.facade.updateFilter({
      groupIds: Array.from(next),
    });
  }
}
