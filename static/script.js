			var imageArray = [{
				source: "gallery/image (1).jpg",
				description: "Cleaning Snow off My Car, Winter of 2012"
			}, {
				source: "gallery/image (2).jpg",
				description: "Me, My Dad and Dr. Rohatgi @2014 AFS Wisconsin Chapter"
			}, {
				source: "gallery/image (3).jpg",
				description: "After Receiving 2014 FEF Scholarship"
			}, {
				source: "gallery/image (4).jpg",
				description: "Me and My Best Friend, Dr. Shahirinia @ his Doctoral Thesis Defence"
			}, {
				source: "gallery/image (5).jpg",
				description: "Picnic with My Parents @ Cudahy, WI"
			}, {
				source: "gallery/image (6).jpg",
				description: "@ Wedding Ceremony of My Friend, November 2014"
			}, {
				source: "gallery/image (7).jpg",
				description: "Me, 4 Years old, on top of Family Pickup Truck"
			}, {
				source: "gallery/image (8).jpg",
				description: "Vacation @ Kish Island, 12 Years old"
			}, {
				source: "gallery/image (9).jpg",
				description: "Persian New Year, Spring of 2011"
			}, {
				source: "gallery/image (10).jpg",
				description: "Receiving 2015 FEF Scholarship"
			}, {
				source: "gallery/image (11).jpg",
				description: "Persian New Year, Spring of 2015"
			}, {
				source: "gallery/image (12).jpg",
				description: "Hanging out with Friends"
			}, {
				source: "gallery/image (13).jpg",
				description: "Bowling @ UWM Union, Spring Break 2015"
			}, {
				source: "gallery/image (14).jpg",
				description: "Waiting for Bus to Arrive @ UWM Union, December 2014 in -20°C"
			}, {
				source: "gallery/image (15).jpg",
				description: "With Chancellor Mark Mone @ Honors Ceremeony May-2015"
			}, {
				source: "gallery/image (16).jpg",
				description: "With Chancellor Mark Mone @ Honors Ceremeony May-2015"
			}, {
				source: "gallery/image (17).jpg",
				description: "With my Dad @ Honors Ceremeony May-2015"
			}, {
				source: "gallery/image (18).jpg",
				description: "With my Mom @ Honors Ceremeony May-2015"
			}];
			var currentImageNumber = Math.floor((Math.random() * imageArray.length));
			var IPAddress;

			$(document).ready(function() {
				getIPAddress();

				setTimeout(
					function() {
						document.onkeydown = checkKey;
						$("#right--next-image").trigger("click");

					}, 300);

				setTimeout(function() {
					swal({
						title: "I also have a blog!",
						text: "<a href='/blog'>Amir's programming blog</a>",
						timer: 1500,
						html: true,
						imageUrl: "img/thumbs-up.jpg"
					});
				}, 10000)

				$("form").on("submit", function(event) {
					event.preventDefault();
					var that = this;
					var dataToPost = $(this).serializeFormJSON();

					dataToPost["cf_location"] = IPAddress;
					$.ajax({
						type: "POST",
						url: "/contact.php",
						data: dataToPost,
						success: function(result) {
							that.reset();
							swal({
								title: result,
								text: "Auto close alert!",
								timer: 2000,
								imageUrl: "img/thumbs-up.jpg"
							});
						}
					});
				});

				$("#left--next-image").on("click", function() {
					currentImageNumber++;
					if (currentImageNumber >= imageArray.length) {
						currentImageNumber = 0;
					}
					$("#gallery-swipe").empty();
					document.getElementById("gallery-swipe").appendChild(createImageNode(currentImageNumber));
				});

				$("#right--next-image").on("click", function() {
					currentImageNumber--;
					if (currentImageNumber <= 0) {
						currentImageNumber = imageArray.length - 1;
					}
					$("#gallery-swipe").empty();
					document.getElementById("gallery-swipe").appendChild(createImageNode(currentImageNumber));
				});
			});

			function createImageNode(number) {
				var currentImage = document.createElement("IMG");
				currentImage.setAttribute("class", "img-responsive");
				currentImage.setAttribute("src", imageArray[number].source);

				var currentImageDescription = document.createElement("H4");
				currentImageDescription.setAttribute("style", "font-size: 120%; font-weight: bold;");
				currentImageDescription.innerHTML = imageArray[number].description;

				var outerDiv = document.createElement("DIV");
				outerDiv.appendChild(currentImage);
				outerDiv.appendChild(currentImageDescription);
				return outerDiv;
			}

			function checkKey(e) {
				e = e || window.event;

				if (e.keyCode == "37" && $("#photo-gallery").is(":visible")) {
					$("#left--next-image").trigger("click");
				} else if (e.keyCode == "39" && $("#photo-gallery").is(":visible")) {
					$("#right--next-image").trigger("click");
				}
			}

			function getIPAddress() {
				$.get("https://api.ipify.org/?format=json", function(data) {
					IPAddress = data.ip;
				});
			}

			(function($) {
				$.fn.serializeFormJSON = function() {
					var o = {};
					var a = this.serializeArray();
					$.each(a, function() {
						if (o[this.name]) {
							if (!o[this.name].push) {
								o[this.name] = [o[this.name]];
							}
							o[this.name].push(this.value || '');
						} else {
							o[this.name] = this.value || '';
						}
					});
					return o;
				};
			})(jQuery);


			var app = angular.module('app', []);
			app.controller('myCtrl', ["$scope", "$http", function(scope, http) {
				http.get("https://api.github.com/users/amir734jj/repos").then(function(response) {
					response = response.data;
					var repos = [];
					for (var index in response) {
						var repo = response[index];

						if (repo.description) {
							repo.date = new Date(repo.pushed_at)
							repos.push(repo);
						}
					}

					scope.repos = repos;
				});
			}]);


			(function(i, s, o, g, r, a, m) {
				i['GoogleAnalyticsObject'] = r;
				i[r] = i[r] || function() {
					(i[r].q = i[r].q || []).push(arguments)
				}, i[r].l = 1 * new Date();
				a = s.createElement(o),
					m = s.getElementsByTagName(o)[0];
				a.async = 1;
				a.src = g;
				m.parentNode.insertBefore(a, m)
			})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

			ga('create', 'UA-68686843-1', 'auto');
			ga('send', 'pageview');
