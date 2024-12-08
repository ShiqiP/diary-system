import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PublicService } from '../../service/public.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  providers: [PublicService],
  selector: 'app-signin',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SigninComponent {
  #publicService = inject(PublicService);

  //form
  form = inject(FormBuilder).nonNullable.group({
    email: [
      'shiqipam@gmail.com',
      {
        validators: [Validators.required, Validators.email],
      },
    ],
    password: [
      '123456',
      {
        validators: [Validators.required],
      },
    ],
  });
  get email() {
    return this.form.controls.email;
  }
  get password() {
    return this.form.controls.password;
  }

  handleSubmit() {
    if (!this.form.valid) return;
    this.#publicService
      .signin$({
        email: this.form.value.email || '',
        password: this.form.value.password || '',
      })
      .subscribe()
  }

  //pwd
  pwdHide = signal(true);
  pwdIconClick(event: MouseEvent) {
    this.pwdHide.set(!this.pwdHide());
    event.stopPropagation();
  }

  //email
  errorMessage = signal('');
  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }
}
