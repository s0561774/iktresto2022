importScripts('/js/idb.js');

const CURRENT_STATIC_CACHE = 'static-v2';
const CURRENT_DYNAMIC_CACHE = 'dynamic-v2';


self.addEventListener('install', function(event){
    console.log('service worker installed');
    event.waitUntil(
        caches.open(CURRENT_STATIC_CACHE)
        .then(function(cache){
            cache.addAll([
                '/',
                'css/style.min.css',
                'js/app.min.js',
                'js/idb.js',
                '../views/pages/index.ejs',
                'img/res_img_3.jpg',
                'img/res_img_5.jpg',
                'img/reservation-bg.jpg',
                'img/breakfast-1.jpg',
                'img/steak.jpg',
                'img/logo.png',
                'img/salmon-zucchini.jpg',
                'img/testi-bg.jpg',
            ])
        })
    );
});


self.addEventListener('activate', event => {
    console.log('service worker --> activating ...', event);
    event.waitUntil(
        caches.keys()
            .then( keyList => {
                return Promise.all(keyList.map( key => {
                    if(key !== 'static-v1' && key !== 'dynamic') {
                        console.log('service worker --> old cache removed :', key);
                        return caches.delete(key);
                    }
                }))
            })
    );
    return self.clients.claim();
})

self.addEventListener('fetch', event => {

    // check if request is made by chrome extensions or web page
    // if request is made for web page url must contains http.
    if (!(event.request.url.indexOf('http') === 0)) return; // skip the request. if request is not made with http protocol
    event.respondWith(
        caches.match(event.request)
            .then( response => {
                if(response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then( res => {     // nicht erneut response nehmen, haben wir schon
                            return caches.open(CURRENT_DYNAMIC_CACHE)      // neuer, weiterer Cache namens dynamic
                                .then( cache => {
                                    cache.put(event.request.url, res.clone());
                                    return res;
                                })
                        }).catch(err =>{
                            return caches.open(CURRENT_STATIC_CACHE)
                            .then(cache => {
                                return cache.match('/')
                            })
                        })
                }
            })
    );
})

