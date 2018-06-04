import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the Provider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

interface Items {

   }
@Injectable()
export class Provider {

	 items: Observable<Items[]>; // read collection
  itemsCollection: AngularFirestoreCollection<Items>; //Firestore collection
  requettesProvider:any=[];

  constructor(public db: AngularFirestore) {
    this.itemsCollection = db.collection<Items>('Tabac'); //ref()
    console.log('Hello RequettesProvider Provider');
  }

  ajouter_global(item){
    console.log("ajout de la page requette"+item.id)
    this.db.collection("Tabac").add({
      Nom : item.Nom,
      Ville: item.Ville,
      Adresse : item.adresse,
      Tel : item.Tel,
      Horaires : item.Horaires,
      imageSource: item.imageSource.toString(),
      post_cod: item.post_cod

    })
      .then( (docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });
  }
  supprimer_global(item){
    console.log("de la page requette"+item.id)
    this.db.collection('Tabac').doc(item.id).delete();
  }

  modifier_global(item){
    console.log("modificatoin de la page requette"+item.id)
    console.log("ajout de la page requette"+item.id)
    this.db.collection("Tabac").doc(item.id).update({
      Nom : item.Nom,
      Ville: item.Ville,
      Adresse : item.adresse,
      Tel : item.Tel,
      Horaires : item.Horaires,
      post_cod: item.post_cod
    })
      .then( (docRef) => {
        console.log("Document written with ID: ", docRef);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });
  }
}
