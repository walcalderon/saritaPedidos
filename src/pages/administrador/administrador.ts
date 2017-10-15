import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,Platform  } from 'ionic-angular';
import { AccesoDatosProvider} from '../../providers/acceso-datos/acceso-datos';
import { ListadoClientesPage } from '../listado-clientes/listado-clientes';
import { EstadisticaPage } from '../estadistica/estadistica';
declare var navigator: any;
declare var Connection: any;
@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {
  listadoClientes:any[];
  clientesExternos: any[] = [];
  rutasExternos: any[] = [];
  articulosExternos: any[] = [];
  listadoExternos: any[] = [];
  preciosExternos:any[]=[];
  datos:any;
  datosEnviar:any;
  datosLineas:any;
  clientesProcesados:any;
  clientesListNum:any;
  precios:any;
  cargando:number=0;
  estadoRed:any;
constructor(public platform: Platform,public accesoDatos:AccesoDatosProvider, public navCtrl: NavController, public navParams: NavParams,public loadingCtrl: LoadingController) {}

ionViewDidLoad() {
    //this.obtenerClientes();
    console.log('ionViewDidLoad AdministradorPage');
   this.tipoConexion();
  }
tipoConexion() {
  this.platform.ready().then(() => {
      var networkState = navigator.connection.type;
      var states = {};
      states[Connection.UNKNOWN]  = 'Tipo de conexión no identificada';
      states[Connection.ETHERNET] = 'Tipo de conexión: Ethernet';
      states[Connection.WIFI]     = 'Tipo de conexión: Wifi';
      states[Connection.CELL_2G]  = 'Tipo de conexión: 2G';
      states[Connection.CELL_3G]  = 'Tipo de conexión: 3G';
      states[Connection.CELL_4G]  = 'Tipo de conexión: 4G';
      states[Connection.CELL]     = 'Tipo de conexión: EDGE';
      states[Connection.NONE]     = 'Conexión a Internet no detectada';      
      this.estadoRed=states[networkState];
  });
      
}//endTipoConexion

cargarDatosClientes(){
  this.clientesProcesados="Obteniendo datos externos";
  this.cargando=1;
  this.clientesListNum="Actualizando clientes... Este proceso puede demorar un par de minutos";
    let variable:any;
    this.accesoDatos.cargarDatosClientes()    
    //se conecta al metodo del servicio accesoDatos para extraer los datos externos
    .then(data => {      
      this.accesoDatos.vaciarClientes();
      this.rutasExternos = data.results;
    })
    //miCodigo
    .then(data=>{
      //this.mensaje("Actualizando datos locales");
      this.clientesProcesados="Actualizando datos locales";
      let n:number=0;
      for(let datos of this.rutasExternos){
        variable = this.accesoDatos.agregarRutasWebService(datos.CardCode);
        n++;
        } //endFor
                
    })//endThen
    .then(data=>{
      if(variable){
        //this.clientesProcesados="Procesado";
        //this.obtenerClientes();    
        this.clientesListNum="Se han cargado los Almacenes";
        this.cargando=0;
      }
      else
         alert("Algo ha salido mal. Intenta de nuevo");
      })     
    //finMicodigo
    .catch(error =>{
      alert("Error:"+error);
    })
}//endCargarDatos

////codigo WAC

cargarDatosRutas(){
  this.clientesProcesados="Obteniendo datos externos";
  this.cargando=1;
  this.clientesListNum="Actualizando Rutas... Este proceso puede demorar un par de minutos";
    let variable:any;
    this.accesoDatos.cargarDatosRutas()    
    //se conecta al metodo del servicio accesoDatos para extraer los datos externos
    .then(data => {      
      this.accesoDatos.vaciarRutas();
      this.clientesExternos = data.results;
    })
    //miCodigo
    .then(data=>{
      //this.mensaje("Actualizando datos locales");
      this.clientesProcesados="Actualizando datos locales";
      let n:number=0;
      for(let datos of this.clientesExternos){
        variable = this.accesoDatos.agregarClienteWebService(datos.CardCode);
        //let grupo=Math.floor(Math.random() * (3 - 1) + 1); //Generando por esta vez valores aleatorios para el grupo (creo q es la zona)
       // console.log(grupo);
        //n,datos.name.first,grupo,datos.location.street,grupo
        //CardCode:number, CardName:string, GroupCode:number,Address:string,ListNum:number
        //variable = this.accesoDatos.agregarClienteWebService(datos.CardCode,datos.CardName,datos.GroupCode,datos.Address,datos.ListNum,datos.SlpCode,datos.U_Dia);
        n++;
        } //endFor
                
    })//endThen
    .then(data=>{
      if(variable){
        //this.clientesProcesados="Procesado";
        //this.obtenerClientes();    
        this.clientesListNum="Se han cargado los clientes";
        this.cargando=0;
      }
      else
         alert("Algo ha salido mal. Intenta de nuevo");
      })     
    //finMicodigo
    .catch(error =>{
      alert("Error:"+error);
    })
}//endCargarDatos

///fin codigo WAC

///
cargarDatosArticulos(){
  this.clientesListNum="Actualizando productos... Este proceso puede demorar un par de minutos";
  this.cargando=1;
    let variable:any;    
    this.accesoDatos.cargarDatosArticulos()    
    //se conecta al metodo del servicio accesoDatos para extraer los datos externos
    .then(data => {      
      this.articulosExternos = data.results;
      this.accesoDatos.vaciarArticulos();
    })
    //miCodigo
    .then(data=>{      
      let n:number=0;
      for(let datos of this.articulosExternos){    
        //variable = this.accesoDatos.agregarClienteWebService();
        //ItemCode: number, ItemName: string, BuyUnitMsr: string,NumInBuy:number
        variable = this.accesoDatos.agregarArticulosWebService(datos.CardCode);
        n++;
        } //endFor
    })//endThen
    .then(data=>{
      if(variable){
        this.clientesListNum="Productos actualizados";
        this.cargando=0;
      }
      else
         alert("Algo ha salido mal. Intenta de nuevo");
      })     
    //finMicodigo
    .catch(error =>{
      alert(error);
    })
}//endCargarDatosArticulos
///

cargarDatosListado(){ //Para actualizar el listado de precios
  this.clientesListNum="Actualizando lista de precios... Este proceso puede demorar un par de minutos";
  this.cargando=1;
    let variable:any;
    this.accesoDatos.cargarDatosListado()
    //se conecta al metodo del servicio accesoDatos para extraer los datos externos
    .then(data => {      
      this.listadoExternos = data.results;
      this.accesoDatos.vaciarListado();
    })
    //miCodigo
    .then(data=>{
      //this.mensaje("Actualizando listado de precios");
      let n:number=0;
      for(let datos of this.listadoExternos){        
        //let ItemCode=Math.floor(Math.random() * (5 - 0) + 1); //Generando Precios al azar
        //let CardCode=Math.floor(Math.random() * (5 - 1) + 1); //Generando id de cliente
        //let precio=Math.random() * (20 - 1) + 1; //Generando Precios al azar
        //let descuento=Math.floor(Math.random() * (20 - 1) + 1); //Generando descuento
        //console.log(datos.name.last);
        //ItemCode:any,CardCode:any,price:any,Discount:any,ListNum:any
        variable = this.accesoDatos.agregarListadoWebService(datos.CardCode);
        n++;
        } //endFor
    })//endThen
    .then(data=>{
      if(variable){
        this.clientesListNum="Lista de precios actualizada";
        this.cargando=0;
       // this.obtenerClientes();    
       //this.cargarPreciosEspeciales();
      }
      else
         alert("Algo ha salido mal. Intenta de nuevo");
      })     
    //finMicodigo
    .catch(error =>{
      alert(error);
    })
}//endCargarListado (de precios)
cargarPreciosEspeciales(){
  this.clientesListNum="Actualizando precios especiales...Este proceso puede demorar un par de minutos"
  this.cargando=1;
    let variable:any;
    this.accesoDatos.cargarDatosPreciosEspeciales()
    //se conecta al metodo del servicio accesoDatos para extraer los datos externos
    .then(data => {  
      this.accesoDatos.vaciarPreciosEspeciales();    
      this.preciosExternos = data.results;
      
    })
    //miCodigo
    .then(data=>{      
      for(let datos of this.preciosExternos){    
        //this.precios="Precios Procesados";
        variable = this.accesoDatos.agregarPreciosEspecialesWebService(datos.CardCode);       
        } //endFor
    })//endThen
    .then(data=>{
      if(variable){
        this.clientesListNum="Catálogo de Precios actualizada";
        this.cargando=0;
      }
      else
         alert("Algo ha salido mal. Intenta de nuevo");
      })     
    //finMicodigo
    .catch(error =>{
      alert(error);
    })
}//endCargarPreciosEspeciales
obtenerClientes(){
  //this.mensaje("Obteniendo listado de clientes");
    this.accesoDatos.getClientesPorZona(localStorage.getItem("ruta")).then((res)=>{
      this.listadoClientes = [];
      for(var i = 0; i < res.rows.length; i++){
          this.listadoClientes.push({
            nombre_cliente: res.rows.item(i).CardName, 
            grupo_clientes: res.rows.item(i).GroupCode, 
            id_clientes: res.rows.item(i).CardCode, 
          });
      }  
      },(err)=>{  alert('Error al intentar obtener BD'+err)  })
}//endObtenerClientes

borrarClientes(){
//Método para limpiar la tabla, antes de la importacion
let variable:any = this.accesoDatos.vaciarClientes();
if(variable)
  alert("BD Limpia")
else
alert("error inesperado. Intente nuevamente");
this.obtenerClientes();  
}//endBorrarClientes

hacerPedidos(){
  //this.navCtrl.pop();  
  this.navCtrl.push(ListadoClientesPage);  
}//end Hacer Pedidos
cargarDatos(){
  this.navCtrl.push(EstadisticaPage);    
}
obtenerVentas(){
this.accesoDatos.getVentas()
.then((data)=>{
  this.clientesListNum="Preparando datos";
  this.datos ="";
  //idVenta usuario  CardCode fechaPedido fechaEntrega estado 
  for(var i = 0; i < data.rows.length; i++){
    //this.datos+="{\"idVenta\":"+data.rows.item(i).idVenta+",\"ItemCode\":\""+data.rows.item(i).ItemCode+"\"},";
    this.datos+="{\"CardCode\":\""+data.rows.item(i).CardCode+"\",\"CardName\":\""+data.rows.item(i).CardName+"\",\"ruta\":\""+data.rows.item(i).usuario+"\",\"ItemCode\":\""+data.rows.item(i).ItemCode+"\",\"Descripcion\":\""+data.rows.item(i).ItemName+"\",\"SlpCode\":\""+data.rows.item(i).SlpCode+"\",\"almacen\":\""+data.rows.item(i).WhsCode+"\",\"Precio\":\""+data.rows.item(i).precio+"\",\"Cantidad\":\""+data.rows.item(i).cantidad+"\",\"City\":\""+data.rows.item(i).City+"\",\"ListNum\":\""+data.rows.item(i).ListNum+"\",\"BuyUnitMsr\":\""+data.rows.item(i).BuyUnitMsr+"\",\"PrecioReal\":\""+data.rows.item(i).precioGuardar+"\",\"NumInBuy\":\""+data.rows.item(i).NumInBuy+"\"},";
    
  }//endFor
})
.then((data)=>{
  //alert("Datos a enviar"+this.datos);
  ////////////////////
  
  this.clientesListNum="Enviando";
  this.accesoDatos.enviar(this.datos);
})
.catch((err)=>alert("Error con la Base de Datos"+err.toSource()));
this.clientesListNum="Se han enviado los datos rest";
}//obtenerVentas
///Funcion para mostrar mensaje al estar cargando algo
mensaje(mensaje:string){
  let loaderActualizar = this.loadingCtrl.create({
    content: mensaje,
    duration: 3000
  });
  loaderActualizar.present();
}//endMensaje
cargar(){
  this.accesoDatos.enviar("{\"nombre\":\"Juan Perez\"}");  
}
}//endClass export

/* ESTRUCTURA FOR
for(let datos of this.clientesExternos){
  let grupo=Math.random() * (1 - 3) + 1; //Generando por esta vez valores aleatorios para el grupo (creo q es la zona)
   this.agregarCliente(datos.name.first,datos.email); } //endFor

*/