import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { FormsModule, NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  constructor(private slService: ShoppingListService) { }

  @ViewChild('f') editForm: NgForm;
  isEditMode = false;
  editedItemIndex: number;
  subsItemEdit: Subscription;
  editedIngredient: Ingredient;
  ngOnInit() {

    this.subsItemEdit = this.slService.editStarted.subscribe(
      (index: number) => {
        this.isEditMode = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.slService.getIngredient(index);
        this.editForm.setValue({
          name: this.editedIngredient.name,
          amount: this.editedIngredient.amount
        });
      }
    );

  }

  addIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.isEditMode){
      this.slService.updateIngredient(this.editedItemIndex,ingredient);
    }else{
      this.slService.addIngredient(ingredient);
    }
    this.clearForm();
  };
  clearForm(){
    this.editForm.reset();
    this.isEditMode = false;
  };
  deleteItem(){
    this.slService.deleteItem(this.editedItemIndex);
    this.clearForm();
  }
  ngOnDestroy() {
    this.subsItemEdit.unsubscribe();
  };


}
