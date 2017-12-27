export class Districts {
  districts:District[]
}
export class District {
  id: number;
  name: string;
  status: number;
}

export class Types {
  types:Type[]
}
export class Type {
  id: number;
  name: string;
  type_level: number;
  status: number;
}

export class Pictures {
  pictures:Picture[]
}
export class Picture {
  id: number;
  storeId: number;
  pic: string;
  status: number;
}

export class Stores {
  stores:Store[]
}
export class Store {
  id: number;
  name: string;
  district: number;
  type: number;
  per_floor: number;
  per_ceiling: number;
  contact: string;
  address: string;
  intro: string;
  status: number;
}