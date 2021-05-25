import {Observable} from "rxjs";


export default abstract class ApiAbstract extends Observable<any>{
  abstract get(): Promise<any>

}
