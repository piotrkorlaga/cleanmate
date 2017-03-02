import {Component, ChangeDetectorRef} from "@angular/core";
import {AlertController, NavController} from "ionic-angular";
import {AngularFire, FirebaseListObservable} from "angularfire2";
import {Duty} from "../../model/duty.model";
import {UserService} from "../../model/user.service";
import {DutyService} from "../../model/duty.service";
import {DutyHistoryPage} from "../duty-history/duty-history";
import {SigninPage} from "../signin/signin";
import {Category} from "../../model/category.model";
import {CleaningService} from "../../model/cleaning.service";
import {CleaningPoint} from "../../model/cleaningPoint.model";
import {OnInit} from "../../../node_modules/@angular/core/src/metadata/lifecycle_hooks";
import {CleaningEvent} from "../../model/cleaningEvent.model";
/*
 Generated class for the Duties page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-duties',
    templateUrl: './duties.html'
})
export class DutiesPage implements OnInit {


    categories: any = {};
    fbUsers: FirebaseListObservable<Category[]>;
    notifications: number;


    constructor(private alertCtrl: AlertController, private af: AngularFire,
                private userService: UserService, private dutyService: DutyService,
                public navCtrl: NavController, private cleaningService: CleaningService,
                private  detector: ChangeDetectorRef) {

    }


    ngOnInit(): void {
        this.fbUsers = this.af.database.list('/users');
        this.findAllCategories();

        this.cleaningService.getCleaningEvents().subscribe((events: CleaningEvent[]) => {
            this.notifications = events.filter((event: CleaningEvent) => {
                return event.userId != this.userService.getLoggedUser().$key
            }).length
        });
    }

    private findAllCategories() {
        this.af.database.object('/categories').$ref.once('value', (snap) => {
            this.categories = snap.val();
            // this.detector.detectChanges();
            console.log("Categories", this.categories);
        });
    }



    save() {
        let points: CleaningPoint[] = [];
        for (const categoryKey in this.categories) {
            let duties = this.categories[categoryKey].duties;
            for (const dutyKey in duties) {
                if (duties[dutyKey].checked) {
                    points.push(new CleaningPoint(categoryKey, dutyKey, duties[dutyKey]));
                }
            }
        }

        this.dutyService.addCleaningPoints(points).then(() => this.findAllCategories())
            .catch((error) => console.log(error));
        console.log(points);
    }

    showHistory(category: Category, dutyIndex: number, duty: Duty) {
        this.navCtrl.push(DutyHistoryPage, {categoryKey: category.$key, dutyIndex: dutyIndex, duty: duty});
    }


    logout() {
        this.userService.signOutFromFirebase()
            .then(() => {
                this.navCtrl.setRoot(SigninPage);
                this.userService.setLogged(null);
            })
            .catch((error) => console.log(error));
    }

}
