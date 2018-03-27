import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  categories = [];
  board_id;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.board_id = params.get('id');
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.http.get('http://localhost/Trelli/api/boards/' + this.board_id + '.json').subscribe(response => {
      this.processCategories(response);
    });
  }

  processCategories(response){
    console.log(response);
    this.categories = response.data.board.categories;
  }

}
