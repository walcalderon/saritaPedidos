import { Component } from '@angular/core';
import { AccesoDatosProvider} from '../../providers/acceso-datos/acceso-datos';
import { AdministradorPage } from '../administrador/administrador';
import { NavController, AlertController,LoadingController  } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  usuario: string;
  clave : string;
  usuarios:any[]=[]; //definimos un arreglo vacio para poder guardar el listado de usuarios
  listadoUsuario:any;
  verificarUsuario:any;
  mensaje:any;
  constructor(public navCtrl: NavController,
    public alertCtrl: AlertController,
    public accesoDatos:AccesoDatosProvider,
    public loadingCtrl: LoadingController) {}//endContructor
  ionViewDidLoad(){
    localStorage.setItem("appInstall","true");
   //carga al inicio de la pagina
   localStorage.removeItem('ruta'); 
   localStorage.removeItem('usuario'); 
   
  }//endionViewLoad

  administrador(){
    this.navCtrl.setRoot(AdministradorPage);                
    
  }//endAdministrador

  verificarLogin(){
    this.accesoDatos.verificarLogin(this.usuario,this.clave).then((res)=>{
      this.verificarUsuario = [];
      for(var i = 0; i < res.rows.length; i++){
          this.verificarUsuario.push({
            user: res.rows.item(i).user, 
            pass: res.rows.item(i).pass,
            ruta:  res.rows.item(i).ruta,
            });
          localStorage.setItem("ruta",res.rows.item(i).ruta)
          localStorage.setItem("usuario",res.rows.item(i).user)
      }//endFor 
      if((this.verificarUsuario.length)>0){  
        this.navCtrl.setRoot(AdministradorPage);                
        //this.navCtrl.push(AdministradorPage);
      }        
      else{
      /*  
        let loaderActualizar = this.loadingCtrl.create({
          content: "Datos de inicio de sesión incorrectos",
          duration: 2000
        });
        loaderActualizar.present();
      */
      this.mensaje="Datos de inicio de sesión incorrectos";  
      }//endElse         
      },(err)=>{  alert('Error '+err) })
  }//endVerificarLogin

}//endClass
