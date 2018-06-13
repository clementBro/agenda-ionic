import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from "@ionic-native/camera";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Provider } from '../providers/provider/provider';
import {DetailsPage} from "../pages/details/details";
import {AjoutPage} from "../pages/ajout/ajout";
import {ModifierPage} from "../pages/modifier/modifier";
import { AuthProvider } from '../providers/auth/auth';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {HttpModule} from "@angular/http";


export const firebaseConfig = {
  apiKey: "AIzaSyBENvU1LmW5QK2yBL8cb92n2oxo9EjXNvs",
  authDomain: "barlyon-23ade.firebaseapp.com",
  databaseURL: "https://barlyon-23ade.firebaseio.com",
  projectId: "barlyon-23ade",
  storageBucket: "barlyon-23ade.appspot.com",
  messagingSenderId: "537768779702"
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
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    HttpModule,
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
    Provider,
    Camera,
    AuthProvider
  ]
})
export class AppModule {}
