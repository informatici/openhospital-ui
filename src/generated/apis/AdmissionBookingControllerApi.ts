import { Observable } from "rxjs";
import { BaseAPI } from "../runtime";

export class AdmissionBookingControllerApi extends BaseAPI {
  /*
   * getAdmissionBookings
   */
  getAdmissionBookingsUsingGET(): Observable<any> {
    return this.request<boolean>({
      url: '/admissions/bookings',
      method: 'GET'
    });
  }
}
