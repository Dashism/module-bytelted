// Object UI hooks

(function(ui) {
	Simplicite.UI.hooks.ByteltedParcours = function(o, cbk) {
		try {
			var p = o.locals.ui;
			var app = ui.getAjax();
			if (p && o.isMainInstance()) {
				p.form.beforesave = function(ctn, obj, rowId, bscbk) {
					if (obj.getRowId() !== "0") {
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

const ByteltedParcours = (function(ui) {
	function exportSVG(obj) {
		ui.warning('Export SVG: Pas encore implémenté...');
	}

	return { exportSVG: exportSVG };
})(window.$ui);