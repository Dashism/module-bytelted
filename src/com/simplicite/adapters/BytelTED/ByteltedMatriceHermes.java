package com.simplicite.adapters.BytelTED;

import org.json.JSONArray;
import org.json.JSONObject;

import org.apache.commons.lang.StringUtils;

import com.simplicite.util.exceptions.PlatformException;
import com.simplicite.util.AppLog;
import com.simplicite.util.ObjectDB;
import com.simplicite.util.Tool;

/**
 * Import de la matrice Hermes
 */
public class ByteltedMatriceHermes extends com.simplicite.util.integration.SimpleSAXParserAdapter {
	private static final long serialVersionUID = 1L;

	private boolean inToken = false;
	private JSONArray templates = null;
	private JSONObject template = null;
	private JSONArray variables = null;

	@Override
	public void startProcess() throws PlatformException, InterruptedException {
		templates = new JSONArray();
	}

	@Override
	public void startTagProcess(String uri, String localName, String qName, String path) throws PlatformException, InterruptedException {
		if ("token".equals(qName)) {
			inToken = true;
		}
	}

	private void addTemplate() {
		if (template != null) {
			template.put("variables", variables);
			templates.put(template);
		}
	}

	@Override
	public void processAttribute(String uri, String localName, String qName, String value, String path) throws PlatformException, InterruptedException {
		AppLog.info(qName + " = " + value, getGrant());
		if ("idTemplate".equals(qName)) {
			addTemplate();
			template = new JSONObject().put("template", value);
			variables = new JSONArray();
		} else if (inToken && "id".equals(qName)) {
			if (!Tool.isEmpty(value)) {
				variables.put(new JSONObject()
					.put("name", value)
					.put("type", "text")
					.put("label", StringUtils.capitalize(value.toLowerCase()))
				);
			}
			AppLog.info(templates.toString(2), getGrant());
		}
	}

	@Override
	public void processValue(String value) throws PlatformException, InterruptedException {
		// Non utilisé
	}

	@Override
	public void endTagProcess(String uri, String localName, String qName, String path) throws PlatformException, InterruptedException {
		if ("token".equals(qName)) {
			inToken = false;
		}
	}

	@Override
	public void endProcess() throws PlatformException, InterruptedException {
		addTemplate();
		String t = templates.toString(2);
		AppLog.info(t, getGrant());
		appendLog("Resultat du parsing :\n" + t);

		// Mise
		ObjectDB com = getGrant().getTmpObject("ByteltedCommunication");
		for (int i = 0; i < templates.length(); i++) {
			try {
				JSONObject tmpl = templates.getJSONObject(i);
				AppLog.info("Recherche des communications utilitant le template \"" + tmpl.getString("template") + "\"", getGrant());
				for (String[] row : com.getTool().search(new JSONObject().put("byteltedComIdTemplate", tmpl.getString("template")))) {
					com.setValues(row);
					String m = "Mise à jour de la communication \"" + com.getFieldValue("byteltedComNom") + "\" avec " + tmpl.toString();
					AppLog.info(m, getGrant());
					appendLog(m);
					com.setFieldValue("byteltedComVariables", tmpl.toString(2));
					com.getTool().validateAndSave();
				}
			} catch (PlatformException e) {
				AppLog.error(null, e, getGrant());
			}
		}
	}
}
