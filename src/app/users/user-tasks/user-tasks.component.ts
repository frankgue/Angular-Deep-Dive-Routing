import { Component, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import {
  RouterOutlet,
  RouterLinkWithHref,
  ResolveFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLinkWithHref],
})
export class UserTasksComponent implements OnInit {
  message = input.required<string>();
  userName = input.required<string>();
  subscription?: Subscription;

  ngOnInit(): void {
      
  }

  // ngOnDestroy(): void {
  //   this.subscription?.unsubscribe();
  // }
}

export const resolveUserName: ResolveFn<string> = (
  activatedRouteSnapshot,
  routerState
) => {
  const userService = inject(UsersService);
  const userName =
    userService.users.find(
      (user) => user.id === activatedRouteSnapshot.paramMap.get('userId')
    )?.name || '';

  return userName;
};

export const resolveTitle: ResolveFn<string> = (activatedRouteSnapshot, routerState) => {
    return resolveUserName(activatedRouteSnapshot, routerState) + '\'s Tasks';
}
