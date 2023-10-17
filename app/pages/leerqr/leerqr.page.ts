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
  cerrarSesion() {
    // Elimina las credenciales (o información de sesión) y redirige a la página de inicio de sesión
    localStorage.removeItem('ingresado');
    this.navController.navigateRoot('inicio'); // Ajusta la ruta a tu página de inicio de sesión
  }

}
