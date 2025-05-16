import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
} from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCb5Ufc-LmXFvn5qUs3sd4RGP-qQxZHwZU',
  authDomain: 'active-store-main.firebaseapp.com',
  databaseURL:
    'https://active-store-main-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'active-store-main',
  storageBucket: 'active-store-main.firebasestorage.app',
  messagingSenderId: '714876997259',
  appId: '1:714876997259:web:1fae03d16e0849710b4e8e',
  measurementId: 'G-CCFRV8XNR7',
};

export const appConfig: ApplicationConfig = {
  providers: [
    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // provideFirestore(() => getFirestore()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withEnabledBlockingInitialNavigation()
    ),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
          cssLayer: {
            name: 'primeng',
            order: 'theme, base, primeng',
          },
        },
      },
    }),
    provideHttpClient(withFetch()),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'active-store-main',
        appId: '1:714876997259:web:1fae03d16e0849710b4e8e',
        databaseURL:
          'https://active-store-main-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'active-store-main.firebasestorage.app',
        apiKey: 'AIzaSyCb5Ufc-LmXFvn5qUs3sd4RGP-qQxZHwZU',
        authDomain: 'active-store-main.firebaseapp.com',
        messagingSenderId: '714876997259',
        measurementId: 'G-CCFRV8XNR7',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
