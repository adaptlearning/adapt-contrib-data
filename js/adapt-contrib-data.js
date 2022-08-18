import Adapt from 'core/js/adapt';
import logging from 'core/js/logging';
import data from './data';
import './helpers';
import './deprecated';

data.on('ready', () => {
  logging.debug('Calling Adapt.init');
  Adapt.init();
  Adapt.off('adaptCollection:dataLoaded courseModel:dataLoaded');
}).init();
