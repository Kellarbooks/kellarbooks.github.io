var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

(function() {
	'use strict';

	/**
	 * matches() pollyfil
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	 */
	if ( ! Element.prototype.matches ) {
		Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
	}

	/**
	 * closest() pollyfil
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
	 */
	if ( ! Element.prototype.closest ) {
		Element.prototype.closest = function( s ) {
			var el = this;
			if ( ! document.documentElement.contains( el ) ) {
				return null;
			}
			do {
				if ( el.matches( s ) ) {
					return el;
				}
				el = el.parentElement || el.parentNode;
			} while ( el !== null && el.nodeType === 1 ); 
			return null;
		};
	}

	window.nanospaceHelper = {
		/**
		 * Helper function to get element's offset.
		 */
		getOffset: function( $el ) {
			if ( $el instanceof HTMLElement ) {
				var rect = $el.getBoundingClientRect();

				return {
					top: rect.top + window.pageYOffset,
					left: rect.left + window.pageXOffset,
				}
			}

			return {
				top: null,
				left: null,
			};
		},

		/**
		 * Helper function to check if element's visible or not.
		 */
		isVisible: function( $el ) {
			return $el.offsetWidth > 0 && $el.offsetHeight > 0;
		},
	};

	window.nanospace = {
		/**
		 * Function to check RTL
		 */
		isRTL: function() {
			return document.body.classList.contains( 'rtl' );
		},

		/**
		 * Function to init different style of focused element on keyboard users and mouse users.
		 */
		initKeyboardAndMouseFocus: function() {
			document.body.addEventListener( 'keydown', function( e ) {
				document.body.classList.add( 'using-keyboard' );
			});

			document.body.addEventListener( 'mousedown', function( e ) {
				document.body.classList.remove( 'using-keyboard' );
			});
		},


		/**
		 * Function to init page popup toggle.
		 */
		initGlobalPopup: function() {
			var $clickedToggle = null;

			var deactivatePopup = function( device ) {
				var $activePopups = document.querySelectorAll( '.nanospace-popup-active' + ( undefined !== device ? '.nanospace-hide-on-' + device : '' ) );

				for ( var j = 0; j < $activePopups.length; j++ ) {
					// Deactivate popup.
					$clickedToggle.classList.remove( 'nanospace-popup-toggle-active' );
					$activePopups[j].classList.remove( 'nanospace-popup-active' );
					document.body.classList.remove( 'nanospace-has-popup-active' );

					// Back current focus to the toggle.
					$activePopups[j].removeAttribute( 'tabindex' );
					$clickedToggle.focus();
				}
			};

			var $toggles = document.querySelectorAll( '.nanospace-popup-toggle' );
			for ( var i = 0; i < $toggles.length; i++ ) {
				$toggles[i].addEventListener( 'click', function( e ) {
					e.preventDefault();
				    
				    var $target = document.querySelector( '#' + this.getAttribute( 'data-target' ) );

				    // Abort if no popup target found.
				    if ( ! $target ) return;

				    if ( $target.classList.contains( 'nanospace-popup-active' ) ) {
						deactivatePopup();
				    } else {
				    	// Activate popup.
						this.classList.add( 'nanospace-popup-toggle-active' );
						$target.classList.add( 'nanospace-popup-active' );
						document.body.classList.add( 'nanospace-has-popup-active' );

						// Put focus on popup.
						setTimeout(function() {
							$target.setAttribute( 'tabindex', 0 );
							document.getElementById("btn_close").focus();
						}, 300 );

				    	// Save this toggle for putting back focus when popup is deactivated.
						$clickedToggle = this;
				    }
				}, false );
			}

			var $closes = document.querySelectorAll( '.nanospace-popup-close' );
			for ( var i = 0; i < $closes.length; i++ ) {
				$closes[i].addEventListener( 'click', function( e ) {
					e.preventDefault();

					deactivatePopup();
				}, false );
			}

			document.body.addEventListener( 'keydown', function( e ) {
				var key = e.which || e.keyCode;

				if ( document.body.classList.contains( 'nanospace-has-popup-active' ) && 27 === key ) {
					deactivatePopup();
				}
			});

			// When window resize, close Active Popups based on their responsive visibility classes.
			window.addEventListener( 'resize', function( e ) {
				if ( document.body.classList.contains( 'nanospace-has-popup-active' ) ) {
					var device = 'mobile';

					if ( 500 <= window.innerWidth ) {
						device = 'tablet';
					}

					if ( 1024 <= window.innerWidth ) {
						device = 'desktop';
					}

					deactivatePopup( device );
				}
			});

			// Close popup if any hash link is clicked.
			var $menuLinks = document.querySelectorAll( '.nanospace-popup a' );
			for ( var i = 0; i < $menuLinks.length; i++ ) {
				$menuLinks[i].addEventListener( 'click', function( e ) {
					// Check if the link is a hash link.
					if ( '' !== this.hash ) {
						var pageURL = ( window.location.hostname + '/' + window.location.pathname ).replace( '/\/$/', '' ),
						    linkURL = ( this.hostname + '/' + this.pathname ).replace( '/\/$/', '' );

						// Check if the hash target is on this page.
						if ( pageURL === linkURL ) {
							// Deactivate all popups.
							if ( document.body.classList.contains( 'nanospace-has-popup-active' ) ) {
								deactivatePopup();
							}
						}
					}
				});
			}
			
		},

		/**
		 * Function that calls all init functions.
		 */
		initAll: function() {
			window.nanospace.initKeyboardAndMouseFocus();
			window.nanospace.initGlobalPopup();
		},
	};

	document.addEventListener( 'DOMContentLoaded', window.nanospace.initAll );

})();

}
/*
     FILE ARCHIVED ON 03:21:41 Apr 10, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:25:59 Feb 19, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.793
  exclusion.robots: 0.026
  exclusion.robots.policy: 0.011
  esindex: 0.014
  cdx.remote: 14.747
  LoadShardBlock: 1170.708 (3)
  PetaboxLoader3.datanode: 1089.735 (6)
  PetaboxLoader3.resolve: 217.29 (2)
  load_resource: 147.437 (2)
  loaddict: 32.683
*/