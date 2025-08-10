import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../constants/constants';
import { BuildingDTO, BuildingRentalDTO } from '../dto/properties/building.dto';
import { UnitDTO } from '../dto/units/unit.dto';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ExcelGeneratorDataService {
    apiUrl = environment.API_URL;

    constructor(private http: HttpClient) { }

    DownloadThramsByAdminId(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/thram/admin/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    GetBuildingRentalJson(data: BuildingRentalDTO): Observable<UnitDTO[]> {
        return this.http.get<UnitDTO[]>(`${this.apiUrl}/excel-generator/owners/rental-sheet-json/${data.buildingId}/${data.year}`);
    }

    DownloadRentalSheetByOwnerBuildingIdYear(data:BuildingRentalDTO){
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/owners/rental-sheet/${data.buildingId}/${data.year}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }


    DownloadOwnersByAdmin(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/owners/admin/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadPlotsByAdminId(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/plots/admin/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadBuildingsByAdminId(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/buildings/admin/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadUnitsByAdmin(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/units/admin/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadUnitsByBuildingAdmin(buildingId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/units/building/${buildingId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    //UNIT LEASE AGREEMENT

    DownloadAllUnitLeaseAgreementByAdmin(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/unit/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadAllActiveUnitLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/unit/active/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadAllPendingUnitLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/unit/pending/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadAllExpiringSoonUnitLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/unit/upcoming-expiration/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    //Building Lease
    DownloadAllBuildingLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/building/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadAllActiveBuildingLeaseByAdmin(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/building/active/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadAllPendingBuildingLeaseByAdmin(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/building/pending/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadAllUpcomingExpirationBuildingLeaseByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/building/upcoming-expiration/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    //Land Lease
    DownloadAllLandLeaseAgreementByAdmin(adminId: number): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/land/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    DownloadAllActiveLandLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/land/active/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadAllPendingLandLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/land/pending/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadAllUpcomingExpirationLandLeaseAgreementByAdmin(
        adminId: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/lease-agreement/admin/land/upcoming-expiration/${adminId}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }

    //PAYMENT STATUS

    DownloadBuildingFlatPaymentStatusByAdminMonth(
        adminId: number,
        year: number,
        month: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/payment-status/admin/${adminId}/building/monthly/${year}/${month}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
    DownloadLandPaymentStatusByAdminMonth(
        adminId: number,
        year: number,
        month: number
    ): Observable<Blob> {
        return this.http.get<Blob>(
            `${this.apiUrl}/excel-generator/payment-status/admin/${adminId}/land/monthly/${year}/${month}`,
            {
                responseType: 'blob' as 'json',
            }
        );
    }
}
