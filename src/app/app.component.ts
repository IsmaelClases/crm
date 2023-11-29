import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRoute, Router, NavigationStart, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AppRADFPD';
  rutaRelativa: string;
  response: boolean;
  isDisplayNavbar = false;
  constructor(
              private authService: AuthService,
              // private activeRoute: ActivatedRoute,
              private router: Router
              ) {
    this.canDisplayNavbar();
  }

  canDisplayNavbar() {

      // console.log(new NavigationStart(0, 'http://localhost:4200/') instanceof NavigationStart);

      this.router.events.subscribe(async (event: RouterEvent) => {
        if (event instanceof NavigationStart) {
          // Navigation started.
          // console.log('cambio de url');
          this.rutaRelativa = event.url;

          const response = await this.authService.isAuthenticated(this.rutaRelativa);

          if (response) {
            this.isDisplayNavbar = true;
          }
        }
      });
    }

}
