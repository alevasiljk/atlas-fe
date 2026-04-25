import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TicketsPageDto } from '../dto/tickets-page.dto';
import { DashboardFilter } from '../../features/dashboard/models/dashboard-filter.model';

@Injectable({
  providedIn: 'root',
})
export class TicketsApi {
  constructor(private http: HttpClient) {}

  getTickets(filter: DashboardFilter): Observable<TicketsPageDto> {
    let params = new HttpParams()
      .set('page', filter.page)
      .set('pageSize', filter.pageSize)
      .set('sort', filter.sort);

    if (filter.status) {
      params = params.set(
        'resolved',
        filter.status === 'resolved'
      );
    }

    if (filter.priority) {
      params = params.set('priority', filter.priority);
    }

    if (filter.groupIds?.length) {
      filter.groupIds.forEach(id => {
        params = params.append('groupIds', id);
      });
    }

    if (filter.searchText) {
      params = params.set('text', filter.searchText);
    }

    return this.http.get<TicketsPageDto>('/api/tickets', { params });
  }
}