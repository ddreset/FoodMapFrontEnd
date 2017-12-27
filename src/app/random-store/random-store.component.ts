import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { District, Type, Picture, Store } from '../model';

@Component({
  selector: 'app-random-store',
  templateUrl: './random-store.component.html',
  styleUrls: ['./random-store.component.css']
})
export class RandomStoreComponent implements OnInit {

  constructor(private userService: UserService) { }

  districts: District[] = [];
  types: Type[] = [];
  store: Store; 
  base64: string[] = [];

  ngOnInit() {
    this.getDistricts();
    this.getTypes();
  }

  getDistricts(): void {
    this.userService.getDistricts()
      //.subscribe(data => data.forEach(district=>this.districts.push(district)));
      .subscribe(districts => this.districts = districts);
  }

  getTypes(): void {
    this.userService.getTypes()
      //.subscribe(data => data.forEach(type=>this.types.push(type)));
      .subscribe(types => this.types = types);
  }

  selectD = 0;
  selectT = 0;
  random() {
    this.userService.getRandomStore(Number(this.selectD),Number(this.selectT))
      .subscribe(data => {this.store = data["store"];this.getBase64(data["pics"]);});
  }

  price(){
    let floor = Number(this.store.per_floor);
    let ceiling = Number(this.store.per_ceiling);
    if(floor == ceiling){
        return floor;
    }else if(floor != ceiling){
        return floor + "-" + ceiling;
    }
  }

  getBase64(pics: Picture[]){
    this.base64 = [];
    if(pics != null){
        pics.forEach(item => {
            let index = item.pic.indexOf(".");
            let picName = item.pic.substring(0,index);
            let suffix = item.pic.substring(index+1);
            this.userService.downLoadPic(picName, suffix)
            .subscribe(picdata => {if(picdata != null) this.base64.push(picdata)});
        })
    }
  }

}
