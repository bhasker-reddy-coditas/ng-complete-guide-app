import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes.model';
import { validateConfig } from '@angular/router/src/config';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  subsRecipeChanged : Subscription;
  recipeForm: FormGroup;
  recipeIngredients = new FormArray([]);
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute, private router : Router,
    private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  };

  initForm() {
    let recipeName = '';
    let imgPath = '';
    let description = '';

    if (this.editMode) {
      let recipe: Recipe;
      recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      imgPath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          this.recipeIngredients.push(
            new FormGroup(
              {
                'name': new FormControl(ingredient.name,Validators.required),
                'amount': new FormControl(ingredient.amount,
                [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
              }
            )
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imgPath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: this.recipeIngredients
    });
  };

  onSubmit() {
    console.log(this.recipeForm.dirty);
    /* const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    ); */
    
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  };

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null,Validators.required),
        'amount': new FormControl(null, [Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    );
  };
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'],{relativeTo : this.route});
  }

}
