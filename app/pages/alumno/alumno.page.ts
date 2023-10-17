import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../../service/registroservice.service' ;
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})

export class AlumnoPage implements OnInit {

  formularioLogin : FormGroup;
  usuarios: Usuario[] = [];

  constructor(private alertController: AlertController,
              private navController: NavController,
              private navCtrl: NavController,
              private registroService: RegistroserviceService,
              private fb: FormBuilder) {
                this.formularioLogin = this.fb.group({
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl("", Validators.required),
                })
              }
  
  ngOnInit() {
  }
  goBack() {
    this.navCtrl.navigateBack(['/']);
  }
  registrar(){
    this.navCtrl.navigateForward(['/formulario']);
  }
  leerqr(){
    this.navCtrl.navigateForward(['/leerqr']);
  }
  
  async Ingresar(){
    var f = this.formularioLogin.value;
    var a = 0;
    this.registroService.getUsuarios().then (datos => { this.usuarios=datos;
      if (datos.length==0){
        return null;
      }

      for (let obj of this.usuarios){
        if(obj.correoUsuario == f.correo && obj.passUsuario == f.password){
          a=1;
          console.log('ingresado');
          localStorage.setItem('ingresado', 'true');
          this.navController.navigateRoot('leerqr');
        }
      }
    console.log(a);
    if (a==0){
      this.alertMsg();
      }
    return a===0;
    });
  }

  async alertMsg(){
    const alert = await this.alertController.create({
      header: 'Error..',
      message: '!Los datos ingresados no son correctos',
      buttons: ['Aceptar'],
    });
    await alert.present();
    return;
  }
  
}
