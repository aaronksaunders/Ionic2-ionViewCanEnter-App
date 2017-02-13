# Ionic2-ionViewCanEnter-App
Ionic 2 - Using "ionViewCanEnter" to simulate resolve from angular 1

### Overview
Looking for a way to preload data before transitioning to a page and not transitioning if an error occurs

###CheckOut Video on YouTube
https://youtu.be/ZWYhR4Qo0PE


### The Code
This will focus on the code specific to the page transition from the `HomePage` to the `NextPage`. The `NextPage` is the page that we only want to transition to after the http request is completed and if it is completed successfully.

So in the `home.ts` we have a two functions, one for sucessfully opening the `NextPage` and one for forcing the page not to transition.

```Javascript
  showNextPageSuccess() {
    this.navCtrl.push(NextPage, {})
      .catch(() => {
        console.log("next page loaded successfully")
      })
  }
  ```
  
  And for the failure, we  will pass a parameter that will tell the next page to fail
  
  ```Javascript
  showNextPageFailure() {
    this.navCtrl.push(NextPage, { 'fail': true })
      .catch(() => {
        console.log("next page DID NOT load successfully")
      })
  }
  ```
The magic for all of this is the `ionViewCanEnter` function from the ionic component. [See more information on the function here](https://ionicframework.com/docs/v2/api/navigation/NavController/), but this is the function we will use as a guard. This function can return a promise or true or false; when returning a promise, we wait for the promise to be resolved successfully before transitioning to the page.

```Javascript
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
```
