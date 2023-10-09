import { Component } from '@angular/core';

@Component({
  selector: 'app-rollforward-calculations',
  templateUrl: './rollforward-calculations.component.html',
  styleUrls: ['./rollforward-calculations.component.scss']
})
export class RollforwardCalculationsComponent {
lrc=true;
lc=false;
lic=false;
arc=false;
aric=false;
  isLinkSelected=true;
  isLinkSelected1: boolean;
  isLinkSelected2: boolean;
  isLinkSelected3: boolean;
  isLinkSelected4: boolean;
activate_lrc(){
  this.lrc=true;
  this.lc=false;
  this.lic=false;
  this.arc=false
  this.aric=false;
}
activate_arc(){
  this.arc=true;
  this.lrc=false;
  this.lc=false;
  this.aric=false;
  this.lic=false;
}
activate_aric(){
  this.aric=true;
  this.arc=false;
  this.lrc=false;
  this.lc=false;
  this.lic=false;
}

activate_lc(){
  this.lc=true;
  this.lrc=false;
  this.lic=false;
  this.arc=false
  this.aric=false;

}

activate_lic(){
  this.lic=true;
  this.lrc=false;
  this.lc=false;
  this.arc=false
  this.aric=false;
}


onLinkClick() {
  this.isLinkSelected = true;
  this.isLinkSelected1 = false;
  this.isLinkSelected2 = false;
  this.isLinkSelected3 = false;
  this.isLinkSelected4 = false;

}
onLinkClick1() {
  this.isLinkSelected1 = true;
  this.isLinkSelected = false;
  this.isLinkSelected2 = false;
  this.isLinkSelected3 = false;
  this.isLinkSelected4 = false;

}
onLinkClick2() {
  this.isLinkSelected2 = true;
  this.isLinkSelected = false;
  this.isLinkSelected1 = false;
  this.isLinkSelected3 = false;
  this.isLinkSelected4 = false;
}
onLinkClick3() {
  this.isLinkSelected3 = true;
  this.isLinkSelected = false;
  this.isLinkSelected1 = false;
  this.isLinkSelected2 = false;
  this.isLinkSelected4 = false;
}
onLinkClick4() {
  this.isLinkSelected4 = true;
  this.isLinkSelected = false;
  this.isLinkSelected1 = false;
  this.isLinkSelected2 = false;
  this.isLinkSelected3 = false;
}
}
