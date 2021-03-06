import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ActionSheetController, ModalController, NavController} from '@ionic/angular';
import {PlacesService} from '../../places.service';
import {takeWhile} from 'rxjs/operators';
import {Place} from '../../place.model';
import {CreateBookingComponent} from '../../../bookings/create-booking/create-booking.component';

@Component({
    selector: 'app-place-detail',
    templateUrl: './place-detail.page.html',
    styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
    place: Place;
    private alive = true;

    constructor(private route: ActivatedRoute,
        private navCtrl: NavController,
        private placesService: PlacesService,
        private modalController: ModalController,
        private actionSheetCtrl: ActionSheetController
    ) {
    }

    ngOnInit() {
        this.route.paramMap
            .pipe(takeWhile(() => this.alive))
            .subscribe(paramMap => {
                if (!paramMap.has('placeId')) {
                    this.navCtrl.navigateBack('/places/tabs/discover');
                    return;
                }

                this.placesService.getPlace(paramMap.get('placeId'))
                    .pipe(takeWhile(() => this.alive))
                    .subscribe(place => {
                        this.place = place;
                    });
            });
    }

    onBookPlace() {
        this.actionSheetCtrl.create({
            header: 'Choose an Action',
            buttons: [
                {
                    text: 'Select Date',
                    handler: () => {
                        this.openBookingModal('select');
                    }
                },
                {
                    text: 'Random Date',
                    handler: () => {
                        this.openBookingModal('random');
                    }
                },
                {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        })
            .then(actionSheetEl => {
                actionSheetEl.present();
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    openBookingModal(mode: 'select' | 'random') {
        console.log(mode);
        this.modalController
            .create({
                component: CreateBookingComponent,
                componentProps: {selectedPlace: this.place, selectedMode: mode}
            })
            .then(modalEl => {
                modalEl.present();
                return modalEl.onDidDismiss();
            })
            .then(resultData => {
                console.log(
                    resultData.data,
                    resultData.role
                );
                if (resultData.role === 'confirm') {
                    console.log('BOOK!');
                }
            });
    }
}
