import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite } from '@ionic-native/sqlite';
import { AccesoDatosProvider } from '../providers/acceso-datos/acceso-datos';

//import { AdministradorPage } from '../pages/administrador/administrador';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar,public  splashScreen: SplashScreen, public sqlite: SQLite,
  public accesoDatos:AccesoDatosProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.createDatabase();      
    });
  }//endConstructor
  private createDatabase(){
    this.sqlite.create({
      name: 'sarita_inventario.db',
      location: 'default' // the location field is required
    })
    .then((db) => {
      this.accesoDatos.setDatabase(db);
      return this.accesoDatos.createTable();
    })
    .then(() =>{
      this.splashScreen.hide();
      this.rootPage = 'HomePage';
    })
    .catch(error =>{
      console.error(error);
    });
  }//endCreateDatabase
}

