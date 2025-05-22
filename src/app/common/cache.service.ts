import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  platformId = inject(PLATFORM_ID);

  public getItem<T>(key: string, hydrator?: (data: never) => T): T | null {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem(key);

      if (data !== null) {
        try {
          const parsedData = JSON.parse(data) as never;
          return hydrator ? hydrator(parsedData) : parsedData;
        } catch (error) {
          console.error('Parsing error:', error);
          return null;
        }
      }
    }
    return null;
  }

  public setItem(key: string, data: object | string) {
    if (isPlatformBrowser(this.platformId)) {
      if (typeof data === 'string') {
        localStorage.setItem(key, data);
      }
      localStorage.setItem(key, JSON.stringify(data));
    }
  }

  public removeItem(key: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }

  public clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
}
