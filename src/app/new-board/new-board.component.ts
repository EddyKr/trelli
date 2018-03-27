import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.css']
})
export class NewBoardComponent implements OnInit {
  @Input() isVisible: boolean;
  constructor() { }

  ngOnInit() {
  }

}
