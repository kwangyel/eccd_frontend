import { USERROLESENUM } from './enums';

export const TENANTSIDEBARITEMS = [
    {
        label: 'Home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/tenant'],
            },
            {
                label: 'Lease',
                icon: 'pi pi-fw pi-file-o',
                routerLink: ['/tenant/lease'],
            },
            {
                label: 'Payments',
                icon: 'pi pi-fw pi-money-bill',
                routerLink: ['/tenant/payments'],
            },
            {
                label: 'Notifications',
                icon: 'pi pi-fw pi-bell',
                routerLink: ['/tenant/notifications'],
            },

            {
                label: 'Profile',
                icon: 'pi pi-fw pi-user',
                routerLink: ['/tenant/profile'],
            },
        ],
    },
];

export const ADMINSIDEBARITEMS = [
    {
        label: 'Home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/admin'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
        ],
    },

    {
        label: 'Facilities',
        items: [
            {
                label: 'Centers',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-facility'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Facilitators',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-facilitator'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Students',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-users/students'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
        ],
    },
    {
        label: 'Clients',
        items: [
            {
                label: 'Products',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-product'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Invoices',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-product/invoices'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Payments',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-product/payments'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Customers',
                icon: 'pi pi-fw pi-search',
                routerLink: ['/admin/master-product/customers'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
        ],
    },
    {
        label: 'Vendors',
        items: [
            {
                label: 'Bills',
                icon: 'pi pi-fw pi-file-excel',
                routerLink: ['/admin/master-vendor/bills'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Payments',
                icon: 'pi pi-fw pi-file-excel',
                routerLink: ['/admin/master-product/payments'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
            {
                label: 'Vendors',
                icon: 'pi pi-fw pi-file-excel',
                routerLink: ['/admin/master-vendor/vendors'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            }
        ],
    },

    {
        label: 'Reports',
        items: [
            {
                label: 'Balance Sheet',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/reports/balance-sheet'],
                roles: [USERROLESENUM.ADMIN],
            },
            {
                label: 'Profit and Loss',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/reports/profit-and-loss'],
                roles: [USERROLESENUM.ADMIN],
            },
            {
                label: 'Tax Reports',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/reports/tax-reports'],
                roles: [USERROLESENUM.ADMIN],
            }
        ],
    },
    {
        label: 'Users',
        items: [
            {
                label: 'Center Director',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-users/managers'],
                roles: [USERROLESENUM.ADMIN],
            },
            {
                label: 'Facilitator',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-users/tenants'],
                roles: [USERROLESENUM.ADMIN, USERROLESENUM.MANAGER],
            },
        ],
    },
    {
        label: 'System',
        items: [
            {
                label: 'Roles',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-roles'],
                roles: [USERROLESENUM.ADMIN],
            },
            {
                label: 'Bank Accounts',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/master-bank-accounts'],
                roles: [USERROLESENUM.ADMIN],
            },
            {
                label: 'Setttings',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/admin/system-settings'],
                roles: [USERROLESENUM.ADMIN],
            },
        ],
    },
];

export const OWNERSIDEBARITEMS = [
    {
        label: 'Home',
        items: [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/owner'],
            },
        ],
    },
    {
        label: 'Properties',
        items: [
            {
                label: 'Plots & Buildings',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/properties/plots'],
            },
        ],
    },

    {
        label: 'Lease',
        items: [
            {
                label: 'Listings',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/lease/listing'],
            },
            {
                label: 'Unit Lease ',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/lease/unit-lease'],
            },
            {
                label: 'Building Lease ',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/lease/building-lease'],
            },
            {
                label: 'Land Lease ',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/lease/land-lease'],
            },
        ],
    },
    {
        label: 'Payments',
        items: [
            {
                label: 'Payments',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/payments/payments'],
            },
            {
                label: 'Tax Reports',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/payments/tax-report-building-list'],
            },
        ],
    },
    {
        label: 'Smart Devices',
        items: [
            {
                label: 'Buildings',
                icon: 'pi pi-fw pi-th-large',
                routerLink: ['/owner/devices/building-list'],
            },
        ],
    }
];
