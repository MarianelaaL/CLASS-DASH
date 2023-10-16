import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { RegistroserviceService, Usuario } from '../../service/registroservice.service'; 
import {
  FormGruop,
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

  formularioLogin : FormGroup;
  newUsuario: Usuario= <Usuario>{};

  constructor(private alertController: AlertController,
              private toastController: ToastController,
              private registroService: RegistroserviceService,
              private fb:FormBuilder) {
                this.formularioRegistro = this.fb.group({
                  'nombre': new FormControl("", Validators.required)
                  'correo' : new FormControl("", Validators.required),
                  'password' : new FormControl("", Validators.required),
                  'confirmaPass': new FormControl("", Validators.required)
                });
        }

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.navigateBack(['/']);
  }

  async CrearUsuario(){
    ver form= this.formularioRegistro.value;
    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos Incompletos',
        message: 'Debe completar todos los datos',
        buttons: ['Aceptar'],
      });
      await alert.present();
      return;
    }

    this.newUsuario = form.nombre,
    this.newUsuario = form.correo,
    this.newUsuario = form.password,
    this.newUsuario = form.confirmaPass,
    this.registroService.addDatos(this.newUsuario).then(dato => {
      this.newUsuario = <Usuario>{};
      this.showToast('!Datos Agregados');
    });

  }


  async Enviar() {
    const alert = await this.alertController.create({
      header: 'Gracias!',
      message: 'Sus datos han sido almacenados!',
      buttons: ['OK'],
    });
  }

}
