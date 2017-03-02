import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import {Category} from "../../model/category.model";
import {AngularFire} from "../../../node_modules/angularfire2/angularfire2";
import {Duty} from "../../model/duty.model";
import {FirebaseObjectObservable} from "../../../node_modules/angularfire2/database/firebase_object_observable";
import {DutyService} from "../../model/duty.service";

/*
  Generated class for the Category page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-category',
  templateUrl: './category.html'
})
export class CategoryPage {
  category: Category;
  fbCategory: FirebaseObjectObservable<Category>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private alertCtrl: AlertController, private  af: AngularFire, private dutyService: DutyService) {
    this.category = navParams.get('category') as Category;
    this.fbCategory = af.database.object("/categories/" + this.category.$key);
  }

  addNewDuty() {
    this.showPrompt();
  }

  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Add new duty to ' + this.category.name,
      message: "Enter a name for this new duty",
      inputs: [
        {
          name: 'name',
          placeholder: 'Ex. Cleaning floor'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.dutyService.addNewDutyToCategory(this.category.$key, new Duty(data.name));
          }
        }
      ]
    });
    prompt.present();
  }


}
