import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipes: Recipe[];
  subsRecipeChanged : Subscription;
  constructor(private recipeService: RecipeService,private router : Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.subsRecipeChanged = this.recipeService.recipeChanged.subscribe(
      (recipeList : Recipe[])=>{
        this.recipes = recipeList;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  onAddRecipe(){
    this.router.navigate(['new'],{relativeTo:this.route});
  }
  ngOnDestroy(){
    this.subsRecipeChanged.unsubscribe();
  }
}
