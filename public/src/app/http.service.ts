import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAllPets() {
  	return this._http.get('/api/pets');
  }

  createPet(pet) {
  	return this._http.post('/pets/add', pet);
  }

  retrievePet(id) {
  	return this._http.get('/api/pets/' + id);
  }

  retrieveSkill(id) {
  	return this._http.get('/api/skills/' + id);
  }

  sendPetLike(id) {
  	return this._http.put('/pets/' + id + '/like', id);
  }

  sendAdoptPet(id) {
  	return this._http.delete('/pets/' + id + '/adopt', id);
  }

  sendUpdatePet(id, pet) {
  	return this._http.put('/pets/' + id + '/edit', pet);
  }
}
