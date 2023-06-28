import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NonNullableFormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { Course } from '../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  //No Angular, sempre que temos um grupo de campos, ele se chama 'FormGroup'
  form = this.formBuilder.group({
    _id: [''],
    name: [''],
    category: [''],
  });

  //Essa injeção do 'FormBuilder' tem toda a lógica que nos ajuda a criar o nosso 'FormGroup'
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private service: CoursesService,
    private snackBar: MatSnackBar,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const course: Course = this.route.snapshot.data['course'];
    this.form.setValue({
      _id: course._id,
      name: course.name,
      category: course.category
    });
  }

  onSubmit() {
    this.service.save(this.form.value)
      .subscribe(result => this.onSuccess(),
      error => this.onError());

    this.location.back();
  }

  onCancel() {
    this.location.back();
  }

  private onSuccess() {
    this.snackBar.open('Curso salvo com sucesso.', '', {duration: 4000});
  }

  private onError() {
    this.snackBar.open('Erro ao salvar curso.', '', {duration: 3000});
  }
}
