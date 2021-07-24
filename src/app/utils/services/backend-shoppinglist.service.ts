import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { Ingredient } from "../ingredient.model";


@Injectable({ providedIn: 'root' })
export class BackendShoppingListService {
  changeInIngredients = new Subject<Ingredient[]>();
  editStarted = new Subject<Number>();

  constructor(private http: HttpClient) { }

  async addNewItems(item: Ingredient[]) {
    await this.http.post('http://localhost:8080/shopping-list', item).toPromise()
  }

  async fetchAllItems() {
    let items = await this.http.get<Ingredient[]>('http://localhost:8080/shopping-list').toPromise();
    return items;
  }

  async fetchSingleItem(itemId: number) {
    let data = await this.http.get<Ingredient>(`http://localhost:8080/shopping-list/${itemId}`).toPromise();
    return data;
  }

  async deleteItem(itemId: number) {
    let status = await this.http.delete(`http://localhost:8080/shopping-list/${itemId}`).toPromise();
    return status;
  }

  async updateItem(item) {
    let updatedItem = await this.http.put<Ingredient>('http://localhost:8080/shopping-list', item).toPromise();
    return updatedItem;
  }
}

