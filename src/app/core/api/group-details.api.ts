@Injectable({ providedIn: 'root' })
export class GroupDetailsApi {
  constructor(private http: HttpClient) {}

  getGroupDetails(groupId: string) {
    return this.http.get<GroupDetailsDto>(`/api/groups/${groupId}`);
  }
}
