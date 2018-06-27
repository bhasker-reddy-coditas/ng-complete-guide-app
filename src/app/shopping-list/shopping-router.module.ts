import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ShoppingListComponent } from "./shopping-list.component";

const shoppingRoutes: Routes = [
    { path: 'shoppingList', component: ShoppingListComponent }
]

@NgModule({
    imports: [RouterModule.forChild(shoppingRoutes)],
    exports:[RouterModule]
})
export class ShoppingRouterModule { }