package com.simplicite.commons.BytelTED;

import com.simplicite.util.ObjectDB;

/**
 * Object métier commun
 */
public abstract class ByteltedCommun extends ObjectDB {
	private static final long serialVersionUID = 1L;

	/**
	 * Est adminitrateur ?
	 * @return True si administrateur
	 */
	protected boolean isAdmin() {
		return getGrant().hasResponsibility("BYTELTED_ADMIN");
	}

	/**
	 * Est utilisateur ?
	 * @return True si utilisateur
	 */
	protected boolean isUser() {
		return getGrant().hasResponsibility("BYTELTED_USER");
	}
	
	/**
	 * Est responsable du parcours
	 * @param prcId Row ID du parcours
	 */
	protected boolean isResponsable(String prcId) {
		return getGrant().simpleQueryAsLong("select count(*) from bytelted_prc_usr where bytelted_prcusr_usr_id = " + getGrant().getUserId() + " and bytelted_prcusr_prc_id = " + prcId) != 0; 
	}
}
