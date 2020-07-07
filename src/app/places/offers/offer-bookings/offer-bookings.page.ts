import {Component, OnDestroy, OnInit} from '@angular/core';
import {Place} from '../../place.model';
import {ActivatedRoute} from '@angular/router';
import {takeWhile} from 'rxjs/operators';
import {NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';

@Component({
  selector: 'app-offer-bookings',
  templateUrl: './offer-bookings.page.html',
  styleUrls: ['./offer-bookings.page.scss'],
})
export class OfferBookingsPage implements OnInit, OnDestroy {
  place: Place;
  private alive = true;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.pipe(takeWhile(() => this.alive )).subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.placesService.getPlace(paramMap.get('placeId'))
          .pipe(takeWhile(() => this.alive)).subscribe(place => {
            this.place = place;
      });
    });
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
