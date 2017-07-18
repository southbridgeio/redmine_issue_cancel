(function() {
	
	if (window.jQuery) {
		// redmine uses jQuery so use it.
		jQuery(document).ready(function() {
			var $ = jQuery;
			var s = $('#issue_status_id');
			if (s.length === 0) {
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
					
 
					$(this).append(closeButton);
				 
			});
		});
	} else {
		// redmine uses prototype so use it.
		document.observe('dom:loaded', function() {
			var s = $('issue_status_id');
			if (s === null) {
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
			
				area.appendChild(closeButton);
			}
		});
	}
})();

