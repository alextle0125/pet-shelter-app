import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  formStatus: any = [];
  petId: String = "";
  editPet: any = { name: "", type: "", description: "", skill_1: "", skill_2: "", skill_3: "" };
  skills: any = [];

  constructor(private _httpService: HttpService, private _route: ActivatedRoute, private _router: Router) { 
  }

  ngOnInit() {
  	this._route.params.subscribe(params => {
  	  this.petId = params.id;
  	  this.getPetDetails(params.id);
  	});
  }

  getPetDetails(id) {
  	let petObs = this._httpService.retrievePet(id);

  	petObs.subscribe(data => {
  	  this.editPet = data;
  	  if(this.editPet.skills.length > 0){
  	  	let len = this.editPet.skills.length,
  	  		skills = [];
	  	for(var i = 0; i < this.editPet.skills.length; i++) {
		  let skillObs = this._httpService.retrieveSkill(this.editPet.skills[i]);

		  skillObs.subscribe(data => {
		  	if(skills.length < len) {
			  skills.push(data);
		  	}
		  	if(skills.length === len) {
		  		this.editPet.skill_1 = skills[0].description;
		  	}
		  	if (skills.length === 2) {
		  		this.editPet.skill_2 = skills[1].description;
		  	} else if (skills.length === 3) {
		  		this.editPet.skill_3 = skills[2].description;
		  	}
		  });
	  	}
  	  }
  	});
  }

  updatePet(event: any): void {
  	let obs = this._httpService.sendUpdatePet(this.petId, this.editPet);
  	obs.subscribe(data => {
  		if(data['status'] === 200) {
  			this._router.navigate(['/pets/show/' + this.petId]);
  		} else {
  			this.formStatus = data;
  		}
  	});
  }

  cancelEditPet(event: any): void {
  	this._router.navigate(['/']);
  }
}
