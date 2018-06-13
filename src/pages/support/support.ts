import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Http, RequestOptions} from "@angular/http";
import {HomePage} from "../home/home";



/**
 * Generated class for the SupportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-support',
  templateUrl: 'support.html',
})
export class SupportPage {
  public supportForm: FormGroup;
  public message_support = null;
  constructor(private http: Http,public loadingCtrl: LoadingController, public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,formBuilder: FormBuilder) {
    this.supportForm = formBuilder.group({
      problem: [
        '',
        Validators.compose([Validators.required])
      ],
      textprob: [
        '',
        Validators.compose([Validators.required])
      ],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupportPage');
  }
  async sendForm() {
    const loading: Loading = this.loadingCtrl.create();
    loading.present();
    let data = {
      problem: this.supportForm.value.problem,
      textprob: this.supportForm.value.textprob
    };
    this.http.post('http://localhost:8080/contact', data).subscribe(async response => {

      if (response['_body'] != null) {
        this.message_support = response['_body'];
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: response['_body'],
          buttons: [
            {text: 'Cancel', role: 'cancel'},
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.setRoot(HomePage);
              }
            }
          ]
        });
        alert.present();
      }
    });
  }
}
