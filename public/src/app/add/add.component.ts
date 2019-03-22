import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  formStatus: any = [];
  newPet: any = { name: "", type: "", description: "", skill_1: "", skill_2: "", skill_3: "" };

  constructor(private _httpService: HttpService, private _router: Router) { }

  ngOnInit() {
  }

  addPet(event: any): void {
  	let obs = this._httpService.createPet(this.newPet);
  	obs.subscribe(data => {
  		console.log(data);
  		this.formStatus = data;
  		if(this.formStatus.status === 200){
  			this._router.navigate(['/']);
  		}
  	});
  }

}
