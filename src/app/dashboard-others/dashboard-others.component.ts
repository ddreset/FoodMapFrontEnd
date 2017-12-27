import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { District, Type, Picture, Store } from '../model';
import { MapService } from '../map.service';

import { ModalDirective } from 'ngx-bootstrap/modal';

import { Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-dashboard-others',
  templateUrl: './dashboard-others.component.html',
  styleUrls: ['./dashboard-others.component.css']
})
export class DashboardOthersComponent implements OnInit {

  districts: District[] = [];
  types: Type[] = [];

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.getDistricts();
    this.getTypes();
  }

  getDistricts(): void {
    this.mapService.getDistricts()
      .subscribe(districts => this.districts = districts);
  }

  getTypes(): void {
    this.mapService.getTypes()
      .subscribe(types => this.types = types);
  }

  typeSelected = false;
  districtSelected = false;
  checkedTypeBox: number[] = [];
  checkedDistrictBox: number[] = [];
  currentTab = 'types';

  updateAllCheckBox(){
    if(this.currentTab == 'types'){
      if(this.typeSelected){
        this.checkedTypeBox = [];
        this.types.forEach(type => {this.checkedTypeBox.push(type.id)});
      }else {
        this.checkedTypeBox = [];
      }
    }else if(this.currentTab == 'districts'){
      if(this.districtSelected){
        this.checkedDistrictBox = [];
        this.districts.forEach(district => {this.checkedDistrictBox.push(district.id)});
      }else {
        this.checkedDistrictBox = [];
      }
    }
  }

  updateCheckBox(id: number){
    if(this.currentTab == 'types'){
      const index = this.checkedTypeBox.indexOf(id);
      if(index > -1){
          this.checkedTypeBox.splice(index,1);
      }else {
          this.checkedTypeBox.push(id);
      }
    }else if(this.currentTab == 'districts'){
      const index = this.checkedDistrictBox.indexOf(id);
      if(index > -1){
          this.checkedDistrictBox.splice(index,1);
      }else {
          this.checkedDistrictBox.push(id);
      }
    }
  }


  delete(){
    if(this.currentTab == 'types'){
      this.checkedTypeBox.forEach(id => {this.mapService.deleteItem(id, 'types').subscribe();
      this.types = this.types.filter(s => s.id !== id);});
    }else if(this.currentTab == 'districts'){
      this.checkedDistrictBox.forEach(id => {this.mapService.deleteItem(id, 'districts').subscribe();
      this.districts = this.districts.filter(s => s.id !== id);});
    }
  }

  @ViewChild('childModal') childModal: ModalDirective;
  title: string;
  action: string;
  config: FieldConfig[] = [];

  add() {
    if( this.currentTab == 'types'){
      this.config = [
        {
          type: 'input',
          label: 'Name',
          name: 'name',
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'Type level',
          name: 'type_level',
          optionType: 'array',
          options: [1,2,3],
          validation: [Validators.required]
        },
        {
          type: 'button',
          label: 'Submit',
          name: 'submit'
        }
      ];
    }else if( this.currentTab == 'districts'){
      this.config = [
        {
          type: 'input',
          label: 'Name',
          name: 'name',
          validation: [Validators.required]
        },
        {
          type: 'button',
          label: 'Submit',
          name: 'submit'
        }
      ];
    }
    this.title = 'Create';
    this.action = "add";
    this.childModal.show();
  }

  update(item:any) {
    if( this.currentTab == 'types'){
      this.config = [
        {
          type: 'input',
          label: 'Id',
          name: 'id',
          value: item.id,
          validation: [Validators.required, Validators.minLength(1)],
          fixed: true
        },
        {
          type: 'input',
          label: 'Name',
          name: 'name',
          value: item.name,
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'Type level',
          name: 'type_level',
          optionType: 'array',
          options: [1,2,3],
          value: item.type_level,
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'Status',
          name: 'status',
          optionType: 'array',
          options: [1,0],
          value: item.status,
          validation: [Validators.required]
        },
        {
          type: 'button',
          label: 'Submit',
          name: 'submit'
        }
      ];
    }else if( this.currentTab == 'districts'){
      this.config = [
        {
          type: 'input',
          label: 'Id',
          name: 'id',
          value: item.id,
          validation: [Validators.required, Validators.minLength(1)],
          fixed: true
        },
        {
          type: 'input',
          label: 'Name',
          name: 'name',
          value: item.name,
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'Status',
          name: 'status',
          optionType: 'array',
          options: [1,0],
          value: item.status,
          validation: [Validators.required]
        },
        {
          type: 'button',
          label: 'Submit',
          name: 'submit'
        }
      ];
    }
    this.title = 'Update';
    this.action = "update";
    this.childModal.show();
  }

  updateSubmit(value: {[name: string]: any}) {
    let data = JSON.stringify( value );
    this.mapService.updateItem(data, this.currentTab)
    .subscribe(item => {this.updateItem(item)});
    this.childModal.hide();
  }

  addSubmit(value: {[name: string]: any}) {
    let data = JSON.stringify( value );
    this.mapService.addItem(data, this.currentTab)
    .subscribe(item => {this.addItem(item)});
    this.childModal.hide();
  }

  updateItem(item: any){
    if( this.currentTab == 'types'){
      let itemIndex = this.types.findIndex(type => type.id == item.id);
      this.types[itemIndex] = item;
    }else if( this.currentTab == 'districts'){
      let itemIndex = this.districts.findIndex(district => district.id == item.id);
      this.districts[itemIndex] = item;
    }
  }

  addItem(item: any){
    if( this.currentTab == 'types'){
      this.types.push(item);
    }else if( this.currentTab == 'districts'){
      this.districts.push(item);
    }
  }

}