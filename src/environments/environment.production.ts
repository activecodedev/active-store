import { AuthMode } from '@/auth/auth.enum';

export const environment = {
  production: true,
  baseUrl: 'http://localhost:4000',
  authMode: AuthMode.CustomServer,
  firebase: {
    apiKey: 'AIzaSyCb5Ufc-LmXFvn5qUs3sd4RGP-qQxZHwZU',
    authDomain: 'active-store-main.firebaseapp.com',
    databaseURL:
      'https://active-store-main-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'active-store-main',
    storageBucket: 'active-store-main.firebasestorage.app',
    messagingSenderId: '714876997259',
    appId: '1:714876997259:web:1fae03d16e0849710b4e8e',
    measurementId: 'G-CCFRV8XNR7',
  },
};
