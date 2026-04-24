import { DashboardFilter } from '../models/dashboard-filter.model';
import { Ticket } from '../../../core/mappers/ticket.mapper';

export interface DashboardState {
  filter: DashboardFilter;
  loading: boolean;
  tickets: Ticket[];
}