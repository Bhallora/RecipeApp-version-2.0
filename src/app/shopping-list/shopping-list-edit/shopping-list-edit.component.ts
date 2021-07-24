import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/utils/ingredient.model';
import { BackendShoppingListService } from 'src/app/utils/services/backend-shoppinglist.service';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('newForm', { static: true }) shoppingListForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemId: number;
  editedItem: Ingredient;
  constructor(
    private backendShoppingListService: BackendShoppingListService) { }

  ngOnInit(): void {
    this.subscription = this.backendShoppingListService.editStarted.subscribe(
      async (id: number) => {
        this.editedItemId = id;
        this.editMode = true;
        this.editedItem = await this.backendShoppingListService.fetchSingleItem(this.editedItemId)
        this.shoppingListForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );

  }
  async onSubmit(form: NgForm) {
    const inputIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      inputIngredient.id = this.editedItemId;
      await this.backendShoppingListService.updateItem(inputIngredient);
      this.backendShoppingListService.changeInIngredients.next(await this.backendShoppingListService.fetchAllItems());
    } else {
      let newItem = [];
      newItem.push(inputIngredient);
      await this.backendShoppingListService.addNewItems(newItem);
      this.backendShoppingListService.changeInIngredients.next(await this.backendShoppingListService.fetchAllItems());
    }
    this.editMode = false;
    form.reset();
  }
  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }
  async onDelete() {
    await this.backendShoppingListService.deleteItem(this.editedItemId);
    this.backendShoppingListService.changeInIngredients.next(await this.backendShoppingListService.fetchAllItems());
    this.onClear();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
