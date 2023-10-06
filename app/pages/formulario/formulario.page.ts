import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  persona={
    email:'',
    password:''
  }

  constructor(private menuController: MenuController,
              private alertController: AlertController,
              private readonly navCtrl: NavController) { }

  ngOnInit() {
  }

  mostrarMenu(){
    this.menuController.open('first');
  }

  goBack() {
    this.navCtrl.navigateBack(['/']);
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
