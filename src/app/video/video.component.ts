import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import PouchDB from 'pouchdb';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {

  db: any;
  messageTime: string;
  message: string;
  text: any;
  videopath: any;

  storedVideos: any;

  videos = [
    { id: 'video_00', name: 'crystal', stored: false },
    { id: 'video_01', name: 'elf', stored: false },
    { id: 'video_02', name: 'frog', stored: false },
    { id: 'video_03', name: 'monster', stored: false },
    { id: 'video_04', name: 'pig', stored: false },
    { id: 'video_05', name: 'rabbit', stored: false },
    { id: 'video_06', name: 'elf2', stored: false }
  ];

  constructor(private changeDetectorRef: ChangeDetectorRef, private sanitizier: DomSanitizer) {
    this.db = new PouchDB('video_list');
    PouchDB.on('created', database => {
      this.message = `Database ${database} opened successfully.`;
    });
  }

  @ViewChild('player', { static: false }) player: ElementRef;

  ngOnInit() {
    // this.videopath = '';
    // this.fetchFromNetwork(this.videos[1]);
  }

  ngAfterViewInit() {
    this.checkWhichInPouchDb();
  }
  checkWhichInPouchDb() {
    const options = {
      startkey: 'video_',
      endkey: 'video_\ufff0'
    };
    this.db
      .allDocs(options)
      .then(r => {
        console.log('U bazi su', r);
        r.rows.map(row => {
          this.videos.find(c => c.id === row.id).stored = true;
        });
      })
      .catch(err => {
        console.log(err);
      });

  }
  storedInPouchdb(media, index) {
    let model = true;


    return model;
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
    console.log('POČNI SPREMANJE ' + index);
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
  testParams(video, i) {
    this.message = `Name: ${video.name}, i: ${i}`;
  }
  playVideo(video) {
    console.log('PLAY VIDEO');
    console.log(video);
   // this.message = 'Index: ' + this.videos.findIndex(v => v.name === video.name);
   // this.message += ' Name ' + this.videos.find(v => v.name === video.name).name;
    if (video) {
     // const index = this.videos.findIndex(v => v.name === video.name);
      this.db
        .get(`${video.id}`)
        .then(res => {
          this.message += ` In db: true`;
          this.text = JSON.stringify(res, null, '\n');
          this.playVideoFromPouchDb(video.id)
        })
        .catch(err => {
          if (err.name === 'not_found') {
            this.videopath = `../../assets/video-store/${video.name}.mp4`;
            this.player.nativeElement.load();
          }
        })
        .catch(err => {
          this.message += 'Do not exists';
        });
    } else {
      console.log('Empty name');
    }


  }
  playVideoFromPouchDb(id) {
    this.message = `Play video:  ${id}`;
    this.db
      .getAttachment(id, 'elf.mp4')
      .then(blob => {
        const videoUrl = URL.createObjectURL(blob);
        this.videopath = this.sanitizier.bypassSecurityTrustUrl(videoUrl);
        // this.changeDetectorRef.detectChanges();
        this.player.nativeElement.load();
        //this.player.nativeElement.play();
      })
      .catch(err => {
        this.text = JSON.stringify(err, null, '\t');
      });
  }
  deleteVideoFromPouchDb(id) {
    this.message = `Delete video id: ${id}`;
    this.db
      .get(id)
      .then(doc => {
        // DELETE DOCUMENT
        return this.db.remove(doc);
      })
      .then(r => {
        this.message += ' Job deleted.';
        this.text = JSON.stringify(r, null, '\t');
      });
  }


  /** vanillajs only for testing purpouse */
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

  startVideo(e) {
    this.player.nativeElement.play();
  }
  playStarted() {
    this.message = 'Player started';
  }
  time(ev) {
    this.messageTime = ev.currentTime;
  }
  progress(e) {
    console.log(e);
  }
}
