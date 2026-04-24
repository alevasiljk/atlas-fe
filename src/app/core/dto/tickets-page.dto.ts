import { TicketDto } from './ticket.dto';

export interface TicketsPageDto {
  page: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  totalResolved: number;
  totalUnresolved: number;
  items: TicketDto[];
}