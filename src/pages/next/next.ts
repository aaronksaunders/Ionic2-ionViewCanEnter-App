import { Component } from '@angular/core';
import { Http } from '@angular/http'
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the Next page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-next',
  templateUrl: 'next.html'
})
export class NextPage {

  userList

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NextPage');
  }

  /**
   * this is the function we will use as a guard.
   * 
   * this function can return a promise or true or false
   * 
   * on false, the page is not opened
   * 
   * when returning a promise, we wait for the promise to be resolved
   * successfully before transitioning to the page.
   */
  ionViewCanEnter() {
    console.log("in ionViewCanEnter")

    return new Promise((resolve, reject) => {
      // we will check the fail param to see what to do 
      if (this.navParams.get('fail')) {
        reject(true) // don't load page
      } else {
        // we want to only transition if data is loaded, or after the
        // data is loaded..

        this.http.get('https://randomuser.me/api/?results=5')
          .map(res => res.json().results)
          .subscribe(
          (res) => {
            console.log('got my data', res)
            this.userList = res;

            // resolve the promise so the page can transition
            resolve(res)
          },
          (err) => {
            // error happened, dont transition
            reject(err)
          }
          );
      }
    })
  }

  ionViewDidEnter() {
    console.log("in ionViewDidEnter")
  }

}
