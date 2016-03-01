'use strict';

module.exports = function anPreview() {
	return {
		scope: {
			'url': '=anPreview'
		},
		restrict: 'A',
		link: function (scope, element) {
			var estado = false,
				img = $('<img/>').attr('src', scope.url),
				preview = $('<div></div>')
				.addClass('preview z-depth-1')
				.append(img)
				.appendTo(element);
			$(document.body).append(preview);
			element.on('mouseenter', function (e) {
				estado = true;
				preview.css({
					'display': 'block'
				});
			}).on('mousemove', function (e) {
				if (estado) {
					preview.css({
						'top': (e.clientY + 10) + 'px',
						'left': (e.clientX + 10) + 'px'
					});
				}
			}).on('mouseleave', function (e) {
				estado = false;
				preview.css('display', 'none');
			});
		}
	};
};
