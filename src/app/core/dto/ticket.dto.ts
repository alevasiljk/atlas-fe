export interface TicketDto {
  id: string;
  jiraKey: string;
  summary: string | null;
  priority: string;
  resolved: boolean;
  description: string;
  hardLabel: string | null;
  softLabel: string | null;
  groupId: string | null;
  groupName: string | null;
  createdAt: string;
}