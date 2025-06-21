import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface LoginRequest 
{
  userName: string;
  password: string;
}

export interface LoginResponse 
{
  token: string;
}

export interface ApiResponse 
{
  data: any;
  headers: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  private readonly API_BASE_URL = 'http://localhost:8080/api';
  private readonly TOKEN_KEY = 'jwt_token';
  
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;

  constructor(private http: HttpClient) 
  {
    this.currentUserSubject = new BehaviorSubject<string | null>(this.getToken());
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string | null 
  {
    return this.currentUserSubject.value;
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> 
  {
    return this.http.post<LoginResponse>(`${this.API_BASE_URL}/auth/login`, loginRequest)
      .pipe(map(response => {
        // Guardar el token en localStorage
        if (response && response.token) 
        {
          localStorage.setItem(this.TOKEN_KEY, response.token);
          this.currentUserSubject.next(response.token);
        }
        return response;
      }));
  }

  logout(): void 
  {
    // Remover el token del localStorage
    localStorage.removeItem(this.TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null 
  {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean 
  {
    const token = this.getToken();
    if (!token) 
    {
      return false;
    }
    
    // Verificar si el token no ha expirado (opcional)
    try 
    {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp > currentTime;
    } 
    catch (error) 
    {
      return false;
    }
  }

  getGreetings(): Observable<ApiResponse> 
  {
    const token = this.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get(`${this.API_BASE_URL}/greetings`, { 
      headers: headers,
      observe: 'response',
      responseType: 'text'
    }).pipe(
      map(response => ({
        data: response.body,
        headers: {
          'Content-Type': response.headers.get('Content-Type'),
          'Authorization': response.headers.get('Authorization'),
          'Date': response.headers.get('Date'),
          'Status': response.status,
          'StatusText': response.statusText
        }
      }))
    );
  }
}
