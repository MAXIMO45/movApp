import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import {Storage} from '@capacitor/storage';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})
export class IntroGuard implements CanLoad {
  constructor(private router: Router) {}
  async canLoad(): Promise<boolean> {
    const hasSeenIntro = await Storage.get({key: INTRO_KEY});
    if (hasSeenIntro && (hasSeenIntro.value === 'true')) {
      return true;
    }{
      this.router.navigateByUrl('/intro',{ replaceUrl: true});
      return true;
    }
  }
}
