import { environment } from 'src/environments/environment';
import { AuthMode } from './auth.enum';
import { InMemoryAuthService } from './auth.in-memory.service';
import { FirebaseAuthService } from './auth.firebase.service';
import { CustomAuthService } from './auth.custom.service';

export function authFactory() {
  switch (environment.authMode) {
    case AuthMode.InMemory:
      return new InMemoryAuthService();
    case AuthMode.Firebase:
      return new FirebaseAuthService();
    case AuthMode.CustomServer:
      return new CustomAuthService();
  }
}
