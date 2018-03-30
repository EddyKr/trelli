import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../auth-service";
import { trigger, style, transition, animate, keyframes, query, stagger} from '@angular/animations';
import {Board} from "./board";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

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

  form: FormGroup;
  categories = [];
  categoriesCount: number;
  boardId: string;

  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder) {
    this.route.paramMap.subscribe(params => {
      this.boardId = params.get('id');
    });

    this.form = this.fb.group({
      task_name: ['', Validators.required]
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
    this.categories = response.data.board.categories;

    for (var i = 0; i < this.categories.length; i++){
      this.categories[i].showNewTask = false;
    }

    this.categoriesCount = this.categories.length;
  }

  triggerAddNewTask(id){
    for (var i = 0; i < this.categories.length; i++){
      if (this.categories[i].id == id){
        this.categories[i].showNewTask = true;
      }
    }
  }

  addNewTask(id){
    const val = this.form.value;
    for (var i = 0; i < this.categories.length; i++){
      if (this.categories[i].id == id){
        this.categories[i].tasks.push({id: 1, title: val.task_name, description: 'Add description'});
        this.form.reset();
        this.categories[i].showNewTask = false;
        this.http.post('http://localhost/Trelli/api/tasks/add.json', {title: val.task_name, description: 'Add description', category_id: id}).subscribe();

      }
    }
  }



}
