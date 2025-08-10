import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/constants';
import { environment } from 'src/environments/environment';

export interface RoleDTO {
    name: string;
    description: string;
}

@Injectable({
    providedIn: 'root',
})
export class RolesDataService {
    apiUrl = environment.API_URL;

    constructor(private http: HttpClient) {}

    GetAllRoles(): Observable<RoleDTO[]> {
        return this.http.get<RoleDTO[]>(`${this.apiUrl}/role`);
    }
}
