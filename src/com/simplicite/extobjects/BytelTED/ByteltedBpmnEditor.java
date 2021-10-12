package com.simplicite.extobjects.BytelTED;

import com.simplicite.util.AppLog;
import com.simplicite.util.ObjectDB;
import com.simplicite.util.ObjectField;
import com.simplicite.util.Resource;
import com.simplicite.util.Tool;
import com.simplicite.util.tools.Parameters;
import org.json.JSONObject;

/**
 * Editeur BPMN
 */
public class ByteltedBpmnEditor extends com.simplicite.webapp.web.ResponsiveExternalObject {
	private static final long serialVersionUID = 1L;

	private static final String BPMN_URL = "https://unpkg.com/bpmn-js@8.7.3/dist/";

	@Override
	public JSONObject getData(Parameters params) {
		try {
			String data = null;

			String obj = params.getParameter("object");
			String field = params.getParameter("field");
			if (!Tool.isEmpty(obj) && !Tool.isEmpty(field)) {
				ObjectDB o = getGrant().getObject(params.getParameter("inst"), obj); // Use same instance
				ObjectField doc = o.getField(field);
				if (!doc.isEmpty())
					data = new String(doc.getDocument(getGrant()).getBytes(true));
			}
			
			if (Tool.isEmpty(data)) {
				// Default data from external object resource
				data = new String(getResourceContent(Resource.TYPE_XML, "BPMN"));
			}
			
			return new JSONObject().put("xml", data);
		} catch (Exception e) {
			AppLog.error(null, e, getGrant());
			return null;
		}
	}

	@Override
	public String[] getCSSIncludes() {
		return new String[] {
			BPMN_URL + "assets/diagram-js.css",
			BPMN_URL + "assets/bpmn-font/css/bpmn.css"
		};
	}

	@Override
	public String[] getJSIncludes() {
		return new String[] {
			BPMN_URL + "bpmn-modeler.development.js"
		};
	}
}