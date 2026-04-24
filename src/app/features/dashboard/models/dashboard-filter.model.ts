export interface DashboardFilter {
  status?: 'resolved' | 'unresolved';
  priority?: string;
  groupIds?: string[];
  searchText?: string;

  page: number;
  pageSize: number;
  sort: 'asc' | 'desc';
}
