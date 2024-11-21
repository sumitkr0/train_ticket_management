import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addtrain',
  templateUrl: './addtrain.component.html',
  styleUrls: ['./addtrain.component.css']
})
export class AddtrainComponent implements OnInit {
  // Train data model
  train = {
    name: '',
    source: '',
    destination: '',
    date: '',
    trainId: '',
    category: 'General',  // Default category
    seatPrice: '',  // Initially, it's a string
  };

  // Static train data (for displaying in the table)
  trainData = [
    {
      trainId: '101',
      name: 'Express Train',
      source: 'New York',
      destination: 'Los Angeles',
      generalSeats: 150,
      sleeperSeats: 100,
      acSeats: 50,
      seatPrice: 500,  // It's a number here
    },
    // You can add more train data here as needed
  ];

  ngOnInit(): void {
    // Initialize any other data if necessary
  }

  // Calculate seat price based on category
  getSeatPrice(): number {
    const priceMap: { [key in 'General' | 'Sleeper' | 'AC']: number } = {
      General: 100,
      Sleeper: 150,
      AC: 250,
    };

    // Ensure category is a valid key in priceMap
    const category = this.train.category as 'General' | 'Sleeper' | 'AC';
    return priceMap[category] || 0;  // Return a number, not a string
  }

  // Handle form submission (adding the new train)
  addTrain() {
    // Ensure seatPrice is a number when adding the train
    const newTrain = {
      ...this.train,
      seatPrice: this.getSeatPrice() // Ensure it's a number here
    };

    // Add new train to train data table
    this.trainData.push({
      ...newTrain,
      seatPrice: Number(newTrain.seatPrice),  // Explicitly convert to number if needed
      generalSeats: 0, // Default or other values for the seats, update as necessary
      sleeperSeats: 0,
      acSeats: 0
    });

    // Clear the form after submission
    this.clearForm();
  }

  // Clear the form after adding a train
  clearForm() {
    this.train = {
      name: '',
      source: '',
      destination: '',
      date: '',
      trainId: '',
      category: 'General',
      seatPrice: '',
    };
  }

   // Optional: method for logging out the user
   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';  // Redirect to login page
  }
}
