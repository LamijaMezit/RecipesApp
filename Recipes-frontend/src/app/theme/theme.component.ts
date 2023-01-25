import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MojConfig} from "../moj-config";

declare function porukaSuccess(a: string): any;

@Component({
  selector: 'app-recepti',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {

  title:string = 'Teme';
  naziv:string = '';
  temaPodaci: any;
  odabranaTema: any;
  filter_naziv: string = '';

  constructor(private httpKlijent: HttpClient) {
  }

  testirajWebApi() :void
  {
    this.httpKlijent.get(MojConfig.adresa_servera+ "/Theme/GetAll").subscribe(x=>{
      this.temaPodaci = x;
    });
  }


 getTemaPodaci() {
    if (this.temaPodaci == null)
      return [];
    return this.temaPodaci.filter((x: any)=> x.naziv.length==0 || (x.naziv + " " + x.opis).toLowerCase().startsWith(this.naziv.toLowerCase()) || (x.opis + " " + x.naziv).toLowerCase().startsWith(this.naziv.toLowerCase()));
  }
  

  ngOnInit(): void {
  }

  detalji(s:any) {
    this.odabranaTema= s;
    this.odabranaTema.prikazi = true;
}



  snimi(){
this.httpKlijent.post(MojConfig.adresa_servera + ("/Theme/Update/") + this.odabranaTema.id, this.odabranaTema)
.subscribe((povratnaVrijednost:any)=>{alert("uredu.. " );});


  }

  obrisiTemu(tema: any) {
    this.httpKlijent.post(MojConfig.adresa_servera + ("/Theme/Delete/") + this.odabranaTema.id, this.odabranaTema)
      .subscribe((res: any) => {
        let index = this.temaPodaci.indexOf(tema);
        if (index > -1) {
          this.temaPodaci.splice(tema, 1);
          this.testirajWebApi();
        }
      })
    porukaSuccess(`Tema uspješno obrisana`)
  }
  



}

