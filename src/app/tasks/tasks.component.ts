import { Component, computed, effect, inject, input, OnInit } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  userTasks = computed(() => this.tasksService.allTasks().filter(task => task.userId === this.userId()));


  private tasksService = inject(TasksService);

  constructor(){
    // effect(() => {
    //     this.userTasks = this.tasksService.allTasks().filter(task => task.userId = this.userId())
    // })
  }

  ngOnInit(): void {
      // this.userTasks = this.tasksService.allTasks().filter(task => task.userId === this.userId())
  }

}
