import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://sv-studios.de/api/api';

  private currentUser:User|null = null;

  constructor(private storage:Storage, private http:HttpClient) { }

  async getUserToken() : Promise<string> {
    await this.storage.create();
    let token:string|null = await this.storage.get("auth_token");
    if(token == null)
      return "";
    return token;
  }

  async signIn(email:string, password:string) : Promise<boolean> {
    const url = `${this.apiUrl}/sign-in`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    try {
      const response = await this.http.post<any>(url, { email, password }, { headers }).toPromise();
      let token = response.token;
      let id = response.id;
      let userName = response.name;
      let userEmail = response.email;
      let user:User = {
        id: id,
        name: userName,
        email: userEmail
      };
      this.currentUser = user;
      this.storage.create();
      this.storage.set("auth_token", token);
      return true;
    } catch (error:any) {
      console.log(error.message);
      return false;
    }

    //TODO: Save token in storage
  }

  async getCurrentUser():Promise<User | null> {
    if(this.currentUser != null) {
      return this.currentUser;
    }
    let user:User|null = await this.automaticSignIn();
    return user;
  }

  async getProfileImageFromUser(id:string) : Promise<string> {
    const url = `${this.apiUrl}/user/get-avatar/` + id;
    try {
      const response = await this.http.get<any>(url).toPromise();
      return response.avatar_url;
    } catch(e) {
      return "assets/images/user.png"
    }
  }

  async automaticSignIn():Promise<User|null> {
    await this.storage.create();
    let token:string|null = await this.storage.get("auth_token");
    if(token == null) {
      return null;
    }
    const url = `${this.apiUrl}/automatic-sign-in`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
  });

    try {
      const response = await this.http.post<any>(url, { token }, { headers }).toPromise();
      let id = response.id;
      let name = response.name;
      let email = response.email;
      let user:User = {
        id: id,
        name: name,
        email: email
      };
      return user;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  async signOut() {
    this.currentUser = null;
    await this.storage.create();
    this.storage.remove("auth_token");
  }

}
