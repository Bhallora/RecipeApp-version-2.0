import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../utils/ingredient.model';
import { BackendShoppingListService } from '../utils/services/backend-shoppinglist.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingredientChangeSub: Subscription;
  constructor(
    private backendShoppingListService: BackendShoppingListService) { }

  ngOnInit(): void {

    this.ingredientChangeSub = this.backendShoppingListService.changeInIngredients.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
    this.fetchBackendData();
  }

  private async fetchBackendData() {
    this.ingredients = await this.backendShoppingListService.fetchAllItems();
  }

  onItemEdit(id: number) {

    this.backendShoppingListService.editStarted.next(id);
  }
  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe();
  }

}
