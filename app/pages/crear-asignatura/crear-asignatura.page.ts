import { Component, OnInit, ViewChild } from '@angular/core';
import { ServicesdatosService, Asignaturas } from '../../../services/servicesdatos.service';
import { Platform, ToastController, IonList} from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-crear-asignatura',
  templateUrl: './crear-asignatura.page.html',
  styleUrls: ['./crear-asignatura.page.scss'],
})
export class CrearAsignaturaPage implements OnInit {

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

  loadDatos(){
    this.storageService.getDatos().then(datos=>{
      this.datos=datos;
    });
  }

  addDatos(){
    this.newDato.sigla = Date.now();
    this.storageService.addDatos(this.newDato).then(dato=>{
      this.newDato = <Asignaturas>{};
      this.showToast('!Datos Agregados');
      this.loadDatos();
    });
  }

  updateDatos(dato: Asignaturas ){
    dato.nomAsignatura = `UPDATED: ${dato.nomAsignatura}`;
    this.storageService.updateDatos(dato).then(item=>{
      this.showToast('Elemento actualizado!')
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
