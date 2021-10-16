import { Injectable } from '@angular/core';
import { MessageService } from "./message.service";

import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class HeroService {
  heroes?: Hero[] = [];

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    http.options("", { 'headers': headers });
  }

 
  getHeroes(): Observable<any> {
    return this.http.get<Hero>("https://localhost:44304/api/TourOfHeroes/GetAllHeroes");
  }
  getHero(id:number): Observable<Hero> {
   return this.http.get<Hero>("https://localhost:44304/api/TourOfHeroes/GetHero/" + id);
  }
  updateHero(hero: Hero): Observable<any> {
    return this.http.post<Hero>("https://localhost:44304/api/TourOfHeroes/UpdateHero", hero);
  }
  removeHero(id: number): Observable<any> {
    return this.http.get<Hero[]>("https://localhost:44304/api/TourOfHeroes/RemoveHero/" + id);
  }
}
