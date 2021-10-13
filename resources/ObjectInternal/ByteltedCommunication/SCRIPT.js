// UI actions

const ByteltedCommunication = (function(ui) {
	const app = ui.getAjax();
	let obj;
	let html;

	let $form, $vars, $content, $template;

	function write(d) {
		let doc = $content.contents()[0];
		doc.open();
		doc.write(d);
		doc.close();
	}

	function resize(width, height) {
		$template.css('width', width === 0 ? '' : width);
		$template.css('height', height === 0 ? '' : height);
	}

	function load() {
		try {
			const vars = obj.getField('byteltedComVariables').value();
			if (vars.variables) {
				for (let v of vars.variables) {
					$form.append($('<input class="form-control"/>')
						.val(v.value)
						.attr('type', v.type)
						.attr('id', 'previsu-var-' + v.name)
						.attr('name', v.name)
						.attr('placeholder', v.label));
				}
			} else
				$form.text('Aucune variable définie');
	
			const doc = obj.getField('byteltedComContenu').value();
			if (doc && doc.id) {
				$.ajax({
					url: app.documentURL(doc.object, doc.field, doc.rowid, doc.id, 'inline')
				}).then(function(h) {
					html = h;
					write(html);
					if (vars.variables)
						$vars.append($('<div/>').append(
							$('<button class="btn btn-primary"/>').append("Tester").click(test)
						));
					$vars.append($('<div/>').append(
						$('<button class="btn btn-secondary"/>').append("Ordinateur").click(function() { resize(0, 0); })
					).append(
						$('<button class="btn btn-secondary"/>').append("Tablette").click(function() { resize('800px', '600px'); })
					).append(
						$('<button class="btn btn-secondary"/>').append("Smartphone").click(function() { resize('480px', '640px'); })
					));
				});
			} else
				write('Pas de template');
		} catch (e) {
			console.error(e);
			$vars.html('<div><strong>Erreur</strong>: ' + (e.message || e) + '</div>');
		}
	}

	function replace(str, data) {
		return str.replace(/\${(.*?)}/g, function(_, i) { return data[i]; });
	}

	function test() {
		const fa = $form.serializeArray();
		var data = {};
		$.map(fa, function(n) {
			data[n['name']] = n['value'];
		 });
		write(replace(html, data));
	}

	function previsu(o) {
		obj = o;

		$form = $('<form/>').attr('autocomplete', 'off');
		$vars = $('<div/>').addClass("previsu-vars").html($form);

		$content = $('<iframe/>');
		$template = $('<div/>').addClass("previsu-template").html($content);

		ui.view.tools.dialog({
			title: 'Prévisualisation',
			content: $('<div id="communication-previsu"/>').empty().append($vars).append($template),
			modal: true,
			width: '90%',
			buttons: [{ name: 'Fermer', style: 'primary', close: true }],
			onload: load
		});
	}

	return { previsu: previsu };
})(window.$ui)
