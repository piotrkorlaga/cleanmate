import {User} from "./user.model";
import {Injectable} from "@angular/core";
import {AngularFire} from "../../node_modules/angularfire2/angularfire2";
import {FirebaseAuthState} from "../../node_modules/angularfire2/auth/auth_backend";
import {FirebaseObjectObservable} from "../../node_modules/angularfire2/database/firebase_object_observable";
import {NavController} from "ionic-angular";
import {DutiesPage} from "../pages/duties/duties";
import {SigninPage} from "../pages/signin/signin";

@Injectable()
export class UserService {

    private fbUser: FirebaseObjectObservable<User>;
    private user: User;

    constructor(private af: AngularFire) {


    }

    refreshUser():FirebaseObjectObservable<User>{
        let auth = this.af.auth.getAuth();
        console.log("Already logged!");
        this.fbUser = this.af.database.object("/users/" + auth.uid);
        return this.fbUser;
    }

    isLoggedIn(){
        let auth = this.af.auth.getAuth();
        if(auth) return true;
        else return false;
    }

    signin(email: string, password: string): firebase.Promise<FirebaseObjectObservable<User>> {
        console.log("First login!");
        return this.af.auth.login({
            email: email,
            password: password
        }).then((obj: FirebaseAuthState) => {
            this.fbUser = this.af.database.object("/users/" + obj.uid);
            return this.fbUser;
        });
    }

    getLoggedUser(): User{
        return this.user;
    }

    setLogged(user) {
        this.user = user;
    }

    signOutFromFirebase(): firebase.Promise<any> {
        this.setLoggedOut();
        return this.af.auth.logout();
    }

    setLoggedOut() {
        this.user = null;
    }

    getFbUser() {
        return this.fbUser;
    }
}