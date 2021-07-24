import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BackendDataService } from 'src/app/utils/services/backend-data.service';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss']
})
export class EditRecipeComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  recipe: Recipe;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private backendDataService: BackendDataService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initializeForm();
      }
    )
  }

  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  async onSubmit() {
    if (this.editMode) {
      let selectedRecipe = this.recipeForm.value;
      selectedRecipe.id = this.id;
      await this.backendDataService.updateRecipe(selectedRecipe);
      this.backendDataService.changeInRecipe.next(await this.backendDataService.fetchAllRecipes());
    }
    else {
      await this.backendDataService.addNewRecipe(this.recipeForm.value);
      this.backendDataService.changeInRecipe.next(await this.backendDataService.fetchAllRecipes());

    }
    this.onCancel();
  }
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }
  private async initializeForm() {

    let recipeName = new FormControl('', Validators.required);
    let recipeImagePath = new FormControl('', [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)/)]);
    let recipeDescription = new FormControl('', Validators.required);;
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.recipe = await this.backendDataService.fetchSingleRecipe(this.id);
      recipeName = new FormControl(this.recipe.name, Validators.required);
      recipeImagePath = new FormControl(this.recipe.imagePath, [Validators.required, Validators.pattern(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)(.jpg|.png|.gif)/)]);
      recipeDescription = new FormControl(this.recipe.description, Validators.required);
      if (this.recipe['ingredients']) {
        for (let ingredient of this.recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          );
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': recipeName,
      'imagePath': recipeImagePath,
      'description': recipeDescription,
      'ingredients': recipeIngredients
    })
  }
}
