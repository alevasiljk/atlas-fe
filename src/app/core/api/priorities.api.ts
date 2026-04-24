import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PriorityDto } from '../dto/priority.dto';

@Injectable({
  providedIn: 'root',
})
export class PrioritiesApi {
  constructor(private http: HttpClient) {}

  getPriorities(): Observable<PriorityDto[]> {
    return this.http.get<PriorityDto[]>('/api/priorities/dropdown');
  }
}