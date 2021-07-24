import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackendDataService } from 'src/app/utils/services/backend-data.service';
import { BackendShoppingListService } from 'src/app/utils/services/backend-shoppinglist.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backendDataService: BackendDataService,
    private backendShoppingListService: BackendShoppingListService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      async (params: Params) => {
        this.id = +params['id'];
        this.recipe = await this.backendDataService.fetchSingleRecipe(this.id);
      }
    )
  }
  async sendToShoppingList() {
    await this.backendShoppingListService.addNewItems(this.recipe.ingredients);
    this.backendShoppingListService.changeInIngredients.next(await this.backendShoppingListService.fetchAllItems());
  }
  loadEditRecipePage() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }
  async onDeleteRecipe() {
    await this.backendDataService.deleteRecipe(this.id);
    this.backendDataService.changeInRecipe.next(await this.backendDataService.fetchAllRecipes());
    this.router.navigate(['/recipes']);
  }
}
