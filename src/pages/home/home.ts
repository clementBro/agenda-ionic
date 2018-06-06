import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import {DetailsPage} from "../details/details";
import {AjoutPage} from "../ajout/ajout";
import { Observable } from "rxjs";
import {AuthProvider} from "../../providers/auth/auth";
interface Items {
    nom: string;
    adresse: string;
    description: string;
    imageSource: string;
   }
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  items: Observable<Items[]>; // read collection
  constructor(public navCtrl: NavController, db: AngularFirestore, public authProvider: AuthProvider) {
     this.itemsCollection = db.collection<Items>('Tabac'); //ref()

     this.items= this.itemsCollection.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Items;
          const id = a.payload.doc.id;
          /*affichage de l'id du document*/
          console.log(a.payload.doc.id);
          console.log("test"+a.payload.doc.data().imageSource);
          return data;
        });
     });
  }

  itemSelected(item) {
    console.log("click" + item.get);
    this.navCtrl.push(DetailsPage, {item: item});
  }
  ajouter(num) {
    console.log("ajout" + num);
    this.navCtrl.push(AjoutPage, {num: num});
  }
  async logOut(): Promise<void> {
    await this.authProvider.logoutUser();
    this.navCtrl.setRoot('LoginPage');
  }
}
