import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TheMovieDBService } from '../services/api/themoviedb.service';
import { ModalService } from '../services/modal.service';



@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  searchValue: string;
  selectedValue: any;
  page: number;
  searchCardContainer: any = [];
  loadingCurrentEventData: any;

  modelType = 'movie';
  sliderContainer: any = [];
  generosList: any = [];
  generoSelectedValue: any;
  generoSelectedId: string;
  appCardContainer: any = [];


  constructor(
    private service: TheMovieDBService,
    private modalService: ModalService
    ) {
    this.searchValue = '';
    this.selectedValue = 'movie';
  }
  ngOnInit(): void {
    this.initSliderList();
    this.initGenerosList();
    this.initPopularList();
  }



  filterList() {
    this.page = 1;
    this.searchCardContainer = [];

    if (this.searchValue.length > 2) {
      this.loadSearchContainer();
    }

  }
  loadSearchContainer() {
    this.service.getSearchList(this.selectedValue, this.page, this.searchValue).subscribe(res => {
      //console.log(res);
      //console.log(this.selectedValue);
      res.results.forEach(el => {
        this.searchCardContainer.push({
          id: el.id,
          title: this.selectedValue==='movie'?el.title:el.name,
          description: el.overview,
          image: (el.backdrop_path || el.poster_path)?('http://image.tmdb.org/t/p/original/' +
          (el.backdrop_path || el.poster_path)):
          'https://www.delivery.sv/a/img/no-disponible.png',
          rating: el.vote_average,
          modelItem: el
        });
      });
      if (this.page > 1) {
        this.loadingCurrentEventData.target.complete();
        if (res.results.length === 0) {
          this.loadingCurrentEventData.target.disabled = true;
        }
      }

    });
  }



  initSliderList(): void {
    this.service.getTrendingList(this.selectedValue).
    subscribe(res =>{
      res.results.forEach(el => {
        this.sliderContainer.push({
          id: el.id,
          title: el.title,
          image: ('http://image.tmdb.org/t/p/original' + el.backdrop_path),
          posterPath: ('http://image.tmdb.org/t/p/original' + el.poster_path),
          modelItem: el
        });
      });
    });
  }
  initGenerosList(){
    this.service.getGeneros(this.selectedValue).subscribe(res => {
      res.genres.forEach(el => this.generosList.push(el));
    });
  }
  genSelectChange(event){
    const generoVal = event.detail.value;
    if (generoVal.length > 0 || this.generoSelectedId != null) {
      this.searchCardContainer = [];
      this.searchValue = '';
      this.page = 1;
      this.generoSelectedId = generoVal.toString();
      this.fillPopulares();
    }
  };
  initPopularList(){
    this.page = 1;
    this.generoSelectedId = '';
    this.fillPopulares();
  }
  fillPopulares(){
    this.service.getPopulares(this.selectedValue, this.page, this.generoSelectedId).subscribe(res => {
      res.results.forEach(el =>{
        this.searchCardContainer.push({
          id: el.id,
          title: el.title,
          description: el.overview,
          image: (el.backdrop_path || el.poster_path)?('http://image.tmdb.org/t/p/original/' +
          (el.backdrop_path || el.poster_path)):
          'https://www.delivery.sv/a/img/no-disponible.png',
          rating: el.vote_average,
          modelItem: el
        });
      });
      if (this.page>1) {
        this.loadingCurrentEventData.target.complete();
        if(res.results.length === 0) {
          this.loadingCurrentEventData.target.disabled = true;
        }
      }
    });
  }




  loadData(event) {
    this.page = this.page + 1;
    this.loadingCurrentEventData = event;
    this.loadSearchContainer();
    this.fillPopulares();
  }

  selectionChanged() {
    this.searchCardContainer = [];
    this.searchValue = '';
    this.page = 1;
  }

  cardEventListener(modelItem) {
    forkJoin(this.service.getDetalleById(this.selectedValue, modelItem.id),
      this.service.getCreditosById(this.selectedValue, modelItem.id),
      this.service.getVideosById(this.selectedValue, modelItem.id)).subscribe(res=>{
      modelItem.detailResponse = res[0];
      modelItem.creditsResponse = res[1];
      modelItem.videos = res[2];
      this.modalService.presentModal(modelItem, this.selectedValue);
    });




  }









}
