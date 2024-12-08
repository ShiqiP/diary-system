import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export class PublicService {
  #http = inject(HttpClient)

  signin$ = (data: { email: string, password: string }) => this.#http.post('/signin', data)
  constructor() { }
}
