import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { EmailValidator } from '../../validators/emailValidator';
import {HomePage} from "../home/home";
import * as firebase from "firebase";


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authProvider: AuthProvider, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
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
    console.log('ionViewDidLoad LoginPage');
  }

  goToSignup(): void {
    this.navCtrl.push('SignupPage');
  }
  goToResetPassword(): void {
    this.navCtrl.push('ResetPasswordPage');
  }
  async loginUser(): Promise<void> {
    if (!this.loginForm.valid) {
      console.log('Form is not valid');
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      try {
        const loginUser: firebase.User = await this.authProvider.loginUser(
          email,
          password
        );
        await loading.dismiss();
        this.navCtrl.setRoot(HomePage);
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    }
  }

}
