import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn: boolean = false;
  users: any[];

  constructor(private router: Router, private http: HttpClient) {
    this.initUsers(); 
  }

  
  initUsers() {
    this.http.get<any[]>('http://localhost:8080/tdsiCipher/user/all').subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error(error);
      }
    );
  }

  logout(): void {
    this.isLoggedIn = false;
    this.router.navigate(['/login'])
  }

  log(): void {
    this.isLoggedIn = true;
    this.router.navigate(['/login'])
  }

  login(username: string, password: string): boolean {
    if (this.users) {
      const foundUser = this.users.find(user => user.username === username && user.password === password);

      if (foundUser) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    } else {
      console.error('Liste des utilisateurs non disponible.');
      this.isLoggedIn = false;
    }

    return this.isLoggedIn;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
