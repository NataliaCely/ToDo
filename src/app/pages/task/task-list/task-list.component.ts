import { Component,  OnDestroy, OnInit, inject } from '@angular/core';
import { BehaviorSubject, Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { Task, TaskList } from '../models/task';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from '../../../core/services/task/task.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { SendInfoService } from '../../../core/services/sendInfo/send-info.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [AsyncPipe,  NgClass, NgxPaginationModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.sass'
})
export class TaskListComponent implements  OnInit,  OnDestroy{
  private toastService = inject(ToastrService);
  private _taskService = inject(TaskService);
  private _sendService = inject(SendInfoService);
  public taskList: TaskList[] = [];
  public listFiltered: TaskList[] = [];
  public page: number = 1;
  searchTerm$ = new BehaviorSubject<string>('');
  private readonly _destroying$ = new Subject<void>();
  constructor(){
    this.getTask();
  }
  ngOnInit(): void {
    this.refresTask();
    this.filterList();
  }

  ngOnDestroy(): void{
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
/**
 * The `getTask` function retrieves all tasks from a service, assigns them to `taskList`, and then
 * filters the list.
 */
  getTask(): void {
    this._taskService.getAllTask().subscribe(
      task => {
        this.taskList = task;
        this.filterList();
      },
      error => {
        console.error('Error al obtener las tareas', error);
      }
    );
  }
/**
 * The `refresTask` function subscribes to a refresh event and calls the `getTask` method when the
 * event is triggered.
 */
  refresTask(){
    this._sendService.refreshListTask.pipe(takeUntil(this._destroying$))
    .subscribe((data) => {
      if(data === true){
        this.getTask();
      }
    });
  }
/**
 * The `updateTask` function updates a task's state based on a user event and sends a request to update
 * the task through a service.
 */
  updateTask(task: any, event: any){
    const newState = event.target.checked;
    const body: Task = {
      title: task.title,
      state: newState,
      createdAt: new Date().toISOString()
    };
    this._taskService.updateTask(task.id, body).subscribe({
      next:(value)=> {
        this.toastService.success("Se actualizo la tarea con éxito", "Excelente")
        this._sendService.refreshListTask.emit(true);
      },
      error:(err)=> {
        this.toastService.info("No se actualizo la tarea", "Oops")
      },
    })
   }
/**
 * The `deleteTask` function sends a request to delete a task and displays a success or error message
 * accordingly.
 */
  deleteTask(task:any){
    this._taskService.deleteTask(task.id).subscribe({
      next:(value)=> {
        this.toastService.success("Se elimino la tarea con éxito", "Excelente");
        this._sendService.refreshListTask.emit(true);
      },
      error:(err)=> {
        this.toastService.info("No se elimino la tarea", "Oops")
      },
    })
  }
/**
 * The `filterList` function filters a list of tasks based on a search term input with debouncing and
 * distinctUntilChanged operators.
 */
  filterList(): void {
    this.searchTerm$
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this._destroying$)
      )
      .subscribe(term => {
        this.listFiltered = this.taskList.filter(item =>
          item.title.toLowerCase().includes(term.toLowerCase())
        );
      });
  }
/**
 * The `handleSearch` function in TypeScript trims the input value and emits it to an observable
 * stream.
 */
  handleSearch(event: any): void {
    const searchTerm = event.target.value.trim();
    this.searchTerm$.next(searchTerm);
  }
}
