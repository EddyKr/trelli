import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from "../auth-service";
import {Router} from "@angular/router";
import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('boards', [
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
export class DashboardComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private router: Router) {
    // this.route.params.subscribe(res => console.log(res.id));
    if (!authService.isLoggedIn()){
      console.log("You are not logged in!");
      this.router.navigateByUrl('/login');
    }
  }

  boardsCount: number;
  boards = [];

  ngOnInit() {
    this.getAllBoards();
  }

  getAllBoards(){
    this.http.get('http://localhost/Trelli/api/boards.json').subscribe(response => {
      this.processBoards(response);
    });
  }

  processBoards(response){

    this.boards = response.data.boards;
    this.boardsCount = this.boards.length;
  }

  addBoard(){
    this.http.get('http://localhost/Trelli/api/boards.json').subscribe(data => {
      console.log(data);
    });
  }

}
