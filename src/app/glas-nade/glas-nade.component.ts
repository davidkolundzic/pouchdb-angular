import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-glas-nade',
  templateUrl: './glas-nade.component.html',
  styleUrls: ['./glas-nade.component.css']
})
export class GlasNadeComponent implements OnInit, AfterViewInit {
  pathglasnadeorg:any;
livepath:any;
glasnadetv:any;
novisad:any;
toronto:any;
beograd:any;

videopaths = [
  { url:'https://boxcast.tv/view-embed/mczf35zlaiipilkjxc8v?showTitle=0&amp;showDescription=0&amp;showHighlights=0&amp;showRelated=0&amp;defaultVideo=next&amp;market=house-of-worship&amp;showCountdown=1&amp;showDocuments=0&amp;showIndex=0&amp;showDonations=0' },
  { url:'https://www.sundaystreams.com/go/glasnadetv/embed'},
  { url:'https://boxcast.tv/view-embed/qv0byk5j4wkggl560u4p?showTitle=0&showDescription=0&showHighlights=0&showRelated=0&defaultVideo=next&market=house-of-worship&showCountdown=1&showDocuments=0&showIndex=0&showDonations=0&autoplay=0&playInline=1'},
  { url:'https://www.ustream.tv/embed/487384?html5ui&autoplay=true'},
  { url:'https://www.sundaystreams.com/go/hacbg/embed'}
];
zagreb: {
  networkState:number,
  readyState:number,
  paused:boolean
}
  constructor(private sanitizier: DomSanitizer) { }
  @ViewChild('zagreblive', { static: false }) zagreblive: ElementRef;
  @ViewChild('glasnadetvlive', { static: false }) glasnadetvlive: ElementRef;
  @ViewChild('novisadlive', { static: false }) novisadlive: ElementRef;
  @ViewChild('torontolive', { static: false }) torontolive: ElementRef;
  @ViewChild('beogradlive', { static: false }) beogradlive: ElementRef;
  ngOnInit() {
     
    
    let vdieoUrlLive = `https://boxcast.tv/f83f6792-0f8a-4026-940b-19533d772d3a`
    this.pathglasnadeorg = this.sanitizier.bypassSecurityTrustResourceUrl(this.videopaths[0].url);
    this.glasnadetv = this.sanitizier.bypassSecurityTrustResourceUrl(this.videopaths[1].url);
    this.novisad = this.sanitizier.bypassSecurityTrustResourceUrl(this.videopaths[2].url);
    this.toronto = this.sanitizier.bypassSecurityTrustResourceUrl(this.videopaths[3].url);
    this.beograd = this.sanitizier.bypassSecurityTrustResourceUrl(this.videopaths[4].url);


  }
  ngAfterViewInit() {
    console.log(this.zagreblive);
    console.log(this.zagreblive.nativeElement.nextElementSibling);

    console.log(this.glasnadetvlive.nativeElement.attributes[0].isConnected);
    // console.log(this.zagreblive.nativeElement.nextElementSibling.readyState);
  }

}
