import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../../core/services/task/task.service';
import { Task } from '../models/task';
import { ToastrService } from 'ngx-toastr';
import { SendInfoService } from '../../../core/services/sendInfo/send-info.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.sass'
})
export class TaskFormComponent {
  private fb = inject(FormBuilder);
  private toastService = inject(ToastrService);
  private _taskService = inject(TaskService);
  private _sendService = inject(SendInfoService);
  public task: FormGroup;
  constructor(){
    this.task = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(1)]],
      state: [false],
    });
  }

  createTask(){
    const form = this.task.value;
    const body: Task = {
      title: form.title,
      state: form.state,
      createdAt: new Date().toISOString()
    };
    this._taskService.createTask(body).subscribe({
      next:(value) =>{
          this.toastService.success("Se agrego la tarea con éxito", "Excelente");
          this._sendService.refreshListTask.emit(true);
          this.task.reset({
            title: '',
            state: false
          });
      },
      error:(err)=> {
        this.toastService.info("No se agrego la tarea", "Oops")
      },
    })
  }
}
