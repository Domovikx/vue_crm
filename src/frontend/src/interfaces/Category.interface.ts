// TODO UserCategory => Category

export interface UserCategory {
  id?: any;
  title?: any;
  limit?: any;
}

export interface Categories extends Array<UserCategory> {}
