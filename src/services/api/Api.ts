import { autobind } from 'core-decorators';
import { of, Observable } from 'rxjs';

export class Api {
  @autobind
  // eslint-disable-next-line class-methods-use-this
  public getProjects(): Observable<number[]> {
    return of([1, 2, 3]);
  }
}
