import { Injectable } from '@angular/core';
import { Storage }  from '@ionic/storage';

export interface Asignaturas{
  sigla : number;
  nomAsignatura: string;
  area : string;  
}

const ITEMS_KEY = 'my-datos';

@Injectable({
  providedIn: 'root'
})

export class ServicesdatosService {

  private _storage : Storage | null = null;

  constructor(private storage: Storage) { 
    this.init();
  }
  async init(){
    const storage = await this.storage.create();
    this._storage= storage;
  }

  async addDatos(dato: Asignaturas):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Asignaturas[])=>{
       if (datos) {
         datos.push(dato);
         return this.storage.set(ITEMS_KEY, datos);
       }else {
         return this.storage.set(ITEMS_KEY, [dato]);
       }
 
     })
   }
 
    //Nos permmite obtener la información almacenada en el storage
    //por medio de sus keys
 
   async getDatos(): Promise<Asignaturas[]>{
     return this.storage.get(ITEMS_KEY);
   }
 
 
   //actualizar información de un objeto
   async updateDatos(dato: Asignaturas): Promise<any>{
     return this.storage.get(ITEMS_KEY).then((datos : Asignaturas[])=>{
       if (!datos || datos.length == 0){
         return null;
       }
       let newDato: Asignaturas[] = [];
       for (let i of datos){
         if (i.sigla === dato.sigla){
           newDato.push(dato);
         }
         else{
           newDato.push(i);
         }
       }
       return this.storage.set(ITEMS_KEY, newDato);
     });
   }
 
    //Eliminar
  async deleteDatos(sigla: number): Promise<Asignaturas>{
     return this.storage.get(ITEMS_KEY).then((datos : Asignaturas[])=>{
       if (!datos || datos.length === 0){
         return null;
       }
       let toKeep: Asignaturas[] = [];
       for (let i of datos){
         if (i.sigla !== sigla){
           toKeep.push(i);
         }
       }
       return this.storage.set(ITEMS_KEY, toKeep);
     });
 
   }
}
