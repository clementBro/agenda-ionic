import { Component } from '@angular/core';
import {Alert, AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AuthProvider} from "../../providers/auth/auth";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmailValidator} from "../../validators/emailValidator";

/**
 * Generated class for the ResetPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              public authProvider: AuthProvider,
              formBuilder: FormBuilder) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResetPasswordPage');
  }
  async resetPassword(): Promise<void> {
    if (!this.resetPasswordForm.valid) {
      console.log('Form is not valid');
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const email = this.resetPasswordForm.value.email;

      try {
        const loginUser: void = await this.authProvider.resetPassword(email);
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: 'Un email a été envoyé sur votre adresse: ' + email,
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              handler: data => {
                this.navCtrl.pop();
              }
            }
          ]
        });
        alert.present();
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'Annuler' }]
        });
        alert.present();
      }
    }
  }
}
