import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import PouchDB from 'pouchdb';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {

  db: any;
  message: string;
  text: any;
  videopath: any;

  videos = [
    { name: 'crystal' },
    { name: 'elf' },
    { name: 'frog' },
    { name: 'monster' },
    { name: 'pig' },
    { name: 'rabbit' }
  ];

  constructor(private changeDetectorRef: ChangeDetectorRef, private sanitizier: DomSanitizer) {
    this.db = new PouchDB('video_list');
    PouchDB.on('created', database => {
      this.message = `Database ${database} opened successfully.`;
    });
  }

  ngOnInit() {
    // this.videopath = '';
    // this.fetchFromNetwork(this.videos[1]);
  }
  fetchAndStoreFromNetwork(video, index) {

    this.message += ` - Fetching ${video.name} video. Index ${index} `;
    fetch(`../../assets/video-store/${video.name}.mp4`)
      .then(response => {
        return response.blob();
      })
      .then(blobvideo => {
        this.message += `Size ${(blobvideo.size / Math.pow(1024, 2)).toFixed(2)}mb,  type=${blobvideo.type}`;
       
        console.log(video);

        this.addVideoToPouchDb(blobvideo, index);

        /* ************
          RADI VIDEO PLAYER
          napraviti konverziju kad se dohvati iz indexeddb
          izradi blob url zatim sanitaze zbog angulara
          ************ */
        // const videoUrl = URL.createObjectURL(blobvideo);
        // this.videopath = this.sanitizier.bypassSecurityTrustUrl(videoUrl);
      })
      .catch(err => {
        this.message = err;
        return null;
      });

    /*
        Promise.all([mp4Blob]).then(values => {
          let videoUrl = URL.createObjectURL(values[0]);
          this.videopath = this.sanitizier.bypassSecurityTrustUrl(videoUrl);
          this.text = this.videopath;
        });
    */
  }
  // getVideoFromDb() {
  //   this.db.getAttachment('video_4')
  //     .then(b => {
  //       const videoUrl = URL.createObjectURL(b);
  //       this.videopath = this.sanitizier.bypassSecurityTrustUrl(videoUrl);
  //     });
  // }
  addVideoToPouchDb(video, index) {
    console.log('POČNI SPREMANJE '+ index);
    // Dohvaćanje sa mreže kao blob
    // spremanje zatim kao attachment
    // Spramanje u Indexeddb
    // let record = {
    //   _id: `video_0${index}`,
    //   _attachments: {
    //     'video' : {
    //       content_type: `video/mp4`,
    //       data: video
    //     }
    //   },
    //   name: `${this.videos[index].name}`
    // };
    this.db
      .putAttachment(`video_0${index}`, 'elf.mp4', video, 'video/mp4')
      .then(r => {
        console.log('Put video in Attachment');
        console.log(r);
      }).catch(err => {
        console.log(`ERROR: ${err}`);
      });

  }
  playVideoFromPouchDb(id){
    this.message= `Play video:  ${id}`;
    this.db
      .getAttachment(id, 'elf.mp4')
      .then(blob => {
        //this.text= JSON.stringify(doc);
        // this.displayVideo(blob, 'naslov');
        const videoUrl = URL.createObjectURL(blob);
         this.videopath = this.sanitizier.bypassSecurityTrustUrl(videoUrl);
      })
      .catch(err => {
        this.text = JSON.stringify(err, null, '\t');
      });
  }
  deleteVideoFromPouchDb(id){
    this.message = `Delete video id: ${id}`;
    this.db
      .get(id)
      .then(doc =>{
        // DELETE DOCUMENT
        return this.db.remove(doc)
      })
      .then(r => {
        this.message += ' Job deleted.';
        this.text = JSON.stringify(r, null, '\t');
      })
  }

  displayVideo(mp4Blob, title) {
    // Create object URLs out of the blobs
    let section = document.querySelector('section');
    console.log(mp4Blob);
    let mp4URL = mp4Blob;
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    h2.textContent = title;
    const video = document.createElement('video');
    const source = document.createElement('source');
    source.src = mp4URL;
    source.type = 'video/mp4';

    //* Embed DOM elements into page
    section.appendChild(article);
    article.appendChild(h2);
    article.appendChild(video);
    video.appendChild(source);
    video.play();
  }

}
