import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { ContentPageService } from './content-service';
import { SpinnerService } from '../services/spinner-service';
// import { EscapeHtmlPipe } from '../../pipes/keep-html.pipe';

@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
  providers: [
    ContentPageService,
    SpinnerService
  ]
})
export class ContentPage {

  movie: any;
  overview: any;
  adult: any;
  genres: any = [];
  popularity: any;
  tagline: any;
  vote_average: any;
  release_date: any;
  runtime: any;
  spoken_languages: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public contentPageService: ContentPageService,
    public spinnerService: SpinnerService
  ) {
    this.spinnerService.show();
    
    // Get the item from page navigation from home page
    this.movie = navParams.get('item');
    console.log(this.movie);

    this.contentPageService.sendMovieDetails(this.movie.id)
      .then((result: any) => {

        this.overview = result.overview;
        this.adult = result.adult;
        this.genres = result.genres;
        this.popularity = result.popularity;
        this.tagline = result.tagline;
        this.vote_average = result.vote_average;
        this.release_date = result.release_date;
        this.runtime = result.runtime;
        this.spoken_languages = result.spoken_languages;

        this.spinnerService.hide();
      })
      .catch((error: any) => {
        this.spinnerService.hide();
        console.log(error);
      });

    // Replace \n to <br /> to display content with formatting in content.html
    // this.news.text = this.news.text.replace(new RegExp('\n', 'g'), "<br />")
    
    // console.log(JSON.stringify(this.news));
    // console.log(this.news.text);
  }

}
