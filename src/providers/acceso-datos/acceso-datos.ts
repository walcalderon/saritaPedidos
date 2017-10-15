import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
        
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the AccesoDatosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AccesoDatosProvider {
  db: SQLiteObject = null;
  constructor(public http: Http ) {
    this.http=http;
  }//endContructor
  setDatabase(db: SQLiteObject){
    if(this.db === null){
      this.db = db;
    }
  }//endSetDatabaseb
  createTable(){
    
    //if (localStorage.getItem("appInstall")!="true"){
     // alert("Creando BD");
    let sql = 'CREATE TABLE IF NOT EXISTS usuarios(id INTEGER PRIMARY KEY AUTOINCREMENT, user TEXT,pass TEXT,ruta INTEGER)';
    let usuario="INSERT INTO usuarios (user, pass,ruta) VALUES (?,?,?)";   
    let usuarios="INSERT INTO usuarios (user, pass,ruta) VALUES ('ruta1','sarita',1),('ruta2','sarita',2),('ruta3','sarita',3),('ruta4','sarita',4),('ruta5','sarita',5),('ruta6','sarita',6),('ruta8','sarita',8),('ruta9','sarita',9),('ruta10','sarita',10)";   
    let clientes="CREATE TABLE IF NOT EXISTS clientes (id_cliente INTEGER PRIMARY KEY AUTOINCREMENT,nombre_cliente TEXT,direccion_cliente TEXT)";
    let ITM1="CREATE TABLE IF NOT EXISTS itm1(ItemCode TEXT, PriceList TEXT, Price REAL, ListName TEXT)";
    let OITM="CREATE TABLE IF NOT EXISTS oitm(ItemCode TEXT, ItemName TEXT,BuyUnitMsr TEXT, NumInBuy INTEGER)";
    let OITW="CREATE TABLE IF NOT EXISTS oitw(ItemCode TEXT, WhsCode TEXT, OnHand TEXT)";
    let OWHS="CREATE TABLE IF NOT EXISTS owhs(WhsCode TEXT, WhsName TEXT, U_RUTA TEXT)";
    let OSLP="CREATE TABLE IF NOT EXISTS oslp(SlpCode TEXT, SlpName TEXT, U_Distri TEXT)";
                                            //CardCode,      CardName,     GroupCode,      Address,       ListNum,      SlpCode,      City,      County,      Country,     U_Dia
    let OCRD="CREATE TABLE IF NOT EXISTS ocrd(CardCode TEXT, CardName TEXT, GroupCode TEXT, Address TEXT, ListNum TEXT, SlpCode TEXT, City TEXT, County TEXT, Country TEXT, U_Dia TEXT)";
    let OSPP="CREATE TABLE IF NOT EXISTS ospp(ItemCode TEXT, CardCode TEXT, Price TEXT, Discount TEXT, ListNum TEXT)";
    let OPLN="CREATE TABLE IF NOT EXISTS opln(ListNum TEXT,ListName TEXT)";                                                                                                         
    let ORDEN_VENTA="CREATE TABLE IF NOT EXISTS ordenventa(idVenta INTEGER PRIMARY KEY AUTOINCREMENT, usuario TEXT, CardCode TEXT, fechaPedido TEXT, fechaEntrega TEXT, estado TEXT)";//0=pedido creado
    let ORDEN_VENTA_DETALLE="CREATE TABLE IF NOT EXISTS ordenventadetalle(idventadetalle INTEGER PRIMARY KEY AUTOINCREMENT,usuario TEXT, idVenta INTEGER, ItemCode TEXT, ItemName TEXT, cantidad TEXT, precio REAL, precioGuardar REAL, NumInBuy REAL, BuyUnitMsr TEXT)";
    console.log(1);
    return this.db.executeSql(sql, []) //; antes era hasta aqui, pero a la promesa le hago otra llamada para crear la siguiente tabla cuando la primera este lista
    .then(()=>{
      console.log(2);
    return this.db.executeSql(usuario,['admin','admin',17])}) //42 es SlplCode
    .then(()=>{
      console.log(2.1);
    return this.db.executeSql(usuario,['root','root',18])})
    .then(()=>{
      console.log(3);
      return this.db.executeSql(usuarios,[])})
      .then(()=>{
        console.log(3.1);
      return this.db.executeSql(clientes,[])})//1
     .then(()=>{
      console.log(4);
      return this.db.executeSql(ITM1,[])}) 
      .then(()=>{
        console.log(5);
      return this.db.executeSql(OITM,[])}) 
      .then(()=>{
        console.log(6);
        return this.db.executeSql(OITW,[])}) 
        .then(()=>{
          console.log(7);
          return this.db.executeSql(OWHS,[])}) 
          .then(()=>{
            console.log(8);
            return this.db.executeSql(OSLP,[])}) 
            .then(()=>{
              console.log(9);
              return this.db.executeSql(OCRD,[])}) 
              .then(()=>{
                console.log(10);
                return this.db.executeSql(OSPP,[])}) 
                .then(()=>{
                  console.log(11);
                  return this.db.executeSql(OPLN,[])}) 
                  .then(()=>{
                    console.log(12);
                    return this.db.executeSql(ORDEN_VENTA,[])}) 
                    .then(()=>{
                      console.log(13);
                      return this.db.executeSql(ORDEN_VENTA_DETALLE,[])}) 
    .catch((err)=>alert("Error con la Base de Datos"+err.toSource()));
//}//endIf
//else{
  //alert("no se creo");
//}
  }//en crearTable

public getUsuarios(){
    let sql = "SELECT * FROM usuarios";
    return this.db.executeSql(sql,{});
}//endgetUsuarios


  public verificarLogin(user:string, pass:string){
    let sql = "SELECT * FROM usuarios where user=? AND pass=?";
    return this.db.executeSql(sql,[user, pass]);
  }//endgetUsuarios
  create(user:string, pass:string){
    let sql = 'INSERT INTO usuarios(user, pass) VALUES(?,?)';
    return this.db.executeSql(sql, [user, pass]); 
  }

 delete(task: any){
    let sql = 'DELETE FROM usuarios WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }
////////////////////////MÉTODOS PARA LA IMPORTACIÓN 
vaciarClientes(){
  //VACUUM ELIMINA ESPACIO NO USADO DESPUES DE BORRAR LA TABLA (ESTOS DOS COMANDOS DELETE Y VACUUM HACEN TRUNCATE A LA TABLA)
  let sql = 'DELETE FROM ocrd';
  return this.db.executeSql(sql, [])
  .then(()=>{
    return this.db.executeSql("VACUUM",[])
  }).catch((err)=>alert("al vaciar la BD, intente de nuevo"+err));
}//endVaciarClientes

vaciarRutas(){
  //VACUUM ELIMINA ESPACIO NO USADO DESPUES DE BORRAR LA TABLA (ESTOS DOS COMANDOS DELETE Y VACUUM HACEN TRUNCATE A LA TABLA)
  let sql = 'DELETE FROM owhs';
  return this.db.executeSql(sql, [])
  .then(()=>{
    return this.db.executeSql("VACUUM",[])
  }).catch((err)=>alert("al vaciar la BD, intente de nuevo"+err));
}//endVaciarRutas

agregarCliente(nombreCliente:string, direccionCliente:string){
  let sql = 'INSERT INTO clientes(nombre_cliente,direccion_cliente) VALUES(?,?)';
  return this.db.executeSql(sql, [nombreCliente, direccionCliente]); 
}//end agregarCliente

cargarDatos(){
    return this.http.get('https://randomuser.me/api/?results=5') //aqui leer el webservice del servidor SQL de SARITA
    .map(res => res.json())
    .toPromise();
}//cargarDatos
///////// CLIENTEs tabla OCRC
cargarDatosClientes(){
  return this.http.get('http://kmlaccessories.com/test/testdata.php?t=XX') //aqui leer el webservice del servidor SQL de SARITA
  .map(res => res.json())
  .toPromise();
}//cargarDatos
///cargar Rutas-Almacenes
cargarDatosRutas(){
  return this.http.get('http://kmlaccessories.com/test/testdata.php?t=A') //aqui leer el webservice del servidor SQL de SARITA
  .map(res => res.json())
  .toPromise();
}//Rutas-Almacenes

//agregarClienteWebService(CardCode:number, CardName:string, GroupCode:number,Address:string,ListNum:number,SlpCode,U_Dia){
agregarClienteWebService(sqlString){
  //let sql = 'INSERT INTO ocrd(CardCode,CardName,GroupCode,Address,ListNum,SlpCode,U_Dia) VALUES(?,?,?,?,?,?,?)';
  //let sql = 'INSERT INTO ocrd('+sqlString+')';
 // return this.db.executeSql(sql, [CardCode,CardName,GroupCode,Address,ListNum,SlpCode,U_Dia]); 
 return this.db.executeSql(sqlString, []); 
}//end agregarCliente

//Agregar Rutas
agregarRutasWebService(sqlString){
 return this.db.executeSql(sqlString, []); 
}

public getClientesPorZona(zona:any){ //
 // let sql = "SELECT * FROM ocrd";
  let sql = "SELECT  * FROM ocrd WHERE SlpCode=?"
  //alert(sql);
  
  return this.db.executeSql(sql,[zona]);
  //return this.db.executeSql(sql,[]);
}//endgetUsuarios

getClientesIndividual(idCliente: any){
  let sql = "SELECT * FROM ocrd WHERE GroupCode=?"; // 

  return this.db.executeSql(sql,[idCliente]);
}//endgetUsuarios


///// Articulos Tabla OITM
cargarDatosArticulos(){
  return this.http.get('http://kmlaccessories.com/test/testdata.php?t=P') // https://randomuser.me/api/?results=5 aqui leer el webservice del servidor SQL de SARITA
  .map(res => res.json())
  .toPromise();
}//cargarDatos
//agregarArticulosWebService(ItemCode: number, ItemName: string, BuyUnitMsr: string,NumInBuy:number){
agregarArticulosWebService(sqlString){
  return this.db.executeSql(sqlString, []); 
}//end aArticulos

vaciarArticulos(){
  //VACUUM ELIMINA ESPACIO NO USADO DESPUES DE BORRAR LA TABLA (ESTOS DOS COMANDOS DELETE Y VACUUM HACEN TRUNCATE A LA TABLA)
  let sql = 'DELETE FROM oitm';
  return this.db.executeSql(sql, [])
  .then(()=>{
    return this.db.executeSql("VACUUM",[])
  }).catch((err)=>alert("al vaciar la BD, intente de nuevo"+err));
}//endVaciarArticulos

getArticulos(){
  let sql = "SELECT * FROM  oitm"; // 
  return this.db.executeSql(sql,[]);
}//endgetArticulos


//Lista de precios tabla OSSP
cargarDatosListado(){
  return this.http.get('http://kmlaccessories.com/test/testdata.php?t=PR') //aqui leer el webservice del servidor SQL de SARITA
  .map(res => res.json())
  .toPromise();
}//cargarDatosLista
//agregarListadoWebService(ItemCode,PriceList,Price,ListName){
  agregarListadoWebService(sqlString){
  return this.db.executeSql(sqlString, []); 
}//end agregarCliente
vaciarListado(){
  //VACUUM ELIMINA ESPACIO NO USADO DESPUES DE BORRAR LA TABLA (ESTOS DOS COMANDOS DELETE Y VACUUM HACEN TRUNCATE A LA TABLA)
  let sql = 'DELETE FROM itm1';
  return this.db.executeSql(sql, [])
  .then(()=>{
    return this.db.executeSql("VACUUM",[])
  }).catch((err)=>alert("al vaciar la BD, intente de nuevo"+err));
}//endVaciarListado
getListado(){
  let sql = "SELECT * FROM  ospp"; // 
  return this.db.executeSql(sql,[]);
}//endgetUsuarios
///
////TABLA OSPP
//ospp(ItemCode TEXT, CardCode TEXT, Price REAL, Discount INTEGER, ListNum TEXT)";
cargarDatosPreciosEspeciales(){
  return this.http.get('http://kmlaccessories.com/test/testdata.php?t=PE') // https://randomuser.me/api/?results=5 aqui leer el webservice del servidor SQL de SARITA
  .map(res => res.json())
  .toPromise();
}//cargarDatosPreciosEspeciales
                                 //ItemCode,CardCode,Price,Discount,ListNum
//agregarPreciosEspecialesWebService(ItemCode,CardCode,Price,Discount,ListNum,n){
agregarPreciosEspecialesWebService(sqlString){
return this.db.executeSql(sqlString, []); 
//return this.db.executeSql(sql, []); 
}//end agregarPreciosEspecialesWebService

vaciarPreciosEspeciales(){
  let sql = 'DELETE FROM ospp';
  return this.db.executeSql(sql, [])
  .then(()=>{
    return this.db.executeSql("VACUUM",[])
  }).catch((err)=>alert("al vaciar la BD, intente de nuevo"+err));
}//vaciarPreciosEspeciales




//END OSPP
getAll(){
  let sql = 'SELECT * FROM usuarios';
  return this.db.executeSql(sql, [])
  .then(response => {
    let usuarios = [];
    for (let index = 0; index < response.rows.length; index++) {
      usuarios.push( response.rows.item(index) );
    }
    return Promise.resolve( usuarios );
  })
  .catch(error => Promise.reject(error));
}//End getAll


//Obtener listado de precios  INNER JOIN ospp ON oitm.ItemCode=ospp.ItemCode 
getListaDePrecios(CardCode:any,PriceList){
let sql="SELECT a.ItemCode,a.ItemName,a.BuyUnitMsr,a.NumInBuy,itm1.Price,a.BuyUnitMsr,a.NumInBuy,(select ospp.Price FROM ospp WHERE ospp.ItemCode=a.ItemCode AND ospp.CardCode='"+CardCode+"') as precioEspecial FROM oitm as a INNER JOIN itm1 ON a.ItemCode=itm1.ItemCode WHERE itm1.PriceList=?";
//let sql="SELECT * FROM ospp";// WHERE ospp.CardCode='"+CardCode+"'";    
//let sql="SELECT oitm.ItemCode,oitm.ItemName,oitm.BuyUnitMsr,oitm.NumInBuy FROM oitm"; 
//let sql="SELECT * FROM oitm";
//,itm1.Price,itm1.ListName INNER JOIN itm1 ON  itm1.ItemCode=oitm.ItemCode
return this.db.executeSql(sql,[PriceList]);
//return this.db.executeSql(sql,[]);
}//end ObtenerListaDePrecios


/// PEDIDOS
nuevaVentaEncabezado(usuario:any, CardCode:any,fecha_pedido:any,estado:any){
  let sql = 'INSERT INTO ordenventa(usuario,CardCode,fechaPedido,fechaEntrega,estado) VALUES(?,?,?,?,?)';
  return this.db.executeSql(sql, [usuario,CardCode,fecha_pedido,fecha_pedido,estado]); //el  estado por defecto es 0
}//end agregarCliente
//Obtener ultimoID generado ni modo de esta forma pero funciona
getUltimoId(){
  let sql="SELECT * FROM ordenventa ORDER BY idVenta DESC LIMIT 1 "; 
  return this.db.executeSql(sql,[]);
}//end ObtenerListaDePrecios
getEncabezadoVenta(idVenta:any){
  let sql="SELECT * FROM ordenventa WHERE idVenta=?"; 
  return this.db.executeSql(sql,[idVenta]);
}//end ObtenerListaDePrecios
getEncabezadoVentas(){
  let sql="SELECT * FROM ordenventa"; 
  return this.db.executeSql(sql,[]);
}//end ObtenerListaDePrecios
getVentas(){
  //ordenventa(idVenta, usuario TEXT, CardCode TEXT, fechaPedido TEXT, fechaEntrega TEXT, estado TEXT)";
  //ordenventadetalle(idventadetalle INTEGER PRIMARY KEY AUTOINCREMENT,usuario TEXT, idVenta INTEGER, ItemCode TEXT, ItemName TEXT, cantidad TEXT, precio REAL)";
  
  //let sql="SELECT ordenventa.idVenta,ordenventa.usuario,ordenventa.CardCode,ordenventa.fechaPedido,ordenventa.fechaEntrega,ordenventa.estado,ordenventadetalle.idVenta,ordenventadetalle.ItemCode,ordenventadetalle.ItemName,ordenventadetalle.cantidad,ordenventadetalle.precio FROM ordenventadetalle LEFT OUTER JOIN ordenventa ON ordenventadetalle.idVenta=ordenventa.idVenta"; 

  let sql="SELECT ordenventa.idVenta,ordenventa.usuario,ordenventa.CardCode,ordenventa.fechaPedido,ordenventa.fechaEntrega,ordenventa.estado,ordenventadetalle.idVenta,ordenventadetalle.ItemCode,ordenventadetalle.ItemName,ordenventadetalle.cantidad,ordenventadetalle.precio,ordenventadetalle.precioGuardar,ordenventadetalle.NumInBuy,ordenventadetalle.BuyUnitMsr,ocrd.CardName,ocrd.SlpCode,ocrd.ListNum,ocrd.City,owhs.WhsCode FROM ordenventadetalle, ordenventa, ocrd, owhs  WHERE ordenventadetalle.idVenta=ordenventa.idVenta and ocrd.CardCode=ordenventa.CardCode and owhs.u_ruta=ocrd.SlpCode"; 

  return this.db.executeSql(sql,[]);
}//end ObtenerListaDePrecios
getVentasListado(usuario){
  let sql="SELECT ordenventa.idVenta,ordenventa.usuario,ordenventa.CardCode,ordenventa.fechaPedido,ordenventa.fechaEntrega,ordenventa.estado FROM ordenventa WHERE usuario=?"; 
  return this.db.executeSql(sql,[usuario]);
}//end ObtenerListaDePrecios
getVentasPorCliente(CardCode:any){
  let sql="SELECT * FROM ordenventa WHERE CardCode=?"; 
  return this.db.executeSql(sql,[CardCode]);
}//end ObtenerListaDePrecios
getLineasVenta(idVenta:any){
  let sql="SELECT * FROM ordenventadetalle WHERE idVenta=?"; 
  return this.db.executeSql(sql,[idVenta]);
}//end ObtenerListaDePrecios
quitarLineasVenta(idventadetalle:any){
  let sql="DELETE FROM ordenventadetalle WHERE idventadetalle=?"; 
  return this.db.executeSql(sql,[idventadetalle]);
}//end ObtenerListaDePrecios

// INTEGER PRIMARY KEY AUTOINCREMENT, TEXT, id_venta INTEGER, ItemCode TEXT, cantidad TEXT, precio REAL)";
guardarLineaPedido(usuario:any,id_venta:any,ItemCode:any,cantidad:any,precio:any,ItemName:any,precioGuardar:any,NumInBuy:any,BuyUnitMsr:any){
//para ahorrarme un join voy a guardar el nombre del producto.. veeeee!! :-(
let sql="INSERT INTO ordenventadetalle(usuario,idVenta,ItemCode,cantidad,precio,ItemName,precioGuardar,NumInBuy,BuyUnitMsr) VALUES (?,?,?,?,?,?,?,?,?)";
return this.db.executeSql(sql, [usuario,id_venta,ItemCode,cantidad,precio,ItemName,precioGuardar,NumInBuy,BuyUnitMsr]);
}//enb guardarLineaPedido

enviar(cadena){
  let cadena2=cadena.substring(0,cadena.length-1);
  alert("Datos a enviar"+cadena2);
  var link='http://saritatestdata.ddns.net/saplink/recibe.php'; //URL DEL WEBSERVICE
  var myData= JSON.stringify({pedidos:cadena2});
  //let headers = new Headers({'Content-Type' : 'application/x-www-form-urlencoded'});
  //let options = new RequestOptions({ headers: headers }); //ante le enviaba esto como tercer parametro al POST
  this.http.post(link,myData)
  .subscribe(data=>{
    alert(data["_body"]);
  }, error=>{
    alert("error"+error)
  });

}//endFunction

enviarDatos(cadena){
  alert("Datos"+cadena);
  let headers = new Headers(
    {
      'Content-Type' : 'application/json'
    });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.post('http://192.168.0.20/webservice.php', JSON.stringify(cadena))
      .toPromise()
      .then((response) =>
      {
        alert("Llega aqui")
        console.log('API Response : ', response.json());
        resolve(response.json());
      })
      .catch((error) =>
      {
        alert("Ha ocurrido un error inesperado. Intenta nuevamente al esta en linea"+error.status)
        alert(JSON.stringify(error));
        console.error('API Error : ', error.status);
        console.error('API Error : ', JSON.stringify(error));
        reject(error.json());
      });
    });
}//end Enviar Datos
}//endClass AccesoDatosProvider
