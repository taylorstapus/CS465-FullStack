import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/auth-response';
import { TripData } from '../services/trip-data';

@Injectable({
  providedIn: 'root'
})

export class Authentication {
  // Variable to handle Authentication Responses
  authResp: AuthResponse = new AuthResponse();

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private tripDataService: TripData
  ) {}

  // Get our token from Storage provider
  // NOTE: Key name = 'travlr-token'
  public getToken(): string {
    const out = this.storage.getItem('travlr-token');
    return out ? out : '';
  }

  // Save our token to Storage provider
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Logout and remove token
  public logout(): void {
    this.storage.removeItem('travlr-token');
  }


  // Check if user is logged in and token is still valid
  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  // Get the current logged-in user
  // Only call this after checking isLoggedIn()
  public getCurrentUser(): User {
    const token: string = this.getToken();
    const { email, name } = JSON.parse(atob(token.split('.')[1]));
    return { email, name } as User;
  }


  // Login user and save token
  public login(user: User, passwd: string): void {
    this.tripDataService.login(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value); // Debugging
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  // Register user and save token
  public register(user: User, passwd: string): void {
    this.tripDataService.register(user, passwd)
      .subscribe({
        next: (value: any) => {
          if (value) {
            console.log(value); // Debugging
            this.authResp = value;
            this.saveToken(this.authResp.token);
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }
}

