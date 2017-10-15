import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccesoDatosProvider} from '../../providers/acceso-datos/acceso-datos';
import { PedidosPage } from '../pedidos/pedidos';
/**
 * Generated class for the ListadoPedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-pedidos',
  templateUrl: 'listado-pedidos.html',
})
export class ListadoPedidosPage {
idCliente:any=null;
idVenta:any=null;
fecha:any=null;
total:any=null;
listadoPedidos:any[]=[];
nombreCliente:any;
NoHayPedidos:any="No hay pedidos para mostrar";
PriceList:any;
  constructor(public accesoDatos:AccesoDatosProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.idCliente=navParams.get('idCliente');
    this.nombreCliente=navParams.get("nombreCliente");
    this.PriceList=navParams.get("PriceList");
  }//endConstructor

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListadoPedidosPage');
    this.obtenerPedidos();
  }//end ionViewDidLoad
  //this.navCtrl.push(PedidosPage,{id:id,nombreCliente:nombreCliente,idVenta:0}); 
obtenerPedidos(){
this.accesoDatos.getVentasPorCliente(this.idCliente).then((res)=>{
  this.listadoPedidos = [];
  for(var i = 0; i < res.rows.length; i++){
    this.NoHayPedidos="";
    this.listadoPedidos.push({
     idVenta:res.rows.item(i).idVenta,
     fechaPedido:res.rows.item(i).fechaPedido,
    })
  } //endFor        
  },(err)=>{  alert('Error al intentar obtener ID BD'+err)  })

}//end obtenerPedidos
listarPedidos(idVenta){
  this.navCtrl.pop();  
  this.navCtrl.push(PedidosPage,{id:this.idCliente,nombreCliente:this.nombreCliente,idVenta:idVenta,PriceList:this.PriceList}); 
}//end Listar Pedidos
}