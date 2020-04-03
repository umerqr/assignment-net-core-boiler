/*
 * Tricks Messages
 *
 * This contains all the text for the Tricks container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Tricks';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Tricks container!',
  },
});
