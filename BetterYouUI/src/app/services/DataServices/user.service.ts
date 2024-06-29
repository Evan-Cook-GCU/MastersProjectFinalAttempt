import { Injectable } from '@angular/core';
import { User, Group, GroupMembership, baseUrl } from '../../Models/Models';
import { GroupMembershipService } from './group-membership.service';
import { GroupService } from './group.service';
import { StorageService } from '../storage/storage.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
export interface LoginDTO {
  userName: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})

export class UserService {
  private users: User[] = [];
  router: any;

  constructor(
    private groupService: GroupService,
    private groupMembershipService: GroupMembershipService,
    private storageService: StorageService,
    private http: HttpClient
  ) { } 

  getLoggedInUser(): User | null {
    return localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser')!) : null;
  }
  LogOut(): void {
    this.storageService.removeStorage('loggedInUser');
    this.storageService.removeStorage('loggedInUserId');
  }
  LogIn(username: string, password: string): void {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const logindto= {userName: username, password: password};
    this.http.post<User>(baseUrl + 'api/users/login',logindto,{headers}).subscribe(user => {
      this.storageService.setStorage('loggedInUser', JSON.stringify(user));
      this.storageService.setStorage('loggedInUserId', user?.userId.toString() || '');
      this.router.navigate(['/user-home-page']);
    }
    );
  }
  update(userId: number, user: User): void {
    //to implement with api call
  }
  hashPassword(password: string): string {
    // Mock hash function; replace with real hash if necessary
    return password.split('').reverse().join(''); // Just a mock; replace with actual hash logic
  }
    getGroupMembers(groupId: number):Observable< User[]> {
      return this.http.get<User[]>(baseUrl + 'api/groups/' + groupId+'/Members');
    }
  

  
  addGroup(group: Group, userId: number): void {
    this.groupService.addGroup(group);
    this.groupMembershipService.addGroupMembership({
      membershipId: new Date().getTime(),
      userId: userId,
      groupId: group.groupId,
      isAdmin: true,
      joinedAt: new Date(),
      metricData: []
    });
  }

}
