/**
 * The power type of electrical charging.
 */
export enum PowerType {
  /**
   * AC single phase.
   */
  AC_1_PHASE = 'AC_1_PHASE',

  /**
   * AC two phases, only two of the three available phases connected.
   */
  AC_2_PHASE = 'AC_2_PHASE',

  /**
   * AC two phases using split phase system.
   */
  AC_2_PHASE_SPLIT = 'AC_2_PHASE_SPLIT',

  /**
   * AC three phases.
   */
  AC_3_PHASE = 'AC_3_PHASE',

  /**
   * Direct Current.
   */
  DC = 'DC'
}