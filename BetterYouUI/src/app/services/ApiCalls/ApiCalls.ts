import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group, GroupMembership, Metric, MetricData, User } from '../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:44060/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    console.log('Calling UserService.getAll');
    return this.http.get<User[]>(this.baseUrl);
  }

  get(id: number): Observable<User> {
    console.log(`Calling UserService.get with id: ${id}`);
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    console.log('Calling UserService.create');
    return this.http.post<User>(this.baseUrl, user);
  }

  update(id: number, user: User): Observable<User> {
    console.log(`Calling UserService.update with id: ${id}`);
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    console.log(`Calling UserService.delete with id: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getGroupsByUserId(userId: number): Observable<Group[]> {
    console.log(`Calling UserService.getGroupsByUserId with userId: ${userId}`);
    return this.http.get<Group[]>(`${this.baseUrl}/${userId}/groups`);
  }

  addGroup(group: Group, userId: number): Observable<Group> {
    console.log(`Calling UserService.addGroup with userId: ${userId}`);
    return this.http.post<Group>(`${this.baseUrl}/${userId}/groups`, group);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://localhost:44060/api/groups';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Group[]> {
    console.log('Calling GroupService.getAll');
    return this.http.get<Group[]>(this.baseUrl);
  }

  get(id: number): Observable<Group> {
    console.log(`Calling GroupService.get with id: ${id}`);
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  create(group: Group): Observable<Group> {
    console.log('Calling GroupService.create');
    return this.http.post<Group>(this.baseUrl, group);
  }

  update(id: number, group: Group): Observable<Group> {
    console.log(`Calling GroupService.update with id: ${id}`);
    return this.http.put<Group>(`${this.baseUrl}/${id}`, group);
  }

  delete(id: number): Observable<void> {
    console.log(`Calling GroupService.delete with id: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GroupMembershipService {
  private baseUrl = 'http://localhost:44060/api/groupmemberships';

  constructor(private http: HttpClient) {}

  getAll(): Observable<GroupMembership[]> {
    console.log('Calling GroupMembershipService.getAll');
    return this.http.get<GroupMembership[]>(this.baseUrl);
  }

  get(id: number): Observable<GroupMembership> {
    console.log(`Calling GroupMembershipService.get with id: ${id}`);
    return this.http.get<GroupMembership>(`${this.baseUrl}/${id}`);
  }

  create(membership: GroupMembership): Observable<GroupMembership> {
    console.log('Calling GroupMembershipService.create');
    return this.http.post<GroupMembership>(this.baseUrl, membership);
  }

  update(id: number, membership: GroupMembership): Observable<GroupMembership> {
    console.log(`Calling GroupMembershipService.update with id: ${id}`);
    return this.http.put<GroupMembership>(`${this.baseUrl}/${id}`, membership);
  }

  delete(id: number): Observable<void> {
    console.log(`Calling GroupMembershipService.delete with id: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetricService {
  private baseUrl = 'http://localhost:44060/api/metrics';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Metric[]> {
    console.log('Calling MetricService.getAll');
    return this.http.get<Metric[]>(this.baseUrl);
  }

  get(id: number): Observable<Metric> {
    console.log(`Calling MetricService.get with id: ${id}`);
    return this.http.get<Metric>(`${this.baseUrl}/${id}`);
  }

  create(metric: Metric): Observable<Metric> {
    console.log('Calling MetricService.create');
    return this.http.post<Metric>(this.baseUrl, metric);
  }

  update(id: number, metric: Metric): Observable<Metric> {
    console.log(`Calling MetricService.update with id: ${id}`);
    return this.http.put<Metric>(`${this.baseUrl}/${id}`, metric);
  }

  delete(id: number): Observable<void> {
    console.log(`Calling MetricService.delete with id: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class MetricDataService {
  private baseUrl = 'http://localhost:44060/api/metricdata';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MetricData[]> {
    console.log('Calling MetricDataService.getAll');
    return this.http.get<MetricData[]>(this.baseUrl);
  }

  get(id: number): Observable<MetricData> {
    console.log(`Calling MetricDataService.get with id: ${id}`);
    return this.http.get<MetricData>(`${this.baseUrl}/${id}`);
  }

  create(data: MetricData): Observable<MetricData> {
    console.log('Calling MetricDataService.create');
    return this.http.post<MetricData>(this.baseUrl, data);
  }

  update(id: number, data: MetricData): Observable<MetricData> {
    console.log(`Calling MetricDataService.update with id: ${id}`);
    return this.http.put<MetricData>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    console.log(`Calling MetricDataService.delete with id: ${id}`);
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class VersionService {
  private baseUrl = 'http://localhost:44060/version';

  constructor(private http: HttpClient) {}

  get(): Observable<any> {
    console.log('Calling VersionService.get');
    return this.http.get<any>(this.baseUrl);
  }
}
