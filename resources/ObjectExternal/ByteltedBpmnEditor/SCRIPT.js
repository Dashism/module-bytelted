// Editeur BPMN
const ByteltedBpmnEditor = (function() {
	let editor;

	function render(params, data) {
		const div = $('#bpmn-editor');
		try {
			editor = new BpmnJS({ container: div, height: 500 });
			if (data.xml) {
				editor.importXML(data.xml).then(() => {
					console.log('Diagram imported');
				}).catch(e => {
					throw e;
				});
			}
		} catch (e) {
			div.text(e.message);
		}
	}

	function saveXML(success, failure) {
		editor.saveXML({ format: true }).then(res => {
			console.log('Diagram exported as XML');
			success && success(res.xml);
		}).catch(e => {
			failure && failure(e);
		});
	}

	function saveSVG(success, failure) {
		editor.saveSVG().then(res => {
			console.log('Diagram exported as SVG');
			success && success(res.svg);
		}).catch(e => {
			failure && failure(e);
		});
	}

	return {
		render: render,
		saveXML: saveXML,
		saveSVG: saveSVG
	};
})();