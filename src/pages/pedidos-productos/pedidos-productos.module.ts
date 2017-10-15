import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PedidosProductosPage } from './pedidos-productos';

@NgModule({
  declarations: [
    PedidosProductosPage,
  ],
  imports: [
    IonicPageModule.forChild(PedidosProductosPage),
  ],
})
export class PedidosProductosPageModule {}
