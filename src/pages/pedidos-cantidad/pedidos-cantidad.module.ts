import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosCantidadPage } from './pedidos-cantidad';

@NgModule({
  declarations: [
    PedidosCantidadPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosCantidadPage),
  ],
})
export class PedidosCantidadPageModule {}
