/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Menu from '../../components/menu/menu';
import messages from './messages';

export default function NotFound() {
  return (
    <h1>
      <Menu />
      <FormattedMessage {...messages.header} />
    </h1>
  );
}
