import { Component } from '@angular/core';
import { TaskFormComponent } from './task-form/task-form.component';
import { TaskListComponent } from './task-list/task-list.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.sass'
})
export class TaskComponent {

}
