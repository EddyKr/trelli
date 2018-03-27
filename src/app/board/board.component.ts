import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service";
import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import {Board} from "./board";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  animations: [
    trigger('categories', [
      transition('* => *', [
        query(':enter', style({ opacity: 0}), {optional: true}),
        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px', offset: .3}),
            style({opacity: 1, transform: 'translateY(0', offset: 1}),
          ]))
        ]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 1, transform: 'translateY(0', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px', offset: .3}),
            style({opacity: 0, transform: 'translateY(-75%', offset: 1}),
          ]))
        ]), {optional: true}),
      ])
    ])
  ]
})
export class BoardComponent implements OnInit {
  @Input() showForm: boolean;
  categories = [];
  categoriesCount: number;
  boardId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('id');
    });
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.http.get('http://localhost/Trelli/api/boards/' + this.boardId).subscribe(response => {
      this.processCategories(response);
    });
  }

  processCategories(response){
    console.log(response);
    this.categories = response.data.board.categories;
    this.categoriesCount = this.categories.length;
  }



}
