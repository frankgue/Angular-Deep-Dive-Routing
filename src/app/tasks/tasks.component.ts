import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  // order = input<'asc' | 'desc'>('asc');
  // order: 'asc' | 'desc' = 'asc';
  order = signal<'asc' | 'desc'>('desc');
  userTasks = computed(() =>
    this.tasksService.allTasks().filter((task) => task.userId === this.userId()).sort((a, b) => {
      if (this.order() === 'desc') {
        return a.id > b.id ? -1 : 1
      } else {
        return a.id > b.id ? 1 : -1
      }
    })
  );

  private tasksService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  subscription?: Subscription;

  constructor() {}

  ngOnInit(): void {
    console.log(this.order);
    this.subscription = this.activatedRoute.queryParams.subscribe({
      next: (queryParams) => {
        console.log(queryParams);
        this.order.set(queryParams['order']);
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
