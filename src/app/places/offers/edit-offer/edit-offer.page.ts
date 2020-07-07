import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlacesService} from '../../places.service';
import {LoadingController, NavController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {Place} from '../../place.model';
import {takeWhile} from 'rxjs/operators';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-edit-offer',
    templateUrl: './edit-offer.page.html',
    styleUrls: ['./edit-offer.page.scss'],
})
export class EditOfferPage implements OnInit, OnDestroy {
    place: Place;
    form: FormGroup;
    private alive = true;

    constructor(
        private navCtrl: NavController,
        private placesService: PlacesService,
        private route: ActivatedRoute,
        private router: Router,
        private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        this.route.paramMap.pipe(takeWhile(() => this.alive))
            .subscribe(paramMap => {
                if (!paramMap.has('placeId')) {
                    this.navCtrl.navigateBack('/place/tabs/offers');
                    return;
                }
                this.placesService.getPlace(paramMap.get('placeId'))
                    .pipe(takeWhile(() => this.alive))
                    .subscribe(place => {
                        this.place = place;
                    });
                this.form = new FormGroup({
                    title: new FormControl(
                        this.place.title,
                        {
                            updateOn: 'blur',
                            validators: [Validators.required]
                        }
                    ),
                    description: new FormControl(
                        this.place.description,
                        {
                            updateOn: 'blur',
                            validators: [Validators.required, Validators.maxLength(180)]
                        }
                    ),
                });
            });
    }

    ngOnDestroy() {
        this.alive = false;
    }

    onUpdateOffer() {
        if (!this.form.valid) {
            return;
        }
        this.loadingCtrl.create({
            message: 'Updating place...'
        }).then(loadingEl => {
            loadingEl.present();
            this.placesService.updatePlace(
                this.place.id,
                this.form.value.title,
                this.form.value.description
            ).subscribe(() => {
                loadingEl.dismiss();
                this.form.reset();
                this.router.navigate((['/[places/tabs/offers']));
            });
        });
    }
}
