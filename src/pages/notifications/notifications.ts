import {Component,ApplicationRef} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {AngularFire} from "../../../node_modules/angularfire2/angularfire2";
import {UserService} from "../../model/user.service";
import {Storage} from "@ionic/storage";
import {CleaningService} from "../../model/cleaning.service";

/*
 Generated class for the Notifications page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html'
})
export class NotificationsPage {

    events = [];

    constructor(private af: AngularFire, private userService: UserService,
                private storage: Storage,
                private cleaningService: CleaningService,
                private applicationref: ApplicationRef) {


    }

    ionViewDidEnter() {
        this.af.database.list('/cleaningEvents').$ref.on('child_added', (event) => {
            if (this.userService.getLoggedUser().$key != event.val().userId) {
                this.af.database.object('/users/' + event.val().userId).$ref.once('value', (userSnap) => {
                    let user = userSnap.val();
                    let notification = {user: user, event: event.val()};
                    this.events.push(notification);
                    this.applicationref.tick();
                });
            }
        });

        this.storage.ready().then(() => {
            let timestamp = Date.now();
            this.storage.set(CleaningService.LAST_NOTIFICATIONS_CHECK_TIMESTAMP, timestamp);
            this.cleaningService.updateNotificationTimestamp(timestamp);
        });
    }

}
