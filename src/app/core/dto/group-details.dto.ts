export interface GroupDetailsTicketDto {
  id: string;
  jiraKey: string;
  summary: string | null;
  priority: string;
  resolved: boolean;
  description: string;
  hardLabel: string | null;
  softLabel: string | null;
  groupId: string;
  groupName: string;
  createdAt: string;
}

export interface GroupDetailsDto {
  id: string;
  name: string;
  tickets: GroupDetailsTicketDto[];
}
