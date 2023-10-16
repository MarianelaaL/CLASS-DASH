import { Injectable } from '@angular/core';
import { Storage }  from '@ionic/storage';

export interface Alumnos{
  rut : number;
  nombre: string;
  email: string;
  password : string;  
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

  async addDatos(dato: Alumnos):Promise<any>{
    return this.storage.get(ITEMS_KEY).then((datos : Alumnos[])=>{
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
 
   async getDatos(): Promise<Alumnos[]>{
     return this.storage.get(ITEMS_KEY);
   }
 
 
   //actualizar información de un objeto
   async updateDatos(dato: Alumnos): Promise<any>{
     return this.storage.get(ITEMS_KEY).then((datos : Alumnos[])=>{
       if (!datos || datos.length == 0){
         return null;
       }
       let newDato: Alumnos[] = [];
       for (let i of datos){
         if (i.rut === dato.rut){
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
  async deleteDatos(rut: number): Promise<Alumnos>{
     return this.storage.get(ITEMS_KEY).then((datos : Alumnos[])=>{
       if (!datos || datos.length === 0){
         return null;
       }
       let toKeep: Alumnos[] = [];
       for (let i of datos){
         if (i.rut !== rut){
           toKeep.push(i);
         }
       }
       return this.storage.set(ITEMS_KEY, toKeep);
     });
 
   }
}
