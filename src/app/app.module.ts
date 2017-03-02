import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {MyApp} from "./app.component";
import {UserService} from "../model/user.service";
import {AngularFireModule} from "angularfire2";
import {SigninPage} from "../pages/signin/signin";
import {DutiesPage} from "../pages/duties/duties";
import {DutyService} from "../model/duty.service";
import {CleaningBilans} from "../pipes/cleaning-bilans";
import {AuthProviders, AuthMethods} from "../../node_modules/angularfire2/auth/auth_backend";
import {FlatmatesPage} from "../pages/flatmates/flatmates";
import {DutyHistoryPage} from "../pages/duty-history/duty-history";
import {DutyHistoryService} from "../pages/duty-history/duty-history.service";
import {RoomsPage} from "../pages/rooms/rooms";
import {CategoryPage} from "../pages/category/category";
import {NotificationsPage} from "../pages/notifications/notifications";
import {CleaningService} from "../model/cleaning.service";
import {Entries} from "../pipes/entries";
import { Storage } from '@ionic/storage';
import {environment} from "../environments/environment";


const firebaseAuthConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
};

@NgModule({
    declarations: [
        MyApp,
        SigninPage,
        DutiesPage,
        CleaningBilans,
        Entries,
        FlatmatesPage,
        DutyHistoryPage,
        RoomsPage,
        CategoryPage,
        NotificationsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        AngularFireModule.initializeApp(environment.firebaseConfig, firebaseAuthConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        SigninPage,
        DutiesPage,
        FlatmatesPage,
        DutyHistoryPage,
        RoomsPage,
        CategoryPage,
        NotificationsPage
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},
        UserService, DutyService,
        DutyHistoryService, CleaningService,
        Storage]
})
export class AppModule {
}
