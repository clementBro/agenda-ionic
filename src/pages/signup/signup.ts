import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/emailValidator";
import {HomePage} from "../home/home";

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder) {
    this.signupForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }
  async signupUser(): Promise<void> {
    if (!this.signupForm.valid) {
      console.log('Form is not valid');
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.signupForm.value.email;
      const password = this.signupForm.value.password;

      try {
        await this.authProvider.signupUser(
          email,
          password
        );
        await loading.dismiss();
        this.navCtrl.setRoot(HomePage);
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
