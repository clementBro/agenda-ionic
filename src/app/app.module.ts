import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { Provider } from '../providers/provider/provider';
import {DetailsPage} from "../pages/details/details";
import {AjoutPage} from "../pages/ajout/ajout";
import {ModifierPage} from "../pages/modifier/modifier";

export const firebaseConfig = {
  apiKey: "AIzaSyDjEpUE_b2vQjeoCIw5eapsGTF3Ula0xP8",
  authDomain: "agenda-44dae.firebaseapp.com",
  databaseURL: "https://agenda-44dae.firebaseio.com",
  projectId: "agenda-44dae",
  storageBucket: "agenda-44dae.appspot.com",
  messagingSenderId: "508577587501"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage,
    AjoutPage,
    ModifierPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
	AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage,
    AjoutPage,
    ModifierPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Provider
  ]
})
export class AppModule {}
