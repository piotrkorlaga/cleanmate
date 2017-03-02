import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Duty} from "../../model/duty.model";
import {CleaningEvent} from "../../model/cleaningEvent.model";
import {DutyHistoryService} from "./duty-history.service";
import {FirebaseObjectObservable} from "../../../node_modules/angularfire2/database/firebase_object_observable";
import {UserService} from "../../model/user.service";

/*
  Generated class for the DutyHistory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-duty-history',
  templateUrl: './duty-history.html'
})
export class DutyHistoryPage {
  fbDuty: FirebaseObjectObservable<Duty>;
  title: string;
  duty: Duty;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private dutyHistroyService: DutyHistoryService,
              private userService: UserService) {
    let categoryKey =  this.navParams.get('categoryKey') as number;
    let dutyIndex =  this.navParams.get('dutyIndex') as number;
    this.duty =  this.navParams.get('duty') as Duty;
    this.fbDuty = this.dutyHistroyService.getFirebaseObj(categoryKey, dutyIndex);
  }

  deleteHistoryEntry(index: number){
    this.dutyHistroyService.deleteCleaningFromCurrentDuty(index, this.duty);
  }

  canDeleteHistory(index: number){
    // if(this.duty.cleanings[index]){
    //   return this.duty.cleanings[index].user.uid === this.userService.getLoggedUser().uid;
    // }else{
    //   return false;
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DutyHistoryPage');
  }

}
