import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../providers/provider/provider";

/**
 * Generated class for the ModifierPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modifier',
  templateUrl: 'modifier.html',
})
export class ModifierPage {

  item : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requettes_service: Provider) {
    let item = this.navParams.get('item');
    this.item = item;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModifierPage');
  }
  modifierForm(){
    this.requettes_service.modifier_global(this.item)
  }

}
