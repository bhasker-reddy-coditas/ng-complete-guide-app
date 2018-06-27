import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthService {

    constructor(private router : Router){}
    token: string;
    signUpUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(
                error => console.log(error)
            );
    }
    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password).
            then(
                response => {
                    console.log(response)
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => { this.token = token ;
                                this.router.navigate(['/recipes'])}
                            
                        )
                }
            ).catch(
                error => console.log(error)
            );
    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
        this.router.navigate(['/signin']);
    }
    getToken() {
        firebase.auth().currentUser.getIdToken().then(
            (token: string) => { this.token = token }
        );
        return this.token;
    }

    isAuthenticated() {
        return this.token != null;
    }
}