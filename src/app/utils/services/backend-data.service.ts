import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { Recipe } from "src/app/recipe-book/recipe.model";

@Injectable({ providedIn: 'root' })
export class BackendDataService {
  changeInRecipe = new Subject<Recipe[]>();

  constructor(private http: HttpClient) { }

  async addNewRecipe(recipe: Recipe) {
    await this.http.post('http://localhost:8080/recipes', recipe).toPromise()
  }

  async fetchAllRecipes() {
    let recipes = await this.http.get<Recipe[]>('http://localhost:8080/recipes').toPromise();
    return recipes;
  }

  async fetchSingleRecipe(recipeId: number) {
    let data = await this.http.get<Recipe>(`http://localhost:8080/recipes/${recipeId}`).toPromise();
    return data;
  }

  async deleteRecipe(recipeId: number) {
    let status = await this.http.delete(`http://localhost:8080/recipes/${recipeId}`).toPromise();
    return status;
  }

  async updateRecipe(recipe) {
    let updatedRecipe = await this.http.put<Recipe>('http://localhost:8080/recipes', recipe).toPromise();
    return updatedRecipe;
  }
}

