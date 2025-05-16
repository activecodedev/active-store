import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore = inject(Firestore);
  httpClient = inject(HttpClient);

  constructor() {}

  async createRobot(name: string) {
    const docRef = await addDoc(collection(this.firestore, 'items'), {
      name: name,
    });
    console.log('Document written with ID: ', docRef.id);
  }

  getMessage(): Observable<any> {
    return this.httpClient.get('http://localhost:4200/api/test');
  }
}
