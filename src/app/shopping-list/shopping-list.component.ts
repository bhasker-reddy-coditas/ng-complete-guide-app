import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {

  ingredientsSubscription : Subscription;
  ingredients : Ingredient[];
  constructor(private slService : ShoppingListService) {
   }
  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingredientsSubscription= this.slService.ingredientsChanged.subscribe(
      (changedIngredients : Ingredient []) => {
        this.ingredients = changedIngredients;
      }
    );
  };

  ngOnDestroy(){
    this.ingredientsSubscription.unsubscribe();
  };

  onEditItem(index :number ){
    this.slService.editStarted.next(index);
  }
}
