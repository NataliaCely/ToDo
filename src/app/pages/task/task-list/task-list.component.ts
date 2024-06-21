import { Component,  OnDestroy, OnInit, inject } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
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
  public page: number = 1;
  private readonly _destroying$ = new Subject<void>();
  constructor(){
    this.getTask();
  }
  ngOnInit(): void {
    this.refresTask();
  }

  ngOnDestroy(): void{
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
  getTask(){
    this._taskService.getAllTask().subscribe(task =>this.taskList = task);
  }
  refresTask(){
    this._sendService.refreshListTask.pipe(takeUntil(this._destroying$))
    .subscribe((data) => {
      if(data === true){
        this.getTask();
      }
    });
  }
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

}
