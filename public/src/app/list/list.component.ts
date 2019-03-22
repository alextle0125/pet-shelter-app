import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pets: any = [];

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	let obs = this._httpService.getAllPets();
  	obs.subscribe(data => {
  	  this.pets = data;
  	});
  }

}
