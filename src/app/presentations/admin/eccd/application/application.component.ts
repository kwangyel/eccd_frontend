import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ApplicationStatus, FacilityStatus, ProductType } from 'src/app/core/constants/enums';
import { ApplicationDTO } from 'src/app/core/dto/eccd/application.dto';

@Component({
  selector: 'app-application',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './application.component.html',
  styleUrl: './application.component.scss'
})
export class ApplicationComponent {
  applications: ApplicationDTO[] = [];

  ngOnInit(): void {
    this.getApplications();
  }

  openAddApplicationModal(): void {
    console.log('openAddApplicationModal');
  }

  getApplications(): void {
    this.applications = [
      {
        id: 0,
        applicationId: '1234567890',
        applicationDate: new Date(),
        facilityId: 0,
        studentId: 0,
        productId: 0,
        staartDate: new Date(),
        endDate: new Date(),
        status: ApplicationStatus.PENDING,
        facility: {
          id: 0,
          name: 'SDf',
          description: '',
          address: '',
          latitude: 0,
          longitude: 0,
          status: FacilityStatus.ACTIVE,
          capacity: 0,
          ownerId: 0
        },
        student: {
          id: 0,
          nameEnglish: 'Student 1',
          cid: '1234567890',
          email: 'student1@gmail.com',
          phoneNumber: 1234567890,
          avatarUri: 'assets/images/avatar.png',
          hasLoginAccess: false
        },
        product: {
          id: 0,
          name: 'Product 1',
          description: 'Description 1',
          price: 1000,
          type: ProductType.GOODS,
          isSale: false,
          isPurchase: false,
          gst: 0,
          unit: 'Unit 1'
        }
      },
      {
        id: 1,
        applicationId: '1234567890',
        applicationDate: new Date(),
        facilityId: 1,
        studentId: 1,
        productId: 1,
        staartDate: new Date(),
        endDate: new Date(),
        status: ApplicationStatus.APPROVED,
        facility: {
          id: 1,
          name: 'Facility 2',
          description: 'Description 2',
          address: 'Address 2',
          latitude: 2,
          longitude: 2,
          status: FacilityStatus.ACTIVE,
          capacity: 0,
          ownerId: 0
        },
      },
    ];
  }
}
