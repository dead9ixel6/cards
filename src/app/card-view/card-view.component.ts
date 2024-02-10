import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss']
})
export class CardViewComponent implements OnInit {

  @Input() card: any; // Expect card data to be passed in
  @Output() save = new EventEmitter<any>(); // Emit updated card data
  @Output() delete = new EventEmitter<void>(); // Emit when card needs to be deleted

  editMode: boolean = false;
  imagePath: string;
  image: any;
  assignees: string = 'Assignees'; // Initial value, to be fetched from the database
  ideaSummary: string = 'Idea Summary'; // Initial value, to be fetched from the database
  constructor() { 
  this.imagePath = this.image ? this.image : 'assets/no_image_uploaded.JPG';
  }
  ngOnInit(): void {}

  toggleEditMode(): void {
    this.editMode = !this.editMode;
  }

  saveCard(): void {
    this.save.emit(this.card);
    this.toggleEditMode(); // Optionally toggle edit mode off after save
  }

  deleteCard(): void {
    console.log('alv')
    this.delete.emit(this.card.id); // No need to pass data, the container knows which card to delete
  }
}
