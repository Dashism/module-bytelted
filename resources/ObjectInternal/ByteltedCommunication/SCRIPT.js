// UI actions

const ByteltedCommunication = (ui => {
	const app = ui.getAjax();

	let obj; // Objet metier
	let html; // HTML du template

	let $form, $vars, $content, $template;

	/**
	 * Ecriture dans l'iFrame de previsu
	 * @param {string} content Contenu à écrire dans l'Iframe
	 * @ignore
	 */
	function write(content) {
		let doc = $content.contents()[0];
		doc.open();
		doc.write(content);
		doc.close();
	}

	/**
	 * Redimensionnement du container de l'iFrame
	 * @param {string} width Largeur (0 = pas de largeur explicite)
	 * @param {string} height Hauteur (0 = pas de hauteur explicite)
	 * @ignore
	 */
	function resize(width, height) {
		$template.css('width', width === 0 ? '' : width);
		$template.css('height', height === 0 ? '' : height);
	}

	/**
	 * Chargement du contenu de la popup
	 * @ignore
	 */
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
				}).then(h => {
					html = h;
					write(html);
					if (vars.variables)
						$vars.append($('<div/>').append(
							$('<button class="btn btn-primary"/>').append('Tester').click(test)
						));
					$vars.append($('<div/>').append(
						$('<button class="btn btn-secondary"/>').append('Ordinateur').click(() => { resize(0, 0); })
					).append(
						$('<button class="btn btn-secondary"/>').append('Tablette').click(() => { resize('800px', '600px'); })
					).append(
						$('<button class="btn btn-secondary"/>').append('Smartphone').click(() => { resize('480px', '640px'); })
					));
				});
			} else
				write('Pas de template');
		} catch (e) {
			console.error(e);
			$vars.html('<div><strong>Erreur</strong>: ' + (e.message || e) + '</div>');
		}
	}

	/**
	 * Substitution de tags dans une chaine de caractères
	 * @param {string} str Chaine de caractère avec les tags à substituer
	 * @param {*} data Paires clé/valeur à substituer
	 * @returns Chaine de caractères substituée
	 * @ignore
	 */
	function replace(str, data) {
		return str.replace(/\${(.*?)}/g, (_, i) => data[i]);
	}

	/**
	 * Application des valeurs de tags du formulaire
	 * @ignore
	 */
	function test() {
		// Serialisation du formulaire en objet
		const fa = $form.serializeArray();
		var data = {};
		$.map(fa, n => {
			data[n['name']] = n['value'];
		 });

		write(replace(html, data));
	}

	/**
	 * Affichage de la popup de prévisualisation
	 * @param {object} [o] Objet métier
	 */
	function previsu(o) {
		obj = o;

		$form = $('<form/>').attr('autocomplete', 'off');
		$vars = $('<div/>').addClass('previsu-vars').html($form);

		$content = $('<iframe/>');
		$template = $('<div/>').addClass('previsu-template').html($content);

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
