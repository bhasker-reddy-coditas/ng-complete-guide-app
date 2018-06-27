import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router"
import { AuthGaurd } from "./auth/auth-gaurd.service";
import { HomeComponent } from "./core/home/home.component";

const appRoutes: Routes = [
    { path: '', component:HomeComponent },
    { path: 'recipes', loadChildren:'./recipes/recipes.module#RecipesModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})],
    exports: [RouterModule],
    providers :[AuthGaurd]
})
export class AppRoutingModule {

}