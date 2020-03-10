import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { JOB } from './../data';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CRUDComponent implements OnInit {
  job = JOB;
  db: any;
  message: string;
  text: {};

  
  public constructor() {
    this.db = new PouchDB('testdb');

    PouchDB.on('created', (testdb) => {
      console.log(`${testdb} opened successfully`);
      this.message = `${testdb} opened successfully`;
    });

  }

  ngOnInit() {

  }

  addJob() {
    this.text = '';
    this.db
      .put(this.job)
      .then(res => {
        this.message = 'Job added succesfully';
        this.text = JSON.stringify( res, null, '\t');
      })
      .catch(err => {
        this.message = JSON.stringify(err);
      });

  }
  getJob() {
    this.text = '';
    this.message = '';
    this.db.get('job_001')
      .then(doc => {
        this.text = JSON.stringify(doc, null, '\t');
      })
      .catch(err => this.message = err);
  }
  updateJob() {
    this.text = '';
    this.message = '';
    this.db.get('job_001')
      .then(doc => {
        doc.serviceDate = '2000-00-00';
        doc.technician.name = 'Kolundžić, David';
        return this.db.put(doc);
      })
      .then(res => {
        this.message = 'Job updated';
        this.text = JSON.stringify(res, null, '\t');
      });
  }
}
