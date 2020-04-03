/**
 *
 * Asynchronously loads the component for Tricks
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
