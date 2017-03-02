import {Component, ViewChild} from "@angular/core";
import {Platform, Nav} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {HomePage} from "../pages/home/home";
import {SigninPage} from "../pages/signin/signin";
import {DutiesPage} from "../pages/duties/duties";
import {FlatmatesPage} from "../pages/flatmates/flatmates";
import {RoomsPage} from "../pages/rooms/rooms";
import {NotificationsPage} from "../pages/notifications/notifications";
import {CleaningService} from "../model/cleaning.service";
import {CleaningEvent} from "../model/cleaningEvent.model";
import {AngularFire} from "../../node_modules/angularfire2/angularfire2";
import {UserService} from "../model/user.service";
import {Storage} from "@ionic/storage";


@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;

    rootPage: any = SigninPage;

    pages: Array<{title: string, component: any}>;

    notificationPage: any = {title: 'Last cleanings', component: NotificationsPage};

    notifications: number;

    constructor(public platform: Platform,
                private  cleaningService: CleaningService,
                private af: AngularFire,
                private userService: UserService,
                private storage: Storage) {
        this.initializeApp();

        // used for an example of ngFor and navigation
        this.pages = [
            {title: 'Checklist', component: DutiesPage},
            {title: 'Flatmates', component: FlatmatesPage},
            {title: 'Rooms', component: RoomsPage},
        ];


        cleaningService.getCleaningEvents().subscribe((events: CleaningEvent[]) => {
            this.notifications = events.filter((event: CleaningEvent) => {
                return event.userId != userService.getLoggedUser().$key
            }).length
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            StatusBar.styleDefault();
            Splashscreen.hide();
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }
}
