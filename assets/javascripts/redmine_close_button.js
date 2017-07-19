(function() {

  var ID_CLOSED = 5;	
	if (window.jQuery) {
		// redmine uses jQuery so use it.
		jQuery(document).ready(function() {
			var $ = jQuery;
			var s = $('#issue_status_id');
			if (s.length === 0) {
				return;
			}
		
			var options = s.get(0).childNodes;
			var needCloseButton = true;
			for (var i = options.length - 1; i >= 0; i--) {
				var option = options[i];
				var v = parseInt(option.value, 10);
				if (v === ID_CLOSED) {
					if (option.selected) {
						needCloseButton = false;
						break;
					} else {
						needCloseButton = true;
					}
				}
			}
			if (!needCloseButton) {
				return;
			}

			var f = $('#issue-form');
			var areas = $('div#content>div.contextual:has(a.icon)');
			if (f.length === 0 || areas.length === 0) {
				return;
			}
		
			var closeButtonTemplate = $('a.redmine-close-button');
			areas.each(function() {
				var closeButton = closeButtonTemplate
					.clone()
					.css('display', 'inline')
					
 
				var delButton = $(this).find('a.icon-del');
				if (delButton.length > 0) {
					closeButton.insertBefore(delButton);
				} else {
					$(this).append(closeButton);
				}
				 
			});
		});
	} else {
		// redmine uses prototype so use it.
		document.observe('dom:loaded', function() {
			var s = $('issue_status_id');
			if (s === null) {
				return;
			}
			 
			var options = s.childNodes;
			var needCloseButton = true;
			for (var i = options.length - 1; i >= 0; i--) {
				var option = options[i];
				var v = parseInt(option.value, 10);
				 
				if (v === ID_CLOSED) {
					if (option.selected) {
						needCloseButton = false;
						break;
					} else {
						needCloseButton = true;
					}
				}
			}
			if (!needCloseButton) {
				return;
			}

			var f = $('issue-form');
			var all_areas = $$('div#content>div.contextual');
			var areas = [];
			for (var ai = 0; ai < all_areas.length; ai++) {
				if (all_areas[ai].select('a.icon').length > 0) {
					areas.push(all_areas[ai]);
				}
			}
			all_areas = null;
			if (f === null || areas.length === 0) {
				return;
			}
			
			var closeButtonTemplate = $$('a.redmine-close-button')[0];
			for (ai = 0; ai < areas.length; ai++) {
				var area = areas[ai];
				var closeButton = closeButtonTemplate.cloneNode(true);
				closeButton.style.display = 'inline';
				var delButton = area.select('a.icon-del');
				if (delButton.length > 0) {
					delButton[0].insert({ before: closeButton });
				} else {
					area.appendChild(closeButton);
				}
			}
		});
	}
})();

