import { TicketDto } from '../dto/ticket.dto';

export interface Ticket {
  id: string;
  jiraKey: string;
  summary: string;
  priority: string;
  resolved: boolean;
  groupName: string;
  hardLabel: string;
  softLabel: string;
  createdAt: Date;
}

export const mapTicket = (dto: TicketDto): Ticket => ({
  id: dto.id,
  jiraKey: dto.jiraKey,
  summary: dto.summary ?? '',
  priority: dto.priority,
  resolved: dto.resolved,
  groupName: dto.groupName ?? 'No group assigned',
  hardLabel: dto.hardLabel ?? 'Processing',
  softLabel: dto.softLabel ?? 'Processing',
  createdAt: new Date(dto.createdAt),
});