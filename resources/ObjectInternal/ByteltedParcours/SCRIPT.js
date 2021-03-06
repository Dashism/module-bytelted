// Object UI hooks

(ui => {
	Simplicite.UI.hooks.ByteltedParcours = function(o, cbk) {
		try {
			const p = o.locals.ui;
			const app = ui.getAjax();
			if (p && o.isMainInstance()) {
				p.form.beforesave = function(ctn, obj, rowId, bscbk) {
					if (obj.getRowId() !== '0') {
						ByteltedBpmnEditor.saveXML(xml => {
							let doc = 'byteltedPrcDiagrammeXML';
							obj.getField(doc).value({
								object: obj.getName(),
								rowid: obj.getRowId(),
								field: doc,
								id: '0',
								mime: 'text/xml',
								name: 'diagram-' + new Date().getTime() + '.xml',
								content: app.base64Encode(xml)
							});
							bscbk && bscbk();
						}, err => {
							console.error(err);
							bscbk && bscbk(false);
						});
					} else {
						bscbk && bscbk();
					}
				};
			}
		} catch (e) {
			app.error(e.message);
		} finally {
			cbk && cbk();
		}
	};
})(window.$ui);

// UI actions

const ByteltedParcours = (ui => {
	const app = ui.getAjax();

	function exportSVG(obj) {
		ByteltedBpmnEditor.saveSVG(svg => {
			ui.view.tools.dialog({
				title: 'Diagramme',
				content: $('<img/>').attr('src', 'data:image/svg+xml;base64,' + app.base64Encode(svg)),
				width: '80%',
				buttons: [{ name: 'Fermer', style: 'primary', close: true }]
			});
		}, err => {
			console.error(err);
			ui.error(err.message);
		});
	}

	return { exportSVG: exportSVG };
})(window.$ui);