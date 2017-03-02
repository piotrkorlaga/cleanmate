import {Component} from "@angular/core";
import {AngularFire} from "../../../node_modules/angularfire2/angularfire2";
import {FirebaseListObservable} from "../../../node_modules/angularfire2/database/firebase_list_observable";
import {User} from "../../model/user.model";
import Rx from "rxjs/Rx";
import {Duty} from "../../model/duty.model";
import {CleaningEvent} from "../../model/cleaningEvent.model";
import 'rxjs/add/operator/map';
import {Observable} from "../../../node_modules/rxjs/Observable";

/*
 Generated class for the Flatmates page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-flatmates',
    templateUrl: 'flatmates.html'
})
export class FlatmatesPage {
    fbUsers: FirebaseListObservable<User[]>;


    constructor(private af: AngularFire) {
        this.fbUsers = af.database.list('/users', {query: {
            orderByChild: 'points'
        }}).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FlatmatesPage');
    }

}
