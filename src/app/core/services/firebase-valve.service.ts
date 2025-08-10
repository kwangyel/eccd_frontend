import { Injectable } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getDatabase, Database, ref, set, onValue, off, DatabaseReference } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ValveData {
  position: number;
  status: string;
  last_updated: string;
  error?: string;
}

export interface ValveConnectionStatus {
  connected: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseValveService {
  private app: FirebaseApp | null = null;
  private database: Database | null = null;
  private valveRef: DatabaseReference | null = null;
  
  private valveDataSubject = new BehaviorSubject<ValveData | null>(null);
  private connectionStatusSubject = new BehaviorSubject<ValveConnectionStatus>({
    connected: false,
    message: 'Not Connected'
  });

  public valveData$ = this.valveDataSubject.asObservable();
  public connectionStatus$ = this.connectionStatusSubject.asObservable();

  constructor() {
    this.initializeFirebase();
  }

  private initializeFirebase(): void {
    try {
      const firebaseConfig = {
        databaseURL: environment.firebase.databaseURL,
        projectId: environment.firebase.projectId
      };

      this.app = initializeApp(firebaseConfig);
      this.database = getDatabase(this.app);
      
      // Listen for valve status updates
      this.valveRef = ref(this.database, 'device/esp8266_tp_1');
      
      onValue(this.valveRef, (snapshot) => {
        const data = snapshot.val();
        console.log('Valve status updated:', data);
        
        if (data) {
          this.valveDataSubject.next(data);
        }
      }, (error) => {
        console.error('Firebase listener error:', error);
        this.connectionStatusSubject.next({
          connected: false,
          message: 'Connection error: ' + error.message
        });
      });

      this.connectionStatusSubject.next({
        connected: true,
        message: 'Connected to Firebase'
      });

    } catch (error: any) {
      console.error('Firebase initialization error:', error);
      this.connectionStatusSubject.next({
        connected: false,
        message: 'Failed to connect to Firebase: ' + error.message
      });
    }
  }

  async setValvePosition(position: number): Promise<void> {
    if (!this.database || !this.valveRef) {
      throw new Error('Firebase not initialized');
    }

    try {
      const positionRef = ref(this.database, 'device/esp8266_tp_1/position');
      const statusRef = ref(this.database, 'device/esp8266_tp_1/status');
      
      // Set position
      await set(positionRef, parseInt(position.toString()));
      
      // Set status based on position
      const status = this.getPositionLabel(position);
      await set(statusRef, status);
      
      console.log('Position updated successfully to:', position);
    } catch (error: any) {
      console.error('Error updating position:', error);
      throw new Error('Failed to update position: ' + error.message);
    }
  }

  private getPositionLabel(position: number): string {
    if (position === 0) return 'OPEN';
    if (position === 90) return 'CLOSED';
    return 'PARTIAL';
  }

  getCurrentValveData(): ValveData | null {
    return this.valveDataSubject.value;
  }

  getConnectionStatus(): ValveConnectionStatus {
    return this.connectionStatusSubject.value;
  }

  isConnected(): boolean {
    return this.connectionStatusSubject.value.connected;
  }

  disconnect(): void {
    if (this.valveRef) {
      off(this.valveRef);
    }
    this.connectionStatusSubject.next({
      connected: false,
      message: 'Disconnected'
    });
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
