import { Component, OnInit } from '@angular/core';
import PouchDB from 'pouchdb';
import { BULK_DOCS } from '../data';


@Component({
  selector: 'app-bulk',
  templateUrl: './bulk.component.html',
  styleUrls: ['./bulk.component.css']
})
export class BulkComponent implements OnInit {

  bulkDocs = BULK_DOCS;
  db: any;
  message: string;
  text: string;

  constructor() {
    this.db = new PouchDB('bulk-data');

    PouchDB.on('created', database => {
      this.message = `${database} opened successfully`;
    });

  }
  ngOnInit() {
  }

  addMultipleDocs() {
    this.cleanMessageArea();
    this.db
    .bulkDocs(this.bulkDocs)
    .then(res => {
      this.message = 'Multiple documents has been added';
      this.text = JSON.stringify(res, null, '\t');
    })
    .catch(err => {
      this.message = err;
    });
  }

  getAllDocsIdsAndRevs() {
    this.cleanMessageArea();

    this.db
      .allDocs()
      .then(res => {
        this.message = res.total_rows;
        this.text = JSON.stringify(res, null, '\t');
      })
      .catch(err => this.message = err );
  }

  getAllDocuments() {
    this.cleanMessageArea();

    this.db
      .allDocs({include_docs: true})
      .then(resp => {
        this.message = `Documents: ${resp.total_rows}`;
        this.text = JSON.stringify(resp, null, '\t');
      })
      .catch(err => {
        this.message = err;
      });

  }

  countDocuments() {
    this.cleanMessageArea();
    this.db
      .allDocs({limit: 0, include_docs: false})
      .then(resp => {
        this.message = `Total documents: ${resp.total_rows}`;
        this.text = JSON.stringify(resp, null, '\t');
      })
      .catch();
  }

  getByRange() {
    this.cleanMessageArea();

    const options = {
      include_docs: true,
      startkey: `job_2010`,
      endkey: 'job_2030'
    };

    // Get the data
    this.db
      .allDocs(options)
      .then(res => {
        this.message = `Total docs: ${res.rows.length}`;
        this.text = JSON.stringify(res, null, '\t');
      })
      .catch(err => this.message = err);
  }

  getAllJobs() {
    this.cleanMessageArea();
    const options = {
      startkey: 'job_',
      endkey: 'job_\ufff0',
      include_docs: true
    };

    this.db
      .allDocs(options)
      .then(res => {
        this.message = `Total: ${res.rows.length}`;
        this.text = JSON.stringify(res, null, '\t');
      })
      .catch(err => this.message = err );
  }

  cleanMessageArea() {
    this.message = '';
    this.text = '';
  }

}
