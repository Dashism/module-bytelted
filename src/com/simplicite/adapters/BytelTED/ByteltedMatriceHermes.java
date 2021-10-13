package com.simplicite.adapters.BytelTED;

import org.json.JSONArray;
import org.json.JSONObject;

import org.apache.commons.lang.StringUtils;

import com.simplicite.util.exceptions.PlatformException;
import com.simplicite.util.AppLog;
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
			template = new JSONObject().put("name", value);
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
		
		// TODO: mise à jour des variables des communications en matchant sur l'ID template
		AppLog.info(templates.toString(2), getGrant());
	}
}
