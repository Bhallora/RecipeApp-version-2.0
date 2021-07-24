import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditRecipeComponent } from './recipe-book/edit-recipe/edit-recipe.component';
import { RecipeBookIntroComponent } from './recipe-book/recipe-book-intro/recipe-book-intro.component';
import { RecipeBookComponent } from './recipe-book/recipe-book.component';
import { RecipeDetailComponent } from './recipe-book/recipe-detail/recipe-detail.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const routes: Routes = [

  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipeBookComponent, children: [
      {
        path: '', component: RecipeBookIntroComponent
      },
      {
        path: 'new', component: EditRecipeComponent
      },
      {
        path: ':id', component: RecipeDetailComponent
      },
      {
        path: ':id/edit', component: EditRecipeComponent
      }

    ]
  },
  { path: 'shopping-list', component: ShoppingListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
