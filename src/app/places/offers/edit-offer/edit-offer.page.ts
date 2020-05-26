import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../places.service';
import {NavController} from '@ionic/angular';
import {ActivatedRoute} from '@angular/router';
import {Place} from '../../place.model';
import {takeWhile} from 'rxjs/operators';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    place: Place;
    private alive = true;

    constructor(private navCtrl: NavController, private placesService: PlacesService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(takeWhile(() => this.alive)).subscribe(paramMap => {
            if (!paramMap.has('placeId')) {
                this.navCtrl.navigateBack('/place/tabs/offers');
                return;
            }
            this.place = this.placesService.getPlace(paramMap.get('placeId'));
        });
    }

    ngOnDestroy() {
        this.alive = false;
    }
}
