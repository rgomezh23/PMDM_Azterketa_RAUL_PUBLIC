import { Component, Input, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-goiburukoa',
  templateUrl: './goiburukoa.component.html',
  styleUrls: ['./goiburukoa.component.scss'],
  imports:[IonicModule]
})
export class GoiburukoaComponent  implements OnInit {

  constructor() { }

  @Input() tituloa: string = '';

  ngOnInit() {}

}
