import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  constructor() { }
  data: any[];

  ngOnInit() {
      this.http.get('http://localhost/trelli/api/boards.json').subscribe(data => {
          this.data = data.boards;
      });
  }

}
