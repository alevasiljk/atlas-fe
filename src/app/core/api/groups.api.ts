import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GroupDropdownDto } from '../dto/group-dropdown.dto';

@Injectable({
  providedIn: 'root',
})
export class GroupsApi {
  constructor(private http: HttpClient) {}

  getGroupsDropdown(): Observable<GroupDropdownDto[]> {
    return this.http.get<GroupDropdownDto[]>('/api/groups/dropdown');
  }
}