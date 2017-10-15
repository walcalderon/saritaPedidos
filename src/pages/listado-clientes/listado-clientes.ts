import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { AccesoDatosProvider} from '../../providers/acceso-datos/acceso-datos';
import { PedidosPage } from '../pedidos/pedidos';
import { ListadoPedidosPage } from '../listado-pedidos/listado-pedidos';
/**
 * Generated class for the ListadoClientesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listado-clientes',
  templateUrl: 'listado-clientes.html',
})
export class ListadoClientesPage {
  listadoClientes: any[] = [];
  //Agregada Para buscar
  listadoClientesO: any[] = [];
  listadoArticulos:any[]=[];
  listadoPrecios:any[]=[];
  dia:any= new Date().getUTCDate();
  mes=new Date().getMonth();
  anio=new Date().getFullYear();
  hora=new Date().getHours();
  minutos=new Date().getMinutes();
  cargando:any=0;
  fechaActual:any=this.dia+"/"+this.mes+"/"+this.anio+" "+this.hora+":"+this.minutos;

constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,  public accesoDatos:AccesoDatosProvider) {}

  ionViewDidLoad() {
    this.obtenerClientes();   
    console.log('ionViewDidLoad ListadoClientesPage');
    //this.obtenerArticulos();
    //this.obtenerListadoPrecios();
  }
  obtenerClientes(){
    this.cargando=1;
    this.accesoDatos.getClientesPorZona(localStorage.getItem("ruta")).then((res)=>{
      //this.mensaje("Obteniendo listado de clientes");
            //modificado se guardan en el arreglo "listadoClientesO"
      this.listadoClientesO = [];
     //alert("Total de clientes"+res.rows.length)
      for(var i = 0; i < res.rows.length; i++){
            this.listadoClientesO.push({
            CardName: res.rows.item(i).CardName, 
            CardCode: res.rows.item(i).CardCode, 
            City: res.rows.item(i).City,
            ListNum:res.rows.item(i).ListNum,
            SplCode:res.rows.item(i).SlpCode,
            n:i

          });
      }//end For
            //Modificado
      ///pasar el valor de listadoClientesO que se lleno con datos de base a listadoClientes que es lo que muestra
      this.listadoClientes=this.listadoClientesO;    
      this.cargando=0;
      },(err)=>{  alert('Error al intentar obtener BD'+err)  })
}//endObtenerUsuarios
//modificado 
//setea a lista original se llama desde la busqueda
cargarClientes2(){
  this.listadoClientes=this.listadoClientesO;
} 

getClientesIndividual(idCliente:any){
  this.accesoDatos.getClientesIndividual(idCliente).then((res)=>{
    this.listadoClientes = [];
    for(var i = 0; i < res.rows.length; i++){
        this.listadoClientes.push({
          CardName: res.rows.item(i).CardName, 
          CardCode: res.rows.item(i).CardCode, 
          City: res.rows.item(i).City, 
          ListNum:res.rows.item(i).ListNum 
        });
    }  
    },(err)=>{  alert('Error al intentar obtener BD'+err)  })
}//endObtenerUsuarios





buscarDatosListado(ev:any){
//modificado
this.cargarClientes2();
let val = ev.target.value; //ojo al let
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.listadoClientes = this.listadoClientes.filter((cliente) => {
          return (cliente.CardName.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
}//endFunction buscarDatosListado
public crearPedidos(id,nombreCliente,PriceList){
  let confirm = this.alertCtrl.create({
    title: 'Crear pedido',
    message: '¿Qué acción desea realizar?',
    buttons: [
      {
        text: 'Nuevo Pedido',
        handler: () => {
          this.crearPedidoEncabezado(id);
          //alert("Price List:"+PriceList)
          this.navCtrl.pop();    
          this.navCtrl.push(PedidosPage,{id:id,nombreCliente:nombreCliente,idVenta:0,PriceList:PriceList}); 
        }
      },
      {
        text: 'Editar Pedido',
        handler: () => {
          this.navCtrl.pop();    
          this.navCtrl.push(ListadoPedidosPage,{idCliente:id,nombreCliente:nombreCliente,PriceList:PriceList}); 
          
        }
      },
      {
        text: 'Cancelar',
        handler: () => {
          console.log('Cancelado');
        }
      }
    ]
  });
  confirm.present();
  
}//end crearPedidos

crearPedidoEncabezado(id){
  let variable:any = this.accesoDatos.nuevaVentaEncabezado(localStorage.getItem('usuario'),id,this.fechaActual,1);
  if(variable){
  console.log("Se creó un nuevo pedido");
  }
  else{
    alert("Ha ocurrido algo inesperado. Intenta nuevamente");
  }
}//endCrear Encebazado
mensaje(mensaje:string){
  let loaderActualizar = this.loadingCtrl.create({
    content: mensaje,
    duration: 3000
  });
  loaderActualizar.present();
}//endMensaje
}//endClass export
