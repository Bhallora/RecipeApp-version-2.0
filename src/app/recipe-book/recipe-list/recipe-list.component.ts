import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackendDataService } from 'src/app/utils/services/backend-data.service';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  subcription: Subscription;
  recipes: Recipe[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private backendDataService: BackendDataService) { }

  ngOnInit(): void {
    this.subcription = this.backendDataService.changeInRecipe.subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    )
    this.fetchBackendData();
  }

  private async fetchBackendData() {
    this.recipes = await this.backendDataService.fetchAllRecipes();
  }

  loadAddNewRecipePage() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }


}
