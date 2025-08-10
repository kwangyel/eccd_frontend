import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../../constants/constants';
import { AdminSummaryStatisticsDTO, OccupancyDTO, PropertyStats } from './statistics.dto';

@Injectable({
    providedIn: 'root',
})
export class StatsDataService {
    apiUrl = API_URL + "/statistics";

    constructor(private http: HttpClient) { }

    GetSummaryStatsByAdmin(adminId: number): Observable<AdminSummaryStatisticsDTO> {
        return this.http.get<AdminSummaryStatisticsDTO>(
            `${this.apiUrl}/admin/${adminId}`
        );
    }

    GetTotalMonthlyRevenue(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/owner/totalRevenue`);
    }

    GetOccupancy(): Observable<OccupancyDTO> {
        return this.http.get<OccupancyDTO>(`${this.apiUrl}/owner/occupancy`);
    }

    GetDueAmount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/owner/dueAmount`);
    }

    GetPropertyStatus(): Observable<PropertyStats> {
        return this.http.get<PropertyStats>(`${this.apiUrl}/owner/property`);
    }
}

