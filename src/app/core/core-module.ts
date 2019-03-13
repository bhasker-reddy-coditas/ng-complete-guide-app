import { NgModule } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { AppRoutingModule } from "../app-routing.module";
import { CommonModule } from "@angular/common";
import { DataService } from "../shared/data.service";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { RecipeService } from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { Authinterceptor } from "../auth/auth.interceptor";

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [DataService, ShoppingListService, RecipeService, AuthService
        
    ],
})
export class CoreModule {

}