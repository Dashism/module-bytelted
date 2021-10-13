package com.simplicite.objects.BytelTED;

/**
 * Communication
 */
public class ByteltedCommunication extends com.simplicite.commons.BytelTED.ByteltedCommun {
	private static final long serialVersionUID = 1L;

	@Override
	public boolean isUpdateEnable(String[] row) {
		// Pour un utilisateur simple, seules les communication dans l'état "Brouillon"
		// et dont il est responsable lui sont modifiables
		if (isUser() && (!"BROUILLON".equals(getStatus(row)) || !isResponsable(getFieldValue("byteltedComPrcId", row))))
			return false;

		return super.isUpdateEnable(row);
	}

}
