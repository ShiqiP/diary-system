import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs'

export class PublicService {
  #http = inject(HttpClient);

  signin$ = (data: { email: string; password: string }) =>
    this.#http
      .post<{ token: string; }>('/signin', data)
      .pipe(
        tap(data => {
          sessionStorage.setItem('token', data.token);
        })
      );

  constructor() { }
}
