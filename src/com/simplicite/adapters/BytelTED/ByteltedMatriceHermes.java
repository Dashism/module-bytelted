package com.simplicite.adapters.BytelTED;

import com.simplicite.util.exceptions.PlatformException;
import com.simplicite.util.AppLog;

/**
 * Import de la matrice Hermes
 */
public class ByteltedMatriceHermes extends com.simplicite.util.integration.SimpleSAXParserAdapter {
	private static final long serialVersionUID = 1L;

	@Override
	public void startProcess() throws PlatformException, InterruptedException {
		AppLog.info("Start process", getGrant());
	}

	@Override
	public void startTagProcess(String uri, String localName, String qName, String path) throws PlatformException, InterruptedException {
		AppLog.info("Start tag process " + uri + ", " + localName + ", " + qName + ", " + path, getGrant());
	}

	@Override
	public void processAttribute(String uri, String localName, String qName, String value, String path) throws PlatformException, InterruptedException {
		AppLog.info("Process attribute " + uri + ", " + localName + ", " + qName + ", " + path, getGrant());
	}

	@Override
	public void processValue(String value) throws PlatformException, InterruptedException {
		AppLog.info("Process value " + value, getGrant());
	}

	@Override
	public void endTagProcess(String uri, String localName, String qName, String path) throws PlatformException, InterruptedException {
		AppLog.info("End tag process " + uri + ", " + localName + ", " + qName + ", " + path, getGrant());
	}

	@Override
	public void endProcess() throws PlatformException, InterruptedException {
		AppLog.info("End process", getGrant());
	}
}
