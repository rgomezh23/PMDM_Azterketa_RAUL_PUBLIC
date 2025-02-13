import { Component, OnInit } from '@angular/core';
import { CuestionarioService } from './../servicios/cuestionario.service';
import { IPregunta } from './../interfaces/interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage  implements OnInit  {
  preguntas : IPregunta[] = [];
  preguntaObservable!: Observable<IPregunta[]>;
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
    throw new Error('Method not implemented.');
    }

  //Sortu metodo bat "Gorde"ren onclick-a kudeatzeko
  //Ez du parametrorik jasotzen eta zerbitzuari deituko dio dagokion eragiketak egiteko.


}
