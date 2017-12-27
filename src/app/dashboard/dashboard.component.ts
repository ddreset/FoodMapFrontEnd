import { Component, OnInit } from '@angular/core';

import { MapService } from '../map.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  isCollapsed: boolean = true; 
  collapsed(event: any): void {
    //console.log(event);
  }
  expanded(event: any): void {
    //console.log(event);
  }

  content : string;
  currentTable = 'app-dashboard-stores';
 
  constructor(private mapService: MapService,
  private route: ActivatedRoute,
  private location: Location) { }
 
  ngOnInit() {
    this.getContent();
  }
 
  getContent(): void {
    this.content = this.route.snapshot.paramMap.get('content');
  }
}