import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { IPregunta } from './../interfaces/interfaces';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HomePage } from '../home/home.page';

@Injectable({
  providedIn: 'root'
})
export class CuestionarioService {
  // Array bat gordetzeko json-ean dauden galdera guztiak. Gogoratu array-a abiarazten arazoak ekiditzeko
    preguntas : IPregunta[] = [];
    incorrecto : string[]= [];
    intentos: number = 5;
    acierto:boolean = false;
    pregunta: IPregunta = {
      logotipo: '',
      respuesta: '',
      //Ez dira json-ean existitzen
      respuestasIncorrectas: [],
      intentos: 0,
      acierto: false,
    }
  
    homePage!: HomePage;
    preguntaObservable!: Observable<IPregunta[]>

    respuestaEnviada :string = '';
    acertar: boolean = false;
    intentoak : number = 5;

  
  // Gehitu beharrezkoak diren konponenteak eta zerbitzuak
  private url = '/assets/datos/datos.json'


  constructor(private restServer: HttpClient, private alertController: AlertController) {
    
  }
    // IPregunta array-a bueltatuko duen metodoa, hau da, galdetegiko galdera guztiak array batean
      // Fitxategia irakurtzeko metodoa
  // Gogoratu asinkronoa dela.
   // Fitxategitik irakurtzen ditu datuak eta arrayan gordetzen ditu
  datuakKargatu(): Observable <IPregunta[]>{
      return this.restServer.get<IPregunta[]>(this.url);
  }

  //Datuak kargatu
  datuakJaso(){
      this.pregunta = this.homePage.Bidali();
  }
 
  // Ireki alerta bat galderaren enuntziatuarekin eta konprobatu erantzuna
  async alerta(index: number){
    this.preguntaObservable = this.datuakKargatu();
    this.preguntaObservable.subscribe(data => this.preguntas = data);
    console.log("Preguntas:"+ this.preguntas.length);
    const alert = await this.alertController.create({
      header: '¿De qué marca es este logotipo?',
      inputs:[{name:'respuesta', type:'text', placeholder:'Inserte la respuesta'}],
      buttons: [{
        text:'ENVIAR',
        handler: (data) => {
         this.respuestaEnviada  = data.respuesta;

          for(let i=0;i<this.preguntas.length;i++){
            console.log("Respuestas:" + this.preguntas[index].respuesta);
            console.log("Respuesta enviada:"+ this.respuestaEnviada)
              if(this.respuestaEnviada === this.preguntas[index].respuesta){
                  this.preguntas[index].acierto = true;
                  this.acertar = true;
                  this.preguntas = [];
              }else{
                    this.preguntas[index].acierto = false;
                    this.acertar = false;
                    this.intentoak--;
                    this.preguntas = [];
              }
              if(this.acertar){
                  this.MostrarAcierto();
                  return this.acertar;
              }else{
                  this.MostrarFallo();
                  return this.acertar;
              }
          }
          return this.acertar;
        },
      }],
    });
    await alert.present();
    return false;
  }
  // 1 - Erantzun zuzena ala okerra denaren arabera eguneratzen du egoera
  async MostrarAcierto(){
    const alert = await this.alertController.create({
      header: '¡Has acertado!',
      message: 'Felicicades',
      buttons: ['Gracias'],
    });

    await alert.present();
  }

  // 2 - Ez ba du asmatzen:
  async MostrarFallo(){
    const alert = await this.alertController.create({
      header: 'Has fallado, vuelve a intentarlo',
      message: 'Un intento menos.',
      buttons: ['Vaya...'],
    });

    await alert.present();
  }

  getBoolean(){
    return this.acertar;
  }

  getIntentos(){
    return this.intentoak;
  }

  getRespuesta(){
    return this.respuestaEnviada;
  }
  
  // 2.1 Saiakera kopuruari kendu bat
  // 2.2 Gordeko du erantzuna erantzunen array-an
}
