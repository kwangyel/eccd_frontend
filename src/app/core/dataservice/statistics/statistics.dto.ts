import { BuildingDTO } from '../../dto/properties/building.dto';

export interface AdminSummaryStatisticsDTO {
    buildingCount: number;
    unitCount: number;

    activeLeaseCount: number;
    totalRentalIncome: number;
    pendingPaymentAmount: number;
    pendingPaymentAdviceCount: number;

    thramCount: number;
    plotCount: number;
    ownerCount: number;
}

export interface OccupancyDTO {
    "occupiedUnits": number;
    "totalUnits": number;
}

export interface PropertyStats {
    "totalThrams": number;
    "totalPlots": number;
    "totalBuildings": number;
    "totalUnits": number;
}