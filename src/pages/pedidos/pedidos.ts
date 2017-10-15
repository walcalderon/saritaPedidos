import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AccesoDatosProvider} from '../../providers/acceso-datos/acceso-datos';
import {PedidosProductosPage } from '../pedidos-productos/pedidos-productos';
import {AdministradorPage } from '../administrador/administrador';

/**
 * Generated class for the PedidosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {
idCliente=null;
nombreCliente=null;
listadoProductos:any[]=[];

//Datos a mostrar del encabezado de la venta
idVenta:any=0;
usuario:any="USER";
CardCode:any="CardCode";
fecha_pedido:any="FECHA";
totalPedido:number=0;
PriceList=0;

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams, public accesoDatos:AccesoDatosProvider) {
    this.idCliente=navParams.get('id');
    this.nombreCliente=navParams.get('nombreCliente');
    this.idVenta=navParams.get('idVenta');
    this.PriceList=navParams.get("PriceList");
  }

  ionViewDidLoad() {
if(this.idVenta==0)    
this.obtenerIdVenta();
else{
  this.obtenerIdVentaEncabezado(this.idVenta)
  this.obtenerLineasVenta(this.idVenta);
}

 }//endIonViewDidLoad  

obtenerIdVenta(){  
  this.accesoDatos.getUltimoId().then((res)=>{
    for(var i = 0; i < res.rows.length; i++){
       this.idVenta= res.rows.item(i).idVenta;
       this.usuario= res.rows.item(i).usuario;
       this.CardCode= res.rows.item(i).CardCode;
       this.fecha_pedido= res.rows.item(i).fechaPedido;
    } //endFor        
    },(err)=>{  alert('Error al intentar obtener ID BD'+err)  })
}//end OntenerIdVenta

obtenerIdVentaEncabezado(idVenta){  
  this.accesoDatos.getEncabezadoVenta(idVenta).then((res)=>{
    for(var i = 0; i < res.rows.length; i++){
       this.idVenta= res.rows.item(i).idVenta;
       this.usuario= res.rows.item(i).usuario;
       this.CardCode= res.rows.item(i).CardCode;
       this.fecha_pedido= res.rows.item(i).fechaPedido;       
    } //endFor        
    },(err)=>{  alert('Error al intentar obtener BD'+err)  })
}//end OntenerIdVenta
obtenerLineasVenta(idVenta){  
  this.totalPedido=0;
  this.accesoDatos.getLineasVenta(idVenta).then((res)=>{
    this.listadoProductos = [];    
    for(var i = 0; i < res.rows.length; i++){
      let total:number=res.rows.item(i).precio*res.rows.item(i).cantidad;
      this.listadoProductos.push({
      ItemCode:res.rows.item(i).ItemCode,   
      ItemName:res.rows.item(i).ItemName, 
      precio:res.rows.item(i).precio, 
      cantidad:res.rows.item(i).cantidad,
      total:total.toFixed(2),
      idventadetalle:res.rows.item(i).idventadetalle,
    })//endPush
    this.totalPedido+=total;
  } //endFor        
    },(err)=>{  alert('Error al intentar obtener detalle BD'+err) })
}//end OntenerIdVenta

agregarProducto(){
  //let modal = this.modalCtrl.create(PedidosProductosPage,{id:this.idCliente,idVenta:this.idVenta,nombreCliente:this.nombreCliente,PriceList:this.PriceList});
  this.navCtrl.pop();  
  this.navCtrl.push(PedidosProductosPage,{id:this.idCliente,idVenta:this.idVenta,nombreCliente:this.nombreCliente,PriceList:this.PriceList});
}//end Agregar Productos
nuevoPedido(){
  this.navCtrl.pop();  
  this.navCtrl.push(AdministradorPage);
}//Nuevo Pedido
quitarFila(fila){
  let confirm = this.alertCtrl.create({
    title: 'Quitar línea de pedido',
    message: 'Realmente desea quitar esta linea',
    buttons: [
      {
        text: 'Sí',
        handler: () => {
          this.accesoDatos.quitarLineasVenta(fila)
          .then(data =>{
            this.obtenerLineasVenta(this.idVenta)
          });
        }
      },
      {
        text: 'No',
        handler: () => {
          console.log('No pasa nada');
        }
      }
    ]
  });
  confirm.present();
}//EndQuitar Filar
}
