import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  pet: any = { name: "", type: "", description: "" };
  skills: any = [];
  liked: Boolean = false;

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe(params => {
  	  this.getPetDetails(params.id);
  	});
  }

  getPetDetails(id) {
  	let petObs = this._httpService.retrievePet(id);

  	petObs.subscribe(data => {
  	  this.pet = data;
  	  for(var i = 0; i < this.pet.skills.length; i++) {
	    let skillObs = this._httpService.retrieveSkill(this.pet.skills[i]);

	    skillObs.subscribe(data => {
	      this.skills.push(data);
	    });
  	  }
  	});
  }

  likePet(id) {
  	let obs = this._httpService.sendPetLike(id);
  	obs.subscribe(data => {
  	  this.pet = data;
  	  this.liked = true;
  	});
  }

  adoptPet(id) {
  	let obs = this._httpService.sendAdoptPet(id);

  	obs.subscribe(data => {
  		if(data['status'] === 200) {
  			this._router.navigate(['/']);
  		}
  	})
  }
}
