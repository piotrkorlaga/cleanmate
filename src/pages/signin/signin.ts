import {Component} from "@angular/core";
import {UserService} from "../../model/user.service";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {User} from "../../model/user.model";
import {CommonValidators} from "../../model/validators/CommonValidators";
import {NavController, LoadingController} from "ionic-angular";
import {DutiesPage} from "../duties/duties";
import {FirebaseObjectObservable} from "../../../node_modules/angularfire2/database/firebase_object_observable";
import {AngularFire} from "../../../node_modules/angularfire2/angularfire2";
import {Subscription} from "../../../node_modules/rxjs/Subscription";
import {CleaningService} from "../../model/cleaning.service";
import {Storage} from "@ionic/storage";
/*
 Generated class for the Signin page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-signin',
    templateUrl: 'signin.html'
})
export class SigninPage {
    loginForm: FormGroup;

    constructor(private signinService: UserService, private fb: FormBuilder,
                private  navCtrl: NavController, private af: AngularFire,
                private loadingCtrl: LoadingController, private storage: Storage,
                private cleaningService: CleaningService) {
        this.loginForm = this.fb.group({
            'email': [null, [Validators.required, CommonValidators.emailValidator]],
            'password': [null, Validators.required]
        });

        let loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });

        loading.present().then(() => {
            this.af.auth.subscribe((auth) => {
                if (auth && this.signinService.isLoggedIn()) {
                    this.signinService.refreshUser().subscribe((user) => {
                        if (!this.signinService.getLoggedUser()) {
                            this.navCtrl.setRoot(DutiesPage);
                            this.signinService.setLogged(user);
                            storage.ready().then(() => {
                                storage.get(CleaningService.LAST_NOTIFICATIONS_CHECK_TIMESTAMP).then((val) => {
                                    if (val) {
                                        this.cleaningService.updateNotificationTimestamp(val);
                                    }
                                });
                            });
                            loading.dismiss();
                        }
                    });
                } else {
                    loading.dismiss();
                }
            });
        }
            )
            ;
        }

        signin()
        {
            const formObj = this.loginForm.value;
            this.signinService.signin(formObj.email, formObj.password)
                .then((user: FirebaseObjectObservable<User>) => {
                    user.subscribe((user: User) => {
                        if (!this.signinService.getLoggedUser()) {
                            this.navCtrl.setRoot(DutiesPage);
                            this.signinService.setLogged(user);
                            this.storage.ready().then(() => {
                                this.storage.get(CleaningService.LAST_NOTIFICATIONS_CHECK_TIMESTAMP).then((val) => {
                                    if (val) {
                                        this.cleaningService.updateNotificationTimestamp(val);
                                    }
                                });
                            });
                        }
                    });
                }).catch(error => console.log(error));

        }

        ionViewWillLeave()
        {
            console.log('Left SigninPage');
            // this.af.auth.unsubscribe();
        }
    }
