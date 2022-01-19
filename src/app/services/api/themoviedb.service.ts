import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TheMovieDBService {
  constructor(
    private http: HttpClient
  ) { }
  getGeneros(type: string): Observable<any>{
    const requestURL = `https://api.themoviedb.org/3/genre/${type}/list?api_key=${environment.apiKey}&language=es-MX`;
    return this.http.get(requestURL);
  }
  getTrendingList(type: string): Observable<any>{
    const requestURL = `https://api.themoviedb.org/3/trending/${type}/day?api_key=${environment.apiKey}&language=es-MX`;
    return this.http.get(requestURL);
  }
  getPopulares(type: string, page: number, genres: string): Observable<any>{
    const requestURL =
    `https://api.themoviedb.org/3/${type}/popular?api_key=${environment.apiKey}&language=es-MX&page=${page}&with_genres=${genres}`;
    return this.http.get(requestURL);
  }
  getDetalleById(type: string, id: string): Observable<any>{
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}?api_key=${environment.apiKey}&language=es-MX`;
    return this.http.get(requestURL);
  }
  getCreditosById(type: string, id: string): Observable<any>{
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${environment.apiKey}&language=es-MX`;
    return this.http.get(requestURL);
  }
  getVideosById(type: string, id: string): Observable<any>{
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/videos?api_key=${environment.apiKey}&language=es-MX`;
    return this.http.get(requestURL);
  }
  getRecomendacionesById(type: string, id: string): Observable<any>{
    const requestURL = `https://api.themoviedb.org/3/${type}/${id}/recommendations?api_key=${environment.apiKey}&language=es-MX`;
    return this.http.get(requestURL);
  }
  getSearchList(type: string, page: number, query: string): Observable<any> {
    const requestURL =
    `https://api.themoviedb.org/3/search/${type}?api_key=${environment.apiKey}&language=es-MX&page=${page}&query=${query}`;
    return this.http.get(requestURL);
  }
}
