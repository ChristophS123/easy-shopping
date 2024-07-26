import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShoppingList } from '../models/ShoppingList';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  url:string = "https://sv-studios.de/easy_shopping/api.php?route="

  constructor(private http:HttpClient) { }

  async loadListsFromUser(userID:string) : Promise<ShoppingList[]> {
    const body = {
      userID: userID
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    try {
      const response: string[] = await lastValueFrom(this.http.post<string[]>(this.url + "getListsFromUser", body, { headers }));
      let lists:ShoppingList[] = await this.convertListUUIDsToShoppingListArray(response, userID);
      return lists;
    } catch (error) {
      console.error('Error fetching lists:', error);
      return [];
    }
  }

  async convertListUUIDsToShoppingListArray(uuids:string[], userID:string) : Promise<ShoppingList[]> {
    let lists:ShoppingList[] = [];
    await uuids.forEach(async listUUID => {
      console.log(listUUID)
      const body = {
        listID: listUUID,
        userID: userID
      };
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      const response: any = await lastValueFrom(
        this.http.post(this.url + "getListByID", body, { headers })
      );
      if(response == null)
        return;
      let list:ShoppingList = {
        id: response.id,
        name: response.name,
        owner: response.owner,
        members: response.members,
        items: response.items
      }
      lists.push(list);
    });
    return lists;
  }

  async createList(userID:string, listName:string) : Promise<boolean> {
    const body = {
      userID: userID,
      listName: listName
    };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    try {
      const response = await this.http.post(this.url + "createList", body, { headers }).toPromise();
      return true;
    } catch (error) {
      console.error('Error creating lists:', error);
      return false;
    }
  }

}
