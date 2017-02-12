import { NextPage } from './../next/next';
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  showNextPageSuccess() {
    this.navCtrl.push(NextPage, {})
      .catch(() => {
        console.log("next page loaded successfully")
      })
  }

  /**
   * in this scenario, we will pass in a param to force a failure
   */
  showNextPageFailure() {
    this.navCtrl.push(NextPage, { 'fail': true })
      .catch(() => {
        console.log("next page DID NOT load successfully")
      })
  }

}
