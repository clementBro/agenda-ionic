import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../providers/provider/provider";

/**
 * Generated class for the AjoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout',
  templateUrl: 'ajout.html',
})
export class AjoutPage {

  todo :any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public requettes_service:Provider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutPage');
  }

  logForm() {
    console.log(this.todo.name);
    console.log(this.todo.capital);
    this.requettes_service.ajouter_global(this.todo);
  }
}
