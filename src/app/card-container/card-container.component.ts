import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-card-container',
  templateUrl: './card-container.component.html',
  styleUrls: ['./card-container.component.scss'],
})
export class CardContainerComponent implements OnInit {
  cards = [];
  displayedCards = [];
  loadSize = 2; // Number of cards to display each scroll
  apiUrl = 'http://localhost:3001/cards';

  constructor(
    private http: HttpClient,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.fetchCards();
  }

  fetchCards() {
    console.log('fetching cards');
    this.http.get<any[]>(this.apiUrl).subscribe((data) => {
      this.cards = data;
      this.displayedCards = this.cards.slice(0, this.loadSize);
    });
  }

  addCard() {
    const cardNumber = this.cards.length + 1; // Use the length of the array to determine the next number
    const newCard = {
      imagePath: 'assets/no_image_uploaded.JPG',
      assignees: `Assignees ${cardNumber}`,
      ideaSummary: `Idea Summary ${cardNumber}`,
    };
    this.http.post(this.apiUrl, newCard).subscribe({
      next: () => {
        this.fetchCards(); // Successfully added card, now fetch cards
      },
      error: (error) => {
        console.error('Error adding card:', error);
        // Handle error, optionally refresh cards list to reflect current state
        this.fetchCards();
      },
    });
  }

  updateCard(updatedCard) {
    this.http.put(`${this.apiUrl}/${updatedCard.id}`, updatedCard).subscribe({
      next: () => {
        this.fetchCards(); // Fetch cards again to refresh the UI
      },
      error: (error) => console.error('Error updating card:', error),
    });
  }
  deleteCard(cardId: number) {
    this.http.delete(`${this.apiUrl}/${cardId}`).subscribe(() => {
      this.fetchCards(); // Refresh the cards from the server
    });
  }
  startIndex = 0;
  onScroll() {
    console.log('Scrolled!');

    // Check if we've displayed all current cards
    if (this.startIndex >= this.cards.length) {
      // Reset startIndex to 0 if we've reached or exceeded the length
      this.startIndex = 0;
      // Optionally, you could clear displayedCards here if you were using a separate array for display
    }

    // Calculate the next set of cards to display
    let nextIndex = this.startIndex + this.loadSize;

    // If nextIndex exceeds the cards length, loop back to start
    if (nextIndex > this.cards.length) {
      nextIndex = nextIndex - this.cards.length;
    }

    // Directly manipulate the cards array to simulate infinite scrolling
    // This example assumes you're cycling and not actually loading new data
    // Adjust this logic based on your specific requirements
    this.cards = [
      ...this.cards,
      ...this.cards.slice(this.startIndex, nextIndex),
    ];
    this.startIndex += this.loadSize;

    // If after adjustment we're still over, reset to ensure we loop
    if (this.startIndex >= this.cards.length) {
      this.startIndex = 0; // This ensures we loop back to the start
    }
  }
}
