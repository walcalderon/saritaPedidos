import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpModule} from '@angular/http' 
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { AccesoDatosProvider } from '../providers/acceso-datos/acceso-datos';
import { AdministradorPage } from '../pages/administrador/administrador';
import {ListadoClientesPage} from '../pages/listado-clientes/listado-clientes';
import {PedidosPage} from '../pages/pedidos/pedidos';
import {PedidosProductosPage} from '../pages/pedidos-productos/pedidos-productos';
import {PedidosCantidadPage} from '../pages/pedidos-cantidad/pedidos-cantidad';
import {ListadoPedidosPage} from '../pages/listado-pedidos/listado-pedidos';
import {EstadisticaPage} from '../pages/estadistica/estadistica';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AdministradorPage,
    ListadoClientesPage,
    PedidosPage,
    PedidosProductosPage,
    PedidosCantidadPage,
    ListadoPedidosPage,
    EstadisticaPage
  ],
  imports: [
    BrowserModule,
    HttpModule,     
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AdministradorPage,
    ListadoClientesPage,
    PedidosPage,
    PedidosProductosPage,
    PedidosCantidadPage,
    ListadoPedidosPage,
    EstadisticaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AccesoDatosProvider
  ]
})
export class AppModule {}
