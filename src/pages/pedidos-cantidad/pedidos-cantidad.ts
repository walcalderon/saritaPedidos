import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidosPage } from '../pedidos/pedidos';
import { AccesoDatosProvider} from "../../providers/acceso-datos/acceso-datos";


/**
 * Generated class for the PedidosCantidadPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-cantidad',
  templateUrl: 'pedidos-cantidad.html',
})
export class PedidosCantidadPage {
idProducto:any;
producto:any;
precio:any;
nombreCliente:any;
idVenta:any;
idCliente:any;
cantidad:number=0;
PriceList:any;
NumInBuy:any;
BuyUnitMsr:any;
precioGuardar:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public accesoDatos:AccesoDatosProvider) {
    this.idProducto=navParams.get('id');
    this.producto=navParams.get("producto");
    this.precio=navParams.get("precio");
    this.nombreCliente=navParams.get('nombreCliente');
    this.idVenta=navParams.get('idVenta');
    this.idCliente=navParams.get("idCliente");
    this.PriceList=navParams.get("PriceList");
    this.precioGuardar=navParams.get("precioGuardar");
    this.NumInBuy=navParams.get("NumInBuy");
    this.BuyUnitMsr=navParams.get("BuyUnitMsr");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosCantidadPage');
  }
  guardar(){
    
    if(this.cantidad<1)
      alert("La cantidad debe ser un número mayor");
    else{
    this.accesoDatos.guardarLineaPedido(localStorage.getItem('usuario'),this.idVenta,this.idProducto,this.cantidad,this.precio,this.producto,this.precioGuardar,this.NumInBuy,this.BuyUnitMsr)  
    this.navCtrl.pop();    
    this.navCtrl.push(PedidosPage,{id:this.idCliente,nombreCliente:this.nombreCliente,idVenta:this.idVenta,PriceList:this.PriceList}); 
    }//endElse
  }//endGuardar
  cancelar(){
    this.navCtrl.pop();    
    this.navCtrl.push(PedidosPage,{id:this.idCliente,nombreCliente:this.nombreCliente,idVenta:this.idVenta,PriceList:this.PriceList}); 
    }//end Cancelar
  
}
