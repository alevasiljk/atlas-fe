import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GroupDetailsDto } from '../dto/group-details.dto';

@Injectable({ providedIn: 'root' })
export class GroupDetailsApi {
  constructor(private http: HttpClient) {}

  getGroupDetails(groupId: string) {
    return this.http.get<GroupDetailsDto>(`/api/groups/${groupId}`);
  }
}
