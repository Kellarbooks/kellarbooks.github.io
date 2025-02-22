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

/**
 * Accessible navigation
 *
 * @package    NanoSpace
 * @copyright  Labinator
 *
 * @since 1.1.1
 * @version 1.1.1
 */

(function () {
	var container = document.querySelectorAll('.site-navigation');
	if (!container) {
		return;
	}

	for (let i = 0; i < container.length; i++) {
		NanoSpaceMenu(container[i]);
	}
})();


/**
* Handles toggling the navigation menu for small screens and enables TAB key
* navigation support for dropdown menus.
*/
function NanoSpaceMenu(container) {
	var container, button, menu, links, i, len;

	menu = container.getElementsByTagName('ul')[0];

	// Hide menu toggle button if menu is empty and return early.
	if ('undefined' === typeof menu) {
		button.style.display = 'none';
		return;
	}

	if (-1 === menu.className.indexOf('nav-menu')) {
		menu.className += ' nav-menu';
	}
	
	// Get all the link elements within the menu.
	links = menu.getElementsByTagName('a');

	// Each time a menu link is focused or blurred, toggle focus.
	for (i = 0, len = links.length; i < len; i++) {
		links[i].addEventListener('focus', toggleFocus, true);
		links[i].addEventListener('blur', toggleFocus, true);
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		var self = this;

		// Move up through the ancestors of the current link until we hit .nav-menu.
		while (-1 === self.className.indexOf('nav-menu')) {

			// On li elements toggle the class .focus.
			if ('li' === self.tagName.toLowerCase()) {

				if (-1 !== self.className.indexOf('focus')) {
					self.className = self.className.replace(' focus', '');
				} else {
					self.className += ' focus';
				}
			}

			self = self.parentElement;
		}
	}

	/**
	 * Toggles `focus` class to allow submenu access on tablets.
	 */
	(function (container) {
		var touchStartFn, i,
			parentLink = container.querySelectorAll('.menu-item-has-children > a, .page_item_has_children > a');

		if ('ontouchstart' in window) {
			touchStartFn = function (e) {
				var menuItem = this.parentNode, i;

				if (!menuItem.classList.contains('focus')) {
					e.preventDefault();
					for (i = 0; i < menuItem.parentNode.children.length; ++i) {
						if (menuItem === menuItem.parentNode.children[i]) {
							continue;
						}
						menuItem.parentNode.children[i].classList.remove('focus');
					}
					menuItem.classList.add('focus');
				} else {
					menuItem.classList.remove('focus');
				}
			};

			for (i = 0; i < parentLink.length; ++i) {
				parentLink[i].addEventListener('touchstart', touchStartFn, false);
			}
		}
	}(container));
}

/** 
 * Keep the focus within the mobile header popup
 * Credit: Twenty Twenty WordPress theme.
 */

(function () {
	document.addEventListener('keydown', function (event) {
		var modal, selectors, elements, menuType, bottomMenu,
			activeEl, lastEl, firstEl, tabKey, shiftKey,

			selectors = 'input, a, button';

		if (document.body.classList.contains('nanospace-has-popup-active')) {

			modal = document.querySelector('.nanospace-popup-active');

			elements = modal.querySelectorAll(selectors);
			elements = Array.prototype.slice.call(elements);

			lastEl = elements[elements.length - 1];
			firstEl = elements[0];
			activeEl = document.activeElement;

			tabKey = event.keyCode === 9;
			shiftKey = event.shiftKey;

			if (!shiftKey && tabKey && lastEl === activeEl) {
				event.preventDefault();
				firstEl.focus();
			}

			if (shiftKey && tabKey && firstEl === activeEl) {
				event.preventDefault();
				lastEl.focus();
			}
		}
	})
})();


}
/*
     FILE ARCHIVED ON 15:25:00 Mar 08, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 06:25:59 Feb 19, 2025.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 0.524
  exclusion.robots: 0.018
  exclusion.robots.policy: 0.008
  esindex: 0.01
  cdx.remote: 28.398
  LoadShardBlock: 148.53 (3)
  PetaboxLoader3.datanode: 233.455 (6)
  PetaboxLoader3.resolve: 311.533 (3)
  load_resource: 412.33 (2)
  loaddict: 60.21
*/