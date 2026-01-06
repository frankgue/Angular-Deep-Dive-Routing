import { Route, Routes } from '@angular/router';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TasksComponent } from '../tasks/tasks.component';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksComponent,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];
