import { Component, computed, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLinkWithHref],
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  private userService = inject(UsersService);
  private activatedRoute = inject(ActivatedRoute);
  userName: string = '';
  subscription?: Subscription;

  // userName = computed(
  //   () => this.userService.users.find((user) => user.id === this.userId())?.name
  // );

  ngOnInit(): void {
    console.log(this.activatedRoute);
    console.log(this.activatedRoute.snapshot);
    console.log(this.activatedRoute.snapshot.paramMap.get('userId'));
    // this.subscription = this.activatedRoute.snapshot.paramMap.get('userId')
    this.subscription = this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        this.userName =
          this.userService.users.find(
            (user) => user.id === paramMap.get('userId')
          )?.name || '';
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
