import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
 


  constructor(private menuController: MenuController, private readonly navCtrl: NavController) { }

  ngOnInit() {
  }
  profesor(){
    this.navCtrl.navigateForward(['/profesor'])
  }
  alumno(){
    this.navCtrl.navigateForward(['/alumno'])
  }

  mostrarMenu(){
    this.menuController.open('first');
  }


}
