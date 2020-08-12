import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: 'AIzaSyAf59QymwZZ59Ypxr8H86pzZQA7EOAY654',
      authDomain: 'car-wash-back.firebaseapp.com',
      databaseURL: 'https://car-wash-back.firebaseio.com',
      projectId: 'car-wash-back',
      storageBucket: 'car-wash-back.appspot.com',
      messagingSenderId: '1054040103870',
      appId: '1:1054040103870:web:a6d988e11521b3a989b7ef',
    };
    firebase.initializeApp(firebaseConfig);
  }
}
