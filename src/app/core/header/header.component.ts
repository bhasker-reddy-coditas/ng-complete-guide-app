import { Component, EventEmitter, Output } from "@angular/core";
import { DataService } from "../../shared/data.service";
import { Response } from "@angular/http";
import { AuthService } from "../../auth/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: []
})
export class HeaderComponent {
//No more needed as Router is being used to navigate
   /* @Output() featureSelected = new EventEmitter<string>();

    onSelect(feature: string) {
        this.featureSelected.emit(feature);
    } */

    constructor(private dataService : DataService, public authService : AuthService){}
    onSaveData(){
        this.dataService.saveData().subscribe(
            (response : Response)=>{
                const data = response.json();
            },
            (error: Response)=>{
                console.log(error);
            }
        );
    }
    onFetchData(){
      const recipes =   this.dataService.fetchData();
      /* .subscribe(
            (data: any)=>{
                console.log(data);
            },
            (error: Response)=>{
                console.log(error);
            }
        ); */
    }

    onLogout(){
        this.authService.logOut();
    }
}