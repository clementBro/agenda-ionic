import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Provider} from "../../providers/provider/provider";
import * as firebase from "firebase";
import {Camera, CameraOptions} from "@ionic-native/camera";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/emailValidator";
import {HomePage} from "../home/home";
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
  todo :any = {};
  public addForm: FormGroup;
  public image : string;
  public disabled = true;

  constructor(public navCtrl: NavController, public navParams: NavParams,public requettes_service:Provider, public alertCtrl: AlertController, public camera: Camera,formBuilder: FormBuilder,  public loadingCtrl: LoadingController) {
    this.myPhotosRef = firebase.storage().ref('/Images/');
    this.addForm = formBuilder.group({
      nom: [
        '',
        Validators.compose([Validators.required])
      ],
      ville: [
        '',
        Validators.compose([Validators.required])
      ],
      adresse: [
        '',
        Validators.compose([Validators.required])
      ],
      tel: [
        '',
        Validators.compose([Validators.required, Validators.minLength(10)])
      ],
      horaires: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ],
      post_cod: [
        '',
        Validators.compose([Validators.required, Validators.minLength(5)])
      ],
      lat: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
      long: [
        '',
        Validators.compose([Validators.required, Validators.minLength(1)])
      ],
    });
  }

  selectPhoto() {
    this.camera.getPicture({
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      quality: 100,
      mediaType: this.camera.MediaType.PICTURE,
      encodingType: this.camera.EncodingType.PNG,
      targetHeight: 100,
      targetWidth: 100
    }).then(imageData => {
      this.myPhoto = imageData;
      if(this.myPhoto != null){
        this.image = "data:image/png;base64," + imageData;
        this.disabled = false;
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
      targetHeight: 100,
      targetWidth: 100

    }).then(imageData => {
      this.myPhoto = imageData;
      if(this.myPhoto != null){
        this.image = "data:image/png;base64," + imageData;
        this.disabled = false;
      }
    }, error => {
      console.log("ERROR -> " + JSON.stringify(error));
    });
  }

  deletePicture(){
    this.image = "";
    this.myPhoto = null;
    this.disabled = true;
  }

   addToFirebase() {
    this.myPhotosRef.child(this.generateUUID()).child('myPhoto.png')
      .putString(this.myPhoto, 'base64', { contentType: 'image/png' })
      .then((savedPicture) => {
        this.todo.imageSource = savedPicture.metadata.downloadURLs[0].toString();
        if(this.todo.imageSource != null && this.todo.nom != null){
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

  async logForm() {
    if (!this.addForm.valid) {
      console.log('Form is not valid');
    }
    else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      this.todo.nom = this.addForm.value.nom;
      this.todo.ville = this.addForm.value.ville;
      this.todo.adresse = this.addForm.value.adresse;
      this.todo.tel = this.addForm.value.tel;
      this.todo.horaires = this.addForm.value.horaires;
      this.todo.post_cod = this.addForm.value.post_cod;
      this.todo.lat = this.addForm.value.lat;
      this.todo.long = this.addForm.value.long;


      try{
        console.log(this.todo);
        await this.addToFirebase();

        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: 'Le Tabac a bien été ajouté',
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.setRoot(HomePage);
              }
            }
          ]
        });
        alert.present();

      } catch (error) {

        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{text: 'Ok', role: 'cancel'}]
        });
        alert.present();
      }
    }
  }
}
