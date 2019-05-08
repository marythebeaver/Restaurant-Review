var CACHE_NAME = 'restaurant review';

//Add event listener here to check when Service Worker is registered.
self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			return cache.addAll([
					'/',
					'/index.html',
					'/restaurant.html',
					'/css/styles.css',
					'/js/dbhelper.js',
					'/js/main.js',
					'/js/restaurant_info.js',
					'/data/restaurants.json',
					'/img/1.jpg',
					'/img/2.jpg',
					'/img/3.jpg',
					'/img/4.jpg',
					'/img/5.jpg',
					'/img/6.jpg',
					'/img/7.jpg',
					'/img/8.jpg',
					'/img/9.jpg',
					'/img/10.jpg'
			]);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response){
			if(response) {
				return response;
			} else {

			console.log('Could not find ', event.request, ' in cache, fetching!');
			return fetch(event.request)
				.then(function (response) {
				    const clonedResponse = response.clone();
					caches.open(CACHE_NAME).then(function(cache) {
						cache.put(event.request, clonedResponse);
					});

				     return response;
			})

				.catch(function(err) {
					console.log("error");
	             });
			}
		})
	);
});
