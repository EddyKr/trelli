import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }
    data: any[];
  ngOnInit() {
      this.http.get('http://localhost/trelli/api/boards.json').subscribe(data => {
        this.data = data.data.boards;
        console.log(this.data);
      });
  }

  getAllBoards() {
    this.http.get('http://localhost/trelli/api/boards.json').subscribe(data => {
      console.log(data);
      this.data = data;
    });
  }

  addBoard() {
    this.http.get('http://localhost/trelli/api/boards.json').subscribe(data => {
      console.log(data);
    });
  }

}
