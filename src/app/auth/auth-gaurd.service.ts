import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGaurd implements CanActivate{

    constructor(private authSrvc : AuthService){}
    canActivate(route : ActivatedRouteSnapshot,status :RouterStateSnapshot){
        return this.authSrvc.isAuthenticated();
    }
}