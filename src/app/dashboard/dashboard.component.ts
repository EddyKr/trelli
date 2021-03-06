import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../auth-service';
import {Router} from '@angular/router';
import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import {Board} from '../board/board';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

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

  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthService, private router: Router, private fb: FormBuilder) {
    // this.route.params.subscribe(res => console.log(res.id));
    if (!authService.isLoggedIn()){
      console.log('You are not logged in!');
      this.router.navigateByUrl('/login');
    }
  }
  showVar = false;
  boardsCount: number;
  boards = [];
  form = new FormGroup({
      board_name: new FormControl(),
      description: new FormControl()
    });

  ngOnInit() {
    this.getAllBoards();
  }

  toggleForm() {
      this.form = this.fb.group({
          board_name: ['', Validators.required]
      });

    this.showVar = !this.showVar;
  }

  getAllBoards() {
    this.http.get('http://localhost/Trelli/api/boards.json').subscribe(response => {
      this.processBoards(response);
    });
  }

  processBoards(response) {
    this.boards = response.data.boards;
    this.boardsCount = this.boards.length;
  }
  addBoard() {
      const val = this.form.value;
      console.log(val);
      this.http.post('http://localhost/Trelli/api/boards/add', <Board> {
          name: val.board_name,
          description: 'TODO'
      }).subscribe();
      this.router.navigateByUrl('/board/' + this.boardsCount++);
  }
}
