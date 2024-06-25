import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, Group, GroupMembership, Metric, UserMetric } from '../../Models/Models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:44060/api/users';

  constructor(private http: HttpClient) {}

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private baseUrl = 'http://localhost:44060/api/groups';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Group[]> {
    return this.http.get<Group[]>(this.baseUrl);
  }

  get(id: number): Observable<Group> {
    return this.http.get<Group>(`${this.baseUrl}/${id}`);
  }

  create(group: Group): Observable<Group> {
    return this.http.post<Group>(this.baseUrl, group);
  }

  update(id: number, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.baseUrl}/${id}`, group);
  }

  delete(id: number): Observable<void> {
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
    return this.http.get<GroupMembership[]>(this.baseUrl);
  }

  get(id: number): Observable<GroupMembership> {
    return this.http.get<GroupMembership>(`${this.baseUrl}/${id}`);
  }

  create(membership: GroupMembership): Observable<GroupMembership> {
    return this.http.post<GroupMembership>(this.baseUrl, membership);
  }

  update(id: number, membership: GroupMembership): Observable<GroupMembership> {
    return this.http.put<GroupMembership>(`${this.baseUrl}/${id}`, membership);
  }

  delete(id: number): Observable<void> {
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
    return this.http.get<Metric[]>(this.baseUrl);
  }

  get(id: number): Observable<Metric> {
    return this.http.get<Metric>(`${this.baseUrl}/${id}`);
  }

  create(metric: Metric): Observable<Metric> {
    return this.http.post<Metric>(this.baseUrl, metric);
  }

  update(id: number, metric: Metric): Observable<Metric> {
    return this.http.put<Metric>(`${this.baseUrl}/${id}`, metric);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

@Injectable({
  providedIn: 'root'
})
export class UserMetricService {
  private baseUrl = 'http://localhost:44060/api/usermetrics';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserMetric[]> {
    return this.http.get<UserMetric[]>(this.baseUrl);
  }

  get(id: number): Observable<UserMetric> {
    return this.http.get<UserMetric>(`${this.baseUrl}/${id}`);
  }

  create(userMetric: UserMetric): Observable<UserMetric> {
    return this.http.post<UserMetric>(this.baseUrl, userMetric);
  }

  update(id: number, userMetric: UserMetric): Observable<UserMetric> {
    return this.http.put<UserMetric>(`${this.baseUrl}/${id}`, userMetric);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}


