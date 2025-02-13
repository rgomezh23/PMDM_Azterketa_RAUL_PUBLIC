import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from './../servicios/cuestionario.service';
import { IPregunta } from './../interfaces/interfaces';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage  implements OnInit  {
  preguntas : IPregunta[] = [];
  preguntaObservable!: Observable<IPregunta[]>;

  pregunta : IPregunta = {
    logotipo: '',
    respuesta: '',
    //Ez dira json-ean existitzen
    respuestasIncorrectas: [],
    intentos: 0,
    acierto: false,
  }
  //Zerbitzua inportatu
  constructor(private cuestionarioService : CuestionarioService) {}

  ngOnInit() {
    this.cargarPreguntas();
  }

  cargarPreguntas(){
    this.preguntaObservable = this.cuestionarioService.datuakKargatu();
    this.preguntaObservable.subscribe(data => this.preguntas = data);
  }

  //Metodo bat sortu "Erantzun" onclick egiteko
  //IGaldera bat jasoko du eta zerbitzua deituko du beharrezkoak diren eragiketak egiteko
  Erantzun(index:number) {
      this.pregunta =  this.preguntas[index];
      this.cuestionarioService.alerta(index);
      this.preguntas[index].acierto = this.cuestionarioService.getBoolean();
    }

  Bidali(){
     return this.pregunta
  }



  //Sortu metodo bat "Gorde"ren onclick-a kudeatzeko
  //Ez du parametrorik jasotzen eta zerbitzuari deituko dio dagokion eragiketak egiteko.


}
