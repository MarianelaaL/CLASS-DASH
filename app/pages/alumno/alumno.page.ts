import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  persona={
    email:'',
    password:''
  }

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private readonly navCtrl: NavController) { }



  ngOnInit() {
  }
  goBack() {
    this.navCtrl.navigateBack(['/']);
  }
  inicio(){
    this.navCtrl.navigateForward(['/leerqr']);
  }
  registrar(){
    this.navCtrl.navigateForward(['/formulario']);
  }

  async Enviar() {
    const alert = await this.alertController.create({
      header: 'Gracias!',
      message: 'Sus datos han sido almacenados!',
      buttons: ['OK'],
    });

    await alert.present();

    this.persona.email='';
    this.persona.password='';
    this.navCtrl.navigateBack(['/']);
  }
}
