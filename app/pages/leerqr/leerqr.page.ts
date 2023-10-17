import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-leerqr',
  templateUrl: './leerqr.page.html',
  styleUrls: ['./leerqr.page.scss'],
})
export class LeerqrPage implements OnInit {

  constructor(private menuController: MenuController,
              private navController: NavController) { }

  ngOnInit() {
  }
  mostrarMenu(){
    this.menuController.open('first');
  }

  cerrarSesion() {
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio'); 
  }

}
