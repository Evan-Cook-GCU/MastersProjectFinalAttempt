import { Component, Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/AuthService/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
@Injectable({
  providedIn: 'root'
})
export class AuthComponent {
  user: any;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.authService.getAuthState().subscribe((user: { getIdToken: () => Promise<string>; }) => {
      this.user = user;
      if (user) {
        user.getIdToken().then((token: string) => {
          this.sendTokenToServer(token);
        });
      }
    });
  }

  login(): void {
    this.authService.signInWithGoogle().then((result: { user: { getIdToken: () => Promise<string>; }; }) => {
      this.user = result.user;
      result.user.getIdToken().then((token: string) => {
        this.sendTokenToServer(token);
      });
    }).catch(error => {
      console.error('Error during Google Sign-In', error);
    });
  }

  logout(): void {
    this.authService.signOut().then(() => {
      this.user = null;
    });
  }

  private sendTokenToServer(token: string): void {
    this.http.post('http://localhost:5000/api/auth/google', { token })
      .subscribe(response => {
        console.log('Server response:', response);
      });
  }
}
