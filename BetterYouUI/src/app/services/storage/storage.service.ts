import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  removeStorage(key: string): boolean {
    try {
      localStorage.removeItem(key);
      localStorage.removeItem(key + '_expiresIn');
    } catch (e) {
      return false;
    }
    return true;
  }


  getStorage(key: string) {
    var now = Date.now();
    var expiresIn = localStorage.getItem(key + '_expiresIn');
    var expiresInSeconds: number;


    if (!expiresIn) {
      expiresInSeconds = 0;
    } else {
      expiresInSeconds = parseInt(expiresIn);
    }


    if (expiresInSeconds < now) {
      this.removeStorage(key);
      return null;
    } else {
      var value = localStorage.getItem(key);
      return value;
    }
  }


  setStorage(key: string, value: string, expires?: number): boolean {
    if (!expires) {
      expires = (1 * 60 * 60);
    } else {
      expires = Math.abs(expires);
    }


    var now = Date.now();
    var schedule = now + expires * 1000;
    try {
      localStorage.setItem(key, value);
      localStorage.setItem(key + '_expiresIn', schedule.toString());
    } catch (e) {
      return false;
    }
    return true;
  }
}
