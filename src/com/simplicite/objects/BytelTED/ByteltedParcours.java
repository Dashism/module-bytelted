package com.simplicite.objects.BytelTED;

/**
 * Parcours
 */
public class ByteltedParcours extends com.simplicite.commons.BytelTED.ByteltedCommun {
	private static final long serialVersionUID = 1L;
	
	@Override
	public boolean isUpdateEnable(String[] row) {
		// Pour un utilisateur simple, seules les communication dont il est responsable
		// lui sont modifiables
		if (isUser() && !isResponsable(getRowId(row)))
			return false;

		return super.isUpdateEnable(row);
	}
}
