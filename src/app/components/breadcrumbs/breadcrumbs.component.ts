import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit {
  routesNames!: string[];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.computeRouteNames();

    this.router.events
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.computeRouteNames();
        }
      });
  }

  private computeRouteNames(): void {
    this.routesNames = this.router.url.split('/')
      .filter((routeName) => {
        return routeName !== '' && isNaN(parseInt(routeName))
      })
      .map((routeName) => {
        return routeName.toUpperCase();
      });
  }
}
