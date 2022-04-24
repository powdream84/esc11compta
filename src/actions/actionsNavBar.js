export const TOGGLE_DRAWER_VISIBILITY = "TOGGLE_DRAWER_VISIBILITY";

/**
 * Show/hide drawer on the left hand side of the window.
 * @param {Boolean} isDrawerOpened Current display status of the drawer
 * @returns {Action}
 */
export function actionToggleDrawerVisibility(isDrawerOpened) {
  return { type: TOGGLE_DRAWER_VISIBILITY, payload: !isDrawerOpened };
}
