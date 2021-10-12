// UI actions

const ByteltedCommunication = (function(ui) {
	let $vars = $('<div/>').addClass("previsu-vars");
	let $template = $('<div/>').addClass("previsu-template");
	
	function load() {
		$vars.html('<p>Variables</p>');
		$template.html('<p>Template</p>');
	}

	function previsu() {
		ui.view.tools.dialog({
			title: 'Prévisualisation',
			content: $('<div id="communication-previsu"/>').append($vars).append($template),
			modal: true,
			width: '90%',
			buttons: [{ name: 'Fermer', style: 'primary', close: true }],
			onload: load
		});
	}

	return { previsu: previsu };
})(window.$ui)
