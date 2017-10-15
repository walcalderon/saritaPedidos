import { NgModule } from '@angular/core';
import { IonicPageModule, LoadingController } from 'ionic-angular';
import { AdministradorPage } from './administrador';
//import {HomePage} from '../home/home';

@NgModule({
  declarations: [
    AdministradorPage,
  ],
  imports: [
    IonicPageModule.forChild(AdministradorPage),
  ],
})
export class AdministradorPageModule {
constructor(public loadingCtrl: LoadingController) {}

}//endClass export
