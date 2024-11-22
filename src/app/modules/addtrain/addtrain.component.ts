declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-addtrain',
  templateUrl: './addtrain.component.html',
  styleUrls: ['./addtrain.component.css']
})
export class AddtrainComponent implements OnInit {
  // Train model for adding new train
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
    trainId: '',
    category: 'General',
  };

  // Data model for editing
  trainToEdit: any = { ...this.train };

  // Property to store the train data fetched from API
  trainData: any[] = [];  // Initialize an empty array for train data

  // API Base URL 
  apiUrl = 'http://localhost:8080/trains';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getTrains();
  }

  // Get train data from API
  getTrains(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(
      (response) => {
        this.trainData = response;
        console.log(response);
      },
      (error) => {
        console.error('Error fetching trains:', error);
      }
    );
  }

  addTrain() {
    const newTrain = { ...this.train };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.post(this.apiUrl, newTrain, { headers }).subscribe(
      (response) => {
        console.log('Train added:', response);
        this.getTrains();
      },
      (error) => {
        console.error('Error adding train:', error);
      }
    );
  }

  updateTrain() {
    const updatedTrain = { ...this.trainToEdit };

    this.http.put(`${this.apiUrl}/${updatedTrain.id}`, updatedTrain).subscribe(
      (response) => {
        console.log('Train updated:', response);
        this.closeModal();
        this.getTrains();
      },
      (error) => {
        console.error('Error updating train:', error);
      }
    );
  }

  editTrain(train: any) {
    this.trainToEdit = { ...train };
    const editModal = new bootstrap.Modal(document.getElementById('editTrainModal'));
    editModal.show();
  }

  closeModal() {
    const editModal = new bootstrap.Modal(document.getElementById('editTrainModal'));
    editModal.hide();
  }
}
