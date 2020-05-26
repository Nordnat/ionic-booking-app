import {Injectable} from '@angular/core';
import {Place} from './place.model';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    constructor() {
    }

    private _places: Place[] = [
        new Place(
            'p1',
            'Manhattan Mansion',
            'Blah blah blah',
            'https://img4.goodfon.com/wallpaper/nbig/1/58/grand-theft-auto-v-gta-5-game-city-gta-v.jpg',
            800
        ),
        new Place(
            'p2',
            'Los Angeles',
            'Blah blah blah 2',
            'https://steamuserimages-a.akamaihd.net/ugc/948465293062193788/6D0BFEB72B7648A5813E07093A6638369039B010/',
            900
        ),
        new Place(
            'p3',
            'Palace',
            'Blah blah blah 3',
            'https://img.gta5-mods.com/q95/images/vice-v/f4c440-UW4sweJ.jpg',
            1000
        )
    ];

    get places(): Place[] {
        return [...this._places];
    }

    getPlace(id: string) {
        return {...this._places.find(el => el.id === id)};
    }
}
