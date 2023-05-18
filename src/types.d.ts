export interface IHousePhoto {
  id: string;
  file: string;
  description: string;
}

export interface IHouseList {
  id: number;
  name: string;
  country: string;
  city: string;
  description: string;
  price: number;
  rating: number;
  is_host: boolean;
  photos: IHousePhoto[];
}

export interface IHouseHost {
  name: string;
  avatar: string;
  username: string;
}

export interface IAmenity {
  id: number;
  name: string;
  description: string;
}

export interface ICategory {
  id: number;
  name: string;
  kind: string;
}

export interface IHouseDetail extends IHouseList {
  created_at: string;
  updated_at: string;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_allowed: boolean;
  kind: string;
  is_host: boolean;
  is_liked: boolean;
  category: {
    name: string;
    kind: string;
  };
  host: IHouseHost;
  amenities: IAmenity[];
}

export interface IUser {
  username: string;
  name: string;
  avatar: string;
}

export interface IReview {
  user: IUser;
  payload: string;
  rating: number;
}

export interface IMe {
  username: string;
  avatar: string;
  name: string;
  gender: string;
  language: string;
  currency: string;
  is_host: boolean;
  last_login: string;
  date_joined: string;
}

// Form Interface
interface IHouseReigsterForm {
  name: string;
  country: string;
  city: string;
  price: number;
  rooms: number;
  toilets: number;
  description: string;
  address: string;
  pet_allowed: boolean;
  kind: string;
  host: string;
  amenities: number[];
  category: number;
}

// Login Interface
export interface IUserLoginVars {
  username: string;
  password: string;
}

export interface IUserLoginResult {
  result: string;
}

export interface IUserLoginResult {
  result: string;
}

export interface IUseUserResult {
  isUserLoading: Boolean;
  user: IMe | null;
}
