import {Component} from "@angular/core";
import {NavController, AlertController} from "ionic-angular";
import {AngularFire} from "../../../node_modules/angularfire2/angularfire2";
import {FirebaseListObservable} from "../../../node_modules/angularfire2/database/firebase_list_observable";
import {Category} from "../../model/category.model";
import {CategoryPage} from "../category/category";

/*
  Generated class for the Categories page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-rooms',
  templateUrl: 'rooms.html'
})
export class RoomsPage {

  fbCategories: FirebaseListObservable<Category[]>;

  constructor(private af: AngularFire, public navCtrl: NavController, private  alertCtrl: AlertController) {
    this.fbCategories = af.database.list('/categories');
    console.log('constructor DutiesPage')
  }


  showCategory(category: Category) {
    this.navCtrl.push(CategoryPage, {category: category});
  }

  addNewCategory() {
    this.showPrompt();
  }


  showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'New category',
      message: "Enter a name for this new category",
      inputs: [
        {
          name: 'name',
          placeholder: 'Ex. Bathroom'
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
            console.log('Saved new fbDuty: ' + data.name);
            this.fbCategories.push(new Category(data.name));
          }
        }
      ]
    });
    prompt.present();
  }

}
