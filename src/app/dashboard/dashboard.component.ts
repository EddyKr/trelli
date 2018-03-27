import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Board} from '../board/board';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private http: HttpClient) { }
    data: any[];
  ngOnInit() {
      this.http.get('http://localhost/trelli/api/boards').subscribe(data => {
        this.data = data.data.boards;
      });
  }

  createNewBoard() {
     console.log(this.http.post('http://localhost/trelli/api/boards/add', <Board> {name: 'name', description: 'description'}).subscribe());
  }
}
