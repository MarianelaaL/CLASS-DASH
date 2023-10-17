import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../../service/registroservice.service'; 
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  formularioRegistro : FormGroup;
  newUsuario: Usuario= <Usuario>{};

  constructor(private alertController: AlertController,
              private toastController: ToastController,
              private  navCtrl: NavController,
              private registroService: RegistroserviceService,
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("", Validators.required),
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl("", Validators.required),
                  'confirmaPass': new FormControl("", Validators.required),
                });
              }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.navigateBack(['/']);
  }

  async CrearUsuario() {
    var form= this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos',
        message: 'Debe completar todos los datos',
        buttons: ['Aceptar']
      });
      await alert.present();
      return;
    }
  
    this.newUsuario.nomUsuario = form.nombre,
    this.newUsuario.correoUsuario = form.correo,
    this.newUsuario.passUsuario=form.password,
    this.newUsuario.repassUsuario=form.confirmaPass
    this.registroService.addDatos(this.newUsuario).then(dato => {
      this.newUsuario = <Usuario>{};
      this.showToast('!Datos Agregados');
    });
  }
  

  async showToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  async Enviar() {
    const alert = await this.alertController.create({
      header: 'Gracias!',
      message: 'Sus datos han sido almacenados!',
      buttons: ['OK'],
    });
  }

}
