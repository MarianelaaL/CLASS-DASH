import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Asignaturas } from '../../../services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {

  datos: Asignaturas[] = [];
  newDato: Asignaturas = <Asignaturas>{};
  @ViewChild('myList')myList! :IonList;


  constructor(private storageService: ServicesdatosService,
              private readonly navCtrl: NavController,
              private plt: Platform, private toastController: ToastController) {
      this.plt.ready().then(()=>{
        this.loadDatos();
      });
    }

    ngOnInit() {
    }
    goBack() {
      this.navCtrl.navigateBack(['/']);
    }
    crearAsignatura(){
      this.navCtrl.navigateForward(['/crear-asignatura'])
    }

  //get
  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
    });
  }
  //update
  updateDatos(dato: Asignaturas ){
    dato.nomAsignatura = `UPDATED: ${dato.nomAsignatura}`;
    this.storageService.updateDatos(dato).then(item=>{
      this.showToast('Elemento actualizado!')
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  //delete
  deleteDatos(dato: Asignaturas){
    this.storageService.deleteDatos(dato.sigla).then(item=>{
      this.showToast('Elemento eliminado');
      this.myList.closeSlidingItems();
      this.loadDatos();
    });
  }

  async showToast(msg: string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
