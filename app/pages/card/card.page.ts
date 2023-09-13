import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  

  constructor(private readonly navCtrl: NavController) {}

  ngOnInit() {
  }
  goBack() {
    this.navCtrl.navigateBack(['/']);
  }

}
