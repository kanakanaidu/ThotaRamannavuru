import { Injectable } from '@angular/core';
import { v4 } from 'uuid';
import { FileElement } from '../file-explorer/model/element';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export interface IFileService {
  // tslint:disable-next-line: typedef
  add(fileElement: FileElement);
  // tslint:disable-next-line: typedef
  delete(id: string);
  // tslint:disable-next-line: typedef
  update(id: string, update: Partial<FileElement>);
  queryInFolder(folderId: string): Observable<FileElement[]>;
  get(id: string): FileElement;
}

@Injectable()
export class FileService implements IFileService {

  private map = new Map<string, FileElement>();

  constructor() { }

  // tslint:disable-next-line: typedef
  add(fileElement: FileElement) {
    fileElement.id = v4();
    this.map.set(fileElement.id, this.clone(fileElement));
    return fileElement;
  }

  // tslint:disable-next-line: typedef
  delete(id: string) {
    this.map.delete(id);
  }

  // tslint:disable-next-line: typedef
  update(id: string, update: Partial<FileElement>) {
    let element = this.map.get(id);
    element = Object.assign(element, update);
    this.map.set(element.id, element);
  }

  private querySubject: BehaviorSubject<FileElement[]>;
  // tslint:disable-next-line: typedef
  queryInFolder(folderId: string) {
    const result: FileElement[] = [];
    this.map.forEach(element => {
      if (element.parent === folderId) {
        result.push(this.clone(element));
      }
    });
    if (!this.querySubject) {
      this.querySubject = new BehaviorSubject(result);
    } else {
      this.querySubject.next(result);
    }
    return this.querySubject.asObservable();
  }

  // tslint:disable-next-line: typedef
  get(id: string) {
    return this.map.get(id);
  }

  // tslint:disable-next-line: typedef
  clone(element: FileElement) {
    return JSON.parse(JSON.stringify(element));
  }

}
