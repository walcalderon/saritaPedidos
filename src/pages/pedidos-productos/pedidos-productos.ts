import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AccesoDatosProvider} from '../../providers/acceso-datos/acceso-datos';
import { PedidosCantidadPage } from '../pedidos-cantidad/pedidos-cantidad';
/**
 * Generated class for the PedidosProductosPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pedidos-productos',
  templateUrl: 'pedidos-productos.html',
})
export class PedidosProductosPage {
  listadoPrecios:any[]=[];
    //Agregada
  listadoPreciosO: any[] = [];
  precios:any[];
  idCliente:any=null;
  idVenta:any;
  nombreCliente:any;
  PriceList=0;
  cargando=0;
  NumInBuy=0;
  BuyUnitMsr:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public accesoDatos:AccesoDatosProvider) {
    this.idCliente=navParams.get('id');
    this.idVenta=navParams.get('idVenta');
    this.nombreCliente=navParams.get('nombreCliente');
    this.PriceList=navParams.get("PriceList");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PedidosProductosPage');
    this.obtenerListadoPrecios();
  }//end ionViewDidLoad
  obtenerListadoPrecios(){
    this.cargando=1;
    this.accesoDatos.getListaDePrecios(this.idCliente,this.PriceList).then((res)=>{
    //this.accesoDatos.getListado().then((res)=>{
      this.listadoPreciosO = [];         
      //alert(res.rows.length);
      for(var i = 0; i < res.rows.length; i++){
            let precio:any;
            let precioGuardar:any;
            if(Number.isNaN(parseFloat(res.rows.item(i).precioEspecial))==false){
              precio=res.rows.item(i).precioEspecial*res.rows.item(i).NumInBuy;
              precioGuardar=res.rows.item(i).precioEspecial;
            }            
            else{
              precio=res.rows.item(i).Price*res.rows.item(i).NumInBuy;
              precioGuardar=res.rows.item(i).Price;
            }
            
            this.listadoPreciosO.push({
            ItemCode: res.rows.item(i).ItemCode, 
            PriceList: res.rows.item(i).PriceList,
            ItemName: res.rows.item(i).ItemName,
            Price:parseFloat(precio).toFixed(2),
            precioEspecial1:parseFloat(res.rows.item(i).Price).toFixed(2),
            precioEspecial2:parseFloat(res.rows.item(i).precioEspecial).toFixed(2),
            precioGuardar:precioGuardar,
            NumInBuy:res.rows.item(i).NumInBuy,
            BuyUnitMsr:res.rows.item(i).BuyUnitMsr,
          });
        }         
        this.listadoPrecios=this.listadoPreciosO;           
      })
      .then(data=>{
        this.cargando=0;
      })
      .catch(error =>{
        alert("Ha ocurrido algo inesperado"+error);
      })
  }//endObtenerListadoPrecios 
  
//modificado 
//setea a lista original se llama desde la busqueda
cargarPrecios(){
  this.listadoPrecios=this.listadoPreciosO;
} 

buscarDatosListado(ev:any){
  //modificado
  this.cargarPrecios();
  let val = ev.target.value; //ojo al let
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.listadoPrecios= this.listadoPrecios.filter((productos) => {
          return (productos.ItemName.toLowerCase().indexOf(val.toLowerCase()) > -1);
          
        })
      }
}//endFunction buscarDatosListado

  seleccionarCantidad(id,producto,precio,precioGuardar,NumInBuy,BuyUnitMsr){
    this.navCtrl.pop();  
    this.navCtrl.push(PedidosCantidadPage,{precioGuardar:precioGuardar,idCliente:this.idCliente,id:id,producto:producto,precio:precio,nombreCliente:this.nombreCliente,idVenta:this.idVenta,PriceList:this.PriceList,NumInBuy:NumInBuy,BuyUnitMsr:BuyUnitMsr}); 
    
  }//end SeleccionarCantidad
}
