/**
 * The category of an image to obtain the correct usage in a user presentation.
 * The category has to be set accordingly to the image content in order to guarantee the right usage.
 */
export enum ImageCategory {
  /**
   * Photo of the physical device that contains one or more EVSEs.
   */
  CHARGER = 'CHARGER',

  /**
   * Location entrance photo. Should show the car entrance to the location from street side.
   */
  ENTRANCE = 'ENTRANCE',

  /**
   * Location overview photo.
   */
  LOCATION = 'LOCATION',

  /**
   * Logo of an associated roaming network to be displayed with the EVSE for example in lists, maps and detailed information views.
   */
  NETWORK = 'NETWORK',

  /**
   * Logo of the charge point operator, for example a municipality, to be displayed in the EVSEs detailed information view or in lists and maps, if no network logo is present.
   */
  OPERATOR = 'OPERATOR',

  /**
   * Other
   */
  OTHER = 'OTHER',

  /**
   * Logo of the charge point owner, for example a local store, to be displayed in the EVSEs detailed information view.
   */
  OWNER = 'OWNER'
}