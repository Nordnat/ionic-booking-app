import {Injectable} from '@angular/core';
import {Place} from './place.model';
import {AuthService} from '../auth/auth.service';
import {BehaviorSubject, Observable} from 'rxjs';
import {delay, map, take, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    constructor(private authService: AuthService) {
    }

    private _places = new BehaviorSubject<Place[]>([
        new Place(
            'p1',
            'Manhattan Mansion',
            'Blah blah blah',
            'https://img4.goodfon.com/wallpaper/nbig/1/58/grand-theft-auto-v-gta-5-game-city-gta-v.jpg',
            800,
            new Date('2019-12-31'),
            new Date('2020-12-31'),
            'sadsda'
        ),
        new Place(
            'p2',
            'Los Angeles',
            'Blah blah blah 2',
            'https://steamuserimages-a.akamaihd.net/ugc/948465293062193788/6D0BFEB72B7648A5813E07093A6638369039B010/',
            900,
            new Date('2019-12-31'),
            new Date('2020-12-31'),
            'asd'
        ),
        new Place(
            'p3',
            'Palace',
            'Blah blah blah 3',
            'https://img.gta5-mods.com/q95/images/vice-v/f4c440-UW4sweJ.jpg',
            1000,
            new Date('2019-12-31'),
            new Date('2020-12-31'),
            'asd'
        )
    ]);

    get places(): Observable<Place[]> {
        return this._places.asObservable();
    }

    getPlace(id: string): Observable<Place> {
        return this.places.pipe(
            take(1),
            map(places => {
                return {...places.find(el => el.id === id)};
            })
        );
    }

    addPlace(
        title: string,
        description: string,
        price: number,
        dateFrom: Date,
        dateTo: Date
    ) {
        const newPlace = new Place(
            Math.random()
                .toString(),
            title,
            description,
            'https://img.gta5-mods.com/q95/images/vice-v/f4c440-UW4sweJ.jpg',
            price,
            dateFrom,
            dateTo,
            this.authService.userId
        );
        return this.places.pipe(
            take(1),
            delay(1000),
            tap((places) => {
                this._places.next(places.concat(newPlace));
            })
        );
    }

    updatePlace(
        placeId: string,
        title: string,
        description: string
    ) {
        return this.places.pipe(
            take(1),
            delay(1000),
            tap(places => {
                const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
                const updatedPlaces = [...places];
                const oldPlace = updatedPlaces[updatedPlaceIndex];
                updatedPlaces[updatedPlaceIndex] = new Place(
                    oldPlace.id,
                    title,
                    description,
                    oldPlace.image,
                    oldPlace.price,
                    oldPlace.availableFrom,
                    oldPlace.availableTo,
                    oldPlace.userId
                );
                this._places.next(updatedPlaces);
            })
        );
    }
}
