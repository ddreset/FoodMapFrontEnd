import { Component, OnInit, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { District, Type, Picture, Store } from '../model';
import { MapService } from '../map.service';

import { BsModalService, ModalDirective  } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-dashboard-stores',
  templateUrl: './dashboard-stores.component.html',
  styleUrls: ['./dashboard-stores.component.css']
})
export class DashboardStoresComponent implements OnInit {

  stores: Store[] = [];
  districts: District[] = [];
  types: Type[] = [];

  constructor(private modalService: BsModalService,
  private mapService: MapService
  ) {}


  ngOnInit() {
    this.getStores();
    this.getDistricts();
    this.getTypes();
  }

  getStores(): void {
    this.mapService.getStores()
      .subscribe(stores => this.stores = stores);
  }

  getDistricts(): void {
    this.mapService.getDistricts()
      .subscribe(districts => this.districts = districts);
  }

  getTypes(): void {
    this.mapService.getTypes()
      .subscribe(types => this.types = types);
  }

  getTypeName(id: number){
    let Index = this.types.findIndex(type => type.id == id);
    if(Index > -1){
      return this.types[Index].name;
    }else{
      return "type not exist";
    }
  }

  getDistrictName(id: number){
    let Index = this.districts.findIndex(district => district.id == id);
    if(Index > -1){
      return this.districts[Index].name;
    }else{
      return "district not exist";
    }
  }

  storeSelected = false;
  districtSelected = false;
  typeSelected = false;
  checkedBox: number[] = [];

  updateAllCheckBox(){
    if(this.storeSelected){
      this.checkedBox = [];
      this.stores.forEach(store => {this.checkedBox.push(store.id)});
    }else {
      this.checkedBox = [];
    }
  }

  updateCheckBox(id: number){
    const index = this.checkedBox.indexOf(id);
    if(index > -1){
        this.checkedBox.splice(index,1);
    }else {
        this.checkedBox.push(id);
    }
  }


  delete(){
    this.checkedBox.forEach(id => {this.mapService.deleteItem(id, 'stores').subscribe();
    this.stores = this.stores.filter(s => s.id !== id);});
  }

  @ViewChild('childModal') childModal: ModalDirective;
  title: string;
  action: string;
  //bsModalRef: BsModalRef;
  config: FieldConfig[] = [];

  add(){
    this.config = [
        {
          type: 'input',
          label: 'Name',
          name: 'name',
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'District',
          name: 'district',
          optionType: 'object',
          options: this.districts,
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'Type',
          name: 'type',
          optionType: 'object',
          options: this.types,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Per floor',
          name: 'per_floor',
        },
        {
          type: 'input',
          label: 'Per ceiling',
          name: 'per_ceiling',
        },
        {
          type: 'input',
          label: 'Contact',
          name: 'contact',
        },
        {
          type: 'input',
          label: 'Address',
          name: 'address',
        },
        {
          type: 'input',
          label: 'Intro',
          name: 'intro',
        },
        {
          type: 'button',
          label: 'Submit',
          name: 'submit'
        }
    ];
    //this.bsModalRef = this.modalService.show(ModalStoresComponent);
    //this.bsModalRef.content.title = 'Create';
    //this.bsModalRef.content.action = 'add';
    //this.bsModalRef.content.config = this.config;
    this.title = 'Create';
    this.action = "add";
    this.childModal.show();
  }

  update(item:any) {
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
          label: 'District',
          name: 'district',
          optionType: 'object',
          options: this.districts,
          value: item.district,
          validation: [Validators.required]
        },
        {
          type: 'select',
          label: 'Type',
          name: 'type',
          optionType: 'object',
          options: this.types,
          value: item.type,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Per floor',
          name: 'per_floor',
          value: item.per_floor
        },
        {
          type: 'input',
          label: 'Per ceiling',
          name: 'per_ceiling',
          value: item.per_ceiling
        },
        {
          type: 'input',
          label: 'Contact',
          name: 'contact',
          value: item.contact
        },
        {
          type: 'input',
          label: 'Address',
          name: 'address',
          value: item.address
        },
        {
          type: 'input',
          label: 'Intro',
          name: 'intro',
          value: item.intro
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
    this.title = 'Update';
    this.action = "update";
    this.childModal.show();
  }

  updateSubmit(value: {[name: string]: any}) {
    let data = JSON.stringify( value );
    this.mapService.updateItem(data, 'stores')
    .subscribe(store => {this.updateItem(store)});
    this.childModal.hide();
  }

  addSubmit(value: {[name: string]: any}) {
    let data = JSON.stringify( value );
    this.mapService.addItem(data, 'stores')
    .subscribe(store => {this.addItem(store)});
    this.childModal.hide();
  }

  updateItem(store: Store){
    let itemIndex = this.stores.findIndex(item => item.id == store.id);
    this.stores[itemIndex] = store;
  }

  addItem(store: Store){
    this.stores.push(store);
  }
}

@Component({
  selector: 'modal-stores-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title pull-left">{{title}}</h4>
      <button type="button" class="close pull-right" aria-label="Close" (click)="bsModalRef.hide()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="app">
        <dynamic-form
          [config]="config"
          #form="dynamicForm"
          (submit)="submit($event)">
        </dynamic-form>
      </div>
    </div>
    <!--<div class="modal-footer">
      <button type="button" class="btn btn-default" (click)="bsModalRef.hide()">Close</button>
    </div>-->
  `
})

export class ModalStoresComponent {
  title: string;
  action: string;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  config: FieldConfig[] = [];
  item: any[] = [];
  @Output() changeItem = new EventEmitter<any>();
  
  constructor(public bsModalRef: BsModalRef,
  private mapService: MapService) { }

  submit(value: {[name: string]: any}) {
    let data = JSON.stringify( value );
    if(this.action == 'update'){
      this.mapService.updateItem(data, 'stores')
     .subscribe();
    }else if(this.action == 'add'){
      this.mapService.addItem(data, 'stores')
     .subscribe(item => {this.item = item;this.changeItem.emit(this.item);});
    }
    this.bsModalRef.hide();
  }
}