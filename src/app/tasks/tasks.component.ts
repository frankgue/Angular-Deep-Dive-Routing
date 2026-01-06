import { Component, computed, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  order = input<'asc' | 'desc'>('asc');
  userTasks = computed(() => this.tasksService.allTasks().filter(task => task.userId === this.userId()));


  private tasksService = inject(TasksService);

  constructor(){
 
  }

  ngOnInit(): void {
    console.log(this.order);
    
  }

}
