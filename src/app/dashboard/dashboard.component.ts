import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getAllBoards(){
    this.http.get('http://localhost/Trelli/api/boards.json').subscribe(data => {
      console.log(data);
    });
  }

  addBoard(){
    this.http.get('http://localhost/Trelli/api/boards.json').subscribe(data => {
      console.log(data);
    });
  }

}
