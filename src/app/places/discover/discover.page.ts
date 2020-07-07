import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../places.service';
import {Place} from '../place.model';
import {Subscription} from 'rxjs';
import {AuthService} from '../../auth/auth.service';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.page.html',
    styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {
    loadedPlaces: Place[];
    listedLoadedPlaces: Place[];
    relevantPlaces: Place[];
    private placesSub: Subscription;

    constructor(
        private placesService: PlacesService,
        private authService: AuthService
    ) {
    }

    ngOnInit() {
        this.placesService.places.subscribe(places => {
            this.loadedPlaces = places;
            this.relevantPlaces = this.loadedPlaces;
            this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        });
    }

    onFilterUpdate(event: CustomEvent) {
        if (event.detail.value === 'all') {
            this.relevantPlaces = this.loadedPlaces;
            this.relevantPlaces = this.relevantPlaces.slice(1);
        } else {
            this.relevantPlaces = this.loadedPlaces.filter(place => place.userId !== this.authService.userId);

        }
        console.log(event.detail);
    }

    ngOnDestroy() {
        if (this.placesSub) {
            this.placesSub.unsubscribe();
        }
    }

}
