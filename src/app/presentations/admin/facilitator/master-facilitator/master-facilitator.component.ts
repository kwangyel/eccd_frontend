import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { UserDTO } from 'src/app/core/dataservice/users-and-auth/dto/user.dto';

@Component({
  selector: 'app-master-facilitator',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './master-facilitator.component.html',
  styleUrl: './master-facilitator.component.scss'
})
export class AdminFacilitatorComponent {
  facilitators: UserDTO[] = [
    {
      id: 1,
      nameEnglish: 'Facilitator 1',
      cid: '1234567890',
      email: 'facilitator1@gmail.com',
      phoneNumber: 1234567890,
      avatarUri: 'assets/images/avatar.png',
      hasLoginAccess: false
    },
    {
      id: 2,
      nameEnglish: 'Facilitator 2',
      cid: '1234567890',
      email: 'facilitator2@gmail.com',
      phoneNumber: 1234567890,
      avatarUri: 'assets/images/avatar.png',
      hasLoginAccess: false
    },
  ];

  openAddFacilitatorModal() {
  }

}
