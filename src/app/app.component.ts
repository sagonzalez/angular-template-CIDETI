import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { SessionService } from './services/session.serv';
import { trigger, transition, style, animate } from '@angular/animations';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ transform: 'translateY(-56px)' }),
        animate('400ms cubic-bezier(.25,.8,.25,1)')
      ]),
      transition(':leave', [
        animate('400ms cubic-bezier(.25,.8,.25,1)', style({ transform: 'translateY(-56px)' }))
      ])
    ])
  ],
  providers: [
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'ja-JP' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  @ViewChild('sidemenu') sidemenu: SidemenuComponent;

  title = 'app';
  user$: Observable<any>;
  smallScreen: boolean;
  mode = 'side';
  notifyOptions = {
    position: ['bottom', 'left'],
    timeOut: 4000,
    animate: 'fromLeft',
    maxStack: 5
  };
  constructor(
    private adapter: DateAdapter<any>,
    private router: Router,
    private session: SessionService) {
    this.adapter.setLocale('esp');  // calendar config
  } // constructor()

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.configureSidenav();
  }
  ngOnInit() {
    this.configureSidenav();
    this.router.navigate(['/login']);
    this.user$ = this.session.user;
  }

  onMenu() {
    this.sidenav.toggle();
  }

  onMenuItem() {
    if (!this.smallScreen) {
      return;
    } else if (this.smallScreen && this.sidemenu.getSelectedOption() !== 'header') {
      this.sidenav.close();
    }
  }

  private configureSidenav() {
    this.smallScreen = window.innerWidth < 841;
    this.mode = this.smallScreen ? 'over' : 'side';
  }
}// class