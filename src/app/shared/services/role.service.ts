import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import { Role } from '../models/Role';
@Injectable()
export class RoleService {

  constructor(private authHttp : HttpService) { 
    
  }

  getAllRoles() : Observable<Role[]> {
    return this.authHttp.get('/role')
      .map(res => <Role[]>res.json());
  }

}
