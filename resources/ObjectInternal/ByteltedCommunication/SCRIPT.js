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

	function load() {
		try {
			const vars = obj.getField('byteltedComVariables').value();
			if (vars.variables) {
				for (let i = 0; i < vars.variables.length; i++) {
					let v = vars.variables[i];
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
			$.ajax({
				url: app.documentURL(doc.object, doc.field, doc.rowid, doc.id, 'inline')
			}).then(function(h) {
				html = h;
				write(html);
				if (vars.variables)
					$vars.append($('<button class="btn btn-secondary"/>').append("Tester").click(test));
			});
		} catch (e) {
			console.error(e);
			$vars.html('<div><strong>Erreur</strong>: ' + (e.message || e) + '</div>');
		}
	}
	
	function test() {
		// TODO: remplacer par ui.loadMustache() lorsque disponible
		ui.loadScript({
			url: '/scripts/mustache/mustache.min.js',
			onload: function() {
				const a = $form.serializeArray();
				var data = {};
				$.map(a, function(n) {
        			data[n['name']] = n['value'];
				 });
				 console.log(data);
				write(Mustache.render(html, data));
			}
		});
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
