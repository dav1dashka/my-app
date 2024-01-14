import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { GetUserComponent } from '../get-user/get-user.component';
import { GetWeatherComponent } from '../get-weather/get-weather.component';

@Component({
  selector: 'app-fetch-card',
  standalone: true,
  imports: [HttpClientModule, GetUserComponent, GetWeatherComponent],
  templateUrl: './fetch-card.component.html',
  styleUrl: './fetch-card.component.scss'
})
export class FetchCardComponent {
  cardData: any = {};
  userName: string = '';
  isSaved: boolean = false;
  userNames: any = {};

  handleCardFullData(data: any) {
    this.cardData = data;
    this.userName = this.cardData.user.name.first;
  }

  saveCard() {
    localStorage.setItem(`${this.userName}Data`, JSON.stringify(this.cardData));
    
    this.isSaved = true;
  }

}
