import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addtrain',
  templateUrl: './addtrain.component.html',
  styleUrls: ['./addtrain.component.css']
})
export class AddtrainComponent implements OnInit {
  train = {
    id: 0,
    name: '',
    source: '',
    destination: '',
    status: true,
    general: 0,
    sleeper: 0,
    ac: 0,
    seatNumber: 0,
    generalPrice: 100,
    sleeperPrice: 150,
    acPrice: 250,
    category: 'General',
  };

  initialTrainState = { ...this.train };

  apiUrl = 'http://localhost:8080/trains';

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit(): void {}

  addTrain() {
    const newTrain = { ...this.train };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.apiUrl, newTrain, { headers }).subscribe(
      (response) => {
        console.log('Train added:', response);
        this.router.navigate(['/edittrain']);
      },
      (error) => {
        console.error('Error adding train:', error);
      }
    );
  }

  resetForm() {
    this.train = { ...this.initialTrainState };
  }
}
