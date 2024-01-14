import { Component, OnInit, Output, inject, EventEmitter } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GetWeatherComponent } from '../get-weather/get-weather.component';

@Component({
  selector: 'app-get-user',
  standalone: true,
  imports: [HttpClientModule, GetWeatherComponent],
  templateUrl: './get-user.component.html',
  styleUrl: './get-user.component.scss'
})
export class GetUserComponent implements OnInit {
  httpClient = inject(HttpClient);
  userdata: any = {};
  isLoaded = false;
  isSent = false;
  cardUserData: any = {};
  cardData: any = {};

  @Output() cardFullData = new EventEmitter<Object>();

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.httpClient.get('https://randomuser.me/api/?results=2')
      .subscribe((data) => {
        this.userdata = data;
        this.setCardUserData();
        console.log(this.userdata)
      });
  }

  setCardUserData() {
    this.cardUserData['image'] = this.userdata.results[0].picture.medium;
    this.cardUserData['name'] = this.userdata.results[0].name;
    this.cardUserData['location'] = this.userdata.results[0].location;
    this.cardUserData['gender'] = this.userdata.results[0].gender;
    this.cardUserData['email'] = this.userdata.results[0].email;

    this.isLoaded = true;
  }

  setCardData(data: any) {
    this.cardData['user'] = this.cardUserData;
    this.cardData['weather'] = data;

    this.isSent = true;
  }

  handleCardWeatherData(data: any) {
    this.setCardData(data);
    if (this.isSent) {
      this.cardFullData.emit(this.cardData);
    }
  }
}