import { Observable } from "rxjs";
import { BaseAPI } from "../runtime";

export class SurgicalRecordControllerApi extends BaseAPI {
  /*
   * getSurgicalRecords
   */
  getSurgicalRecordsUsingGET(): Observable<any> {
    return this.request<boolean>({
      url: '/admissions/surgical-records',
      method: 'GET'
    });
  }
}
