import { Ticket } from '../../../core/mappers/ticket.mapper';
import { PriorityDto } from '../../../core/dto/priority.dto';
import { GroupDropdownDto } from '../../../core/dto/group-dropdown.dto';

export interface DashboardState {
  filter: DashboardFilter;
  loading: boolean;
  tickets: Ticket[];

  priorities: PriorityDto[];
  groups: GroupDropdownDto[];
}