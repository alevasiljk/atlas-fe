import { DashboardFilter } from '../models/dashboard-filter.model';
import { Ticket } from '../../../core/mappers/ticket.mapper';
import { PriorityDto } from '../../../core/dto/priority.dto';
import { GroupDropdownDto } from '../../../core/dto/group-dropdown.dto';
import { GroupDetailsDto } from '../../../core/dto/group-details.dto';

export interface DashboardState {
  filter: DashboardFilter;
  loading: boolean;
  tickets: Ticket[];
  priorities: PriorityDto[];
  groups: GroupDropdownDto[];
  selectedGroup: GroupDetailsDto | null;
  sidePanelOpen: boolean;
}
