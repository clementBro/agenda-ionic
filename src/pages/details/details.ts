import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../providers/provider/provider";
import {ModifierPage} from "../modifier/modifier";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  item: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requettes_service: Provider) {
    let item = this.navParams.get('item');
    console.log("ok page tranfere" + item.name)
    this.item = item;
  }
  supprimer(item) {
    console.log("suppression" + item.id);
    this.requettes_service.supprimer_global(item);
  }
  modifier(item) {
    console.log("modif" + item)
    this.navCtrl.push(ModifierPage, {item: item});
  }
}
