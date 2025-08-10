import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../constants/constants';
import { UnitDTO } from '../../dto/units/unit.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CreateListingDTO, ListingDTO } from '../land/dto/plot.dto';
import { PaginatedData, PaginatedParamsOptions } from '../../dto/paginated-data.dto';

@Injectable({
    providedIn: 'root',
})
export class ListingsDataService {
    apiUrl = environment.API_URL;

    constructor(private http: HttpClient) { }

    GetUnitListings(): Observable<UnitDTO[]> {
        return this.http.get<UnitDTO[]>(`${this.apiUrl}/unit/listings/vacant`);
    }

    GetApplicationForm(uuId: string): Observable<ApplicationFormDto> {
        return this.http.get<ApplicationFormDto>(`${this.apiUrl}/lease-application/${uuId}`);
    }

    SubmitApplicationForm(dto: CreateLeaseApplicationEntryDto): Observable<CreateLeaseApplicationEntryDto> {
        return this.http.post<CreateLeaseApplicationEntryDto>(`${this.apiUrl}/lease-application-entry`, dto);
    }

    CreateListing(dto: CreateListingDTO) {
        return this.http.post<CreateListingDTO>(`${this.apiUrl}/listings`, dto)
    }

    GetAllListingsPaginated(params?: PaginatedParamsOptions) {
        return this.http.get<PaginatedData<ListingDTO>>(`${this.apiUrl}/listings/active/paginated`)
    }

    UnListByUnitIt(unitId: number): Observable<void> {
        return this.http.patch<void>(`${this.apiUrl}/listings/markInactive/unit/${unitId}`, {});
    }
}

export interface CreateLeaseApplicationEntryDto {
    name: string;
    cid: string;
    phoneNumber: string;
    noOfTenants: number;
    haveCar: boolean;
    occupation: string;
    previousLandlord?: string;
    leaseApplicationId?: number;
    applicationUuId: string; // Assuming this is needed to link to the lease application
}

export interface ApplicationFormDto {
    name: string;
    uuId: string;
    isActive: boolean;
}
