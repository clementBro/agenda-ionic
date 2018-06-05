import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Provider} from "../../providers/provider/provider";
import * as firebase from "firebase";
import {Camera, CameraOptions} from "@ionic-native/camera";
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
  public myPhotosRef: any;
  public myPhoto: any;
  public myPhotoURL: any;
  todo :any = {};
  disabled = false;
  public image : string;
  constructor(public navCtrl: NavController, public navParams: NavParams,public requettes_service:Provider, public camera: Camera) {
    this.myPhotosRef = firebase.storage().ref('/Images/');

  }

  selectPhoto() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      targetHeight: 150,
      targetWidth: 150
    }).then(imageData => {
      this.myPhoto = imageData;
      if(this.myPhoto != null){
        this.image = "data:image/png;base64," + imageData;
        this.disabled = true;
      }
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  takePhoto() {
    this.camera.getPicture({
      quality: 100, // picture quality
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 150,
      targetWidth: 150

    }).then(imageData => {
      this.myPhoto = imageData;
      if(this.myPhoto != null){
        this.image = "data:image/png;base64," + imageData;
        this.disabled = true;
      }
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }
  deletePicture(){
    this.image = "";
    this.myPhoto = null;
    this.disabled = false;
  }
   addToFirebase() {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.todo.imageSource = savedPicture.metadata.downloadURLs[0].toString();
        if(this.todo.imageSource != null){
          this.requettes_service.ajouter_global(this.todo);
        }else {
          console.log('todo image undefined');
        }
      });
  }
  private generateUUID(): any {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutPage');
  }

  logForm() {
    this.addToFirebase();
  }
}
