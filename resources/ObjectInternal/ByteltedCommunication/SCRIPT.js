// UI actions

const ByteltedCommunication = (function(ui) {
	const app = ui.getAjax();
	let obj;
	const $vars = $('<div/>').addClass("previsu-vars");
	const $template = $('<div/>').addClass("previsu-template");
	
	function load() {
		$vars.html('<div><strong>TODO</strong>: Variables</div>');

		const doc = obj.getField('byteltedComContenu').value();
		$template.html($('<iframe/>').attr('src', app.documentURL(doc.object, doc.field, doc.rowid, doc.id, 'inline')));
	}

	function previsu(o) {
		obj = o;
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
