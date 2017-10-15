import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListadoClientesPage } from './listado-clientes';

@NgModule({
  declarations: [
    ListadoClientesPage,
  ],
  imports: [
    IonicPageModule.forChild(ListadoClientesPage),
  ],
})
export class ListadoClientesPageModule {}
