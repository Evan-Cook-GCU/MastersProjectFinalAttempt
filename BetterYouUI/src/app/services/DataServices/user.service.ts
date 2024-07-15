import { Injectable } from '@angular/core';
import { User, Group, GroupMembership, baseUrl } from '../../Models/Models';
import { GroupMembershipService } from './group-membership.service';
import { GroupService } from './group.service';
import { StorageService } from '../storage/storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
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
  getLoggedInUserId(): number | null {
    return localStorage.getItem('loggedInUserId') ? parseInt(localStorage.getItem('loggedInUserId')!) : null;
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}api/users`);
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
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem('loggedInUserId', user?.userId.toString() || '');
      window.location.reload();
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
  
    createUser(user: User): Observable<User> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<User>(`${baseUrl}api/users`, user, { headers }).pipe(
        catchError(this.handleError)
      );
    }
  
    private handleError(error: HttpErrorResponse) {
      let errorMessage = 'An unknown error occurred!';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        if (error.status === 409) {
          errorMessage = `Conflict: ${error.error}`;
        } else {
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
      }
      alert(errorMessage);
      return throwError(errorMessage);
    }
  
  addGroup(group: Group, userId: number): void {
    this.groupService.addGroup(group);
  }
    

}
