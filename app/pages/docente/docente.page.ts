import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  profesor={
    name:'',
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
  asignaturas(){
    this.navCtrl.navigateForward(['/asignaturas']);
  }
  registrar(){
    this.navCtrl.navigateForward(['/formulario']);
  }
  
  async Enviar() {
    const alert = await this.alertController.create({
      header: 'Bienvenido!',
      message: `Hola , ${this.profesor.name}`,
      buttons: ['OK'],
    });

    await alert.present();

    this.profesor.email='';
    this.profesor.password='';
   
  }
}
