import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ShoppingListModule } from './shopping-list/shopping-module';
import { CoreModule } from './core/core-module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { Authinterceptor } from './auth/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
   // AppRoutingModule,
    ShoppingListModule,
    SharedModule,
    AuthModule,
    CoreModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: Authinterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
// e o f