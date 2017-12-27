import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { District, Type, Picture, Store } from '../model';
import { MapService } from '../map.service';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { Validators } from '@angular/forms';
import { FieldConfig } from '../dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from '../dynamic-form/containers/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-dashboard-pictures',
  templateUrl: './dashboard-pictures.component.html',
  styleUrls: ['./dashboard-pictures.component.css']
})
export class DashboardPicturesComponent implements OnInit {

  stores: Store[] = [];
  storeIds: string[] = [];
  pictures: Picture[] = [];

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.getStores();
    this.getPictures();
  }

  getStores(): void {
    this.mapService.getStores()
      .subscribe(stores => {this.stores = stores;
      stores.forEach(store => this.storeIds.push(store.name))});
  }

  getPictures(): void {
    this.mapService.getPictures()
      .subscribe(pics => this.pictures = pics);
  }

  getStoreName(id: number){
    let storeIndex = this.stores.findIndex(store => store.id == id);
    if(storeIndex > -1){
      return this.stores[storeIndex].name;
    }else{
      return "store not exist";
    }
  }

  @ViewChild('picModal') picModal: ModalDirective;
  title: string;
  base64: string;

  showPic(pic: string){
    let index = pic.indexOf(".");
    let picName = pic.substring(0,index);
    let suffix = pic.substring(index+1);
    this.mapService.downLoadPic(picName, suffix)
    .subscribe(pics => this.base64 = pics);
    this.title = pic;
    this.picModal.show();
  }

  pictureSelected = false;
  checkedBox: number[] = [];

  updateAllCheckBox(){
    if(this.pictureSelected){
      this.checkedBox = [];
      this.pictures.forEach(picture => {this.checkedBox.push(picture.id)});
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
    this.checkedBox.forEach(id => {this.mapService.deleteItem(id, 'pics').subscribe();
    this.pictures = this.pictures.filter(s => s.id !== id);});
  }

  @ViewChild('childModal') childModal: ModalDirective;
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  action = 'update';
  config: FieldConfig[] = [];
  uploadFile: File;
  file: File;
  previousValid = false;

  changeFile(files: any){
    this.previousValid = this.form.valid;
    this.form.setDisabled('submit', !this.previousValid);
    if(files != null){
      this.file = files[0];
      this.form.setValue('pic', "");
    }
    
  }

  add(){
    this.config = [
        {
          type: 'input',
          label: 'Store',
          name: 'storeId',
          typeahead: this.storeIds,
          typeaheadScrollable: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Picture',
          name: 'pic'
        },
        {
          type: 'file',
          label: 'Or Upload Picture',
          name: 'picFile'
        },
        {
          type: 'button',
          label: 'Submitt',
          name: 'submit',
          disabled: true
        }
    ];
    this.title = 'Create';
    this.action = "add";
    this.childModal.show();
    console.log(this.file);
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
          label: 'Store',
          name: 'storeId',
          value: this.getStoreName(item.storeId),
          typeahead: this.storeIds,
          typeaheadScrollable: true,
          validation: [Validators.required]
        },
        {
          type: 'input',
          label: 'Picture',
          name: 'pic',
          value: item.pic,
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
    this.title = 'Update';
    this.action = "update";
    this.childModal.show();
  }

  updateSubmit(value: {[name: string]: any}) {
    let index = this.stores.findIndex(item => item.name == value.storeId);
    value.storeId = this.stores[index].id;
    let data = JSON.stringify( value );
    this.mapService.updateItem(data, 'pics')
    .subscribe(picture => {this.updateItem(picture)});
    this.childModal.hide();
  }

  addSubmit(value: {[name: string]: any}) {
    if(value.pic == ""){
      let index = this.stores.findIndex(item => item.name == value.storeId);
      value.storeId = this.stores[index].id;
      let formdata: FormData = new FormData();
      formdata.append('file', this.file);
      this.mapService.uploadPic(this.file, value.storeId)
      .subscribe(picture => {this.addItem(picture)});
    }else{
      let index = this.stores.findIndex(item => item.name == value.storeId);
      value.storeId = this.stores[index].id;
      let data = JSON.stringify( value );
      this.mapService.addItem(data, 'pics')
      .subscribe(picture => {this.addItem(picture)});
    }
    this.childModal.hide();
  }

  updateItem(picture: Picture){
    let itemIndex = this.pictures.findIndex(item => item.id == picture.id);
    this.pictures[itemIndex] = picture;
  }

  addItem(picture: Picture){
    this.pictures.push(picture);
  }
}