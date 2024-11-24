import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';  // Import ChangeDetectorRef
declare var bootstrap: any;

@Component({
  selector: 'app-edittrain',
  templateUrl: './edittrain.component.html',
  styleUrls: ['./edittrain.component.css']
})
export class EdittrainComponent implements OnInit {
  @Input() trainData: any[] = [];
  @Input() apiUrl: string = 'http://localhost:8080/trains';
  trainToEdit: any = {};

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getTrains();
  }

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

  editTrain(train: any) {
    this.trainToEdit = { ...train };
    const editModalElement = document.getElementById('editTrainModal');
    console.log(editModalElement); // Check if the modal element exists
    const editModal = new bootstrap.Modal(editModalElement);
    console.log(editModal); // Check if the modal is initialized correctly
    editModal.show();
  }
  
  updateTrain() {
    const updatedTrain = { ...this.trainToEdit };

    this.http.put(`${this.apiUrl}/${updatedTrain.id}`, updatedTrain).subscribe(
      (response) => {
        console.log('Train updated:', response);
        this.closeModal();
        this.getTrains(); 
        this.cdr.detectChanges(); 
        this.router.navigate(['/edittrain']);
      },
      (error) => {
        console.error('Error updating train:', error);
      }
    );
  }

  closeModal() {
    const editModalElement = document.getElementById('editTrainModal');
    const editModal = bootstrap.Modal.getInstance(editModalElement) || new bootstrap.Modal(editModalElement);
    editModal.hide();
  }

  onModalClose() {
    this.closeModal();
  }
}
