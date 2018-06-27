import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
export class ShoppingListService {
    ingredientsChanged = new Subject<Ingredient[]>();
    editStarted = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomattos', 15)
    ];

    setIngredients( ingredients: Ingredient[]) {
        this.ingredients =ingredients ;
        this.ingredientsChanged.next(this.ingredients.slice());
    };
     getIngredients() {
        return this.ingredients.slice();//return a copy
    };
    getIngredient(index : number) {
        return this.ingredients[index];
    };
    addIngredient(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    };
    updateIngredient(editedItemIndex : number ,ingredient :Ingredient){
        this.ingredients[editedItemIndex] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    };
    deleteItem(index : number){
        this.ingredients.splice(index,1);
        this.ingredientsChanged.next(this.ingredients.slice());
    };
    addMultipleIngredients(ingredients :Ingredient[]){
       /*  ingredients.forEach(ingr => {
            this.addIngredient(ingr);
        }); */
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    };

   
}