import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../providers/provider/provider";
import {ModifierPage} from "../modifier/modifier";

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  item: string;

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public requettes_service: Provider) {
    let item = this.navParams.get('item');
    console.log("ok page tranfere" + item.name);
    this.item = item;
  }

  ionViewDidLoad() {
    let latLng = new google.maps.LatLng(45.745975, 4.841533);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
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
