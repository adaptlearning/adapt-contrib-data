import Adapt from 'core/js/adapt';
import data from 'core/js/data';
import location from 'core/js/location';
import logging from 'core/js/logging';
import router from 'core/js/router';
import scrolling from 'core/js/scrolling';
import startController from 'core/js/startController';

Object.defineProperties(Adapt, {
  data: {
    get() {
      logging.deprecated('Adapt.data, please use core/js/data directly');
      return data;
    }
  },
  findById: {
    get() {
      logging.deprecated('Adapt.findById, please use data.findById directly');
      return data.findById;
    }
  },
  findViewByModelId: {
    get() {
      logging.deprecated('Adapt.findViewByModelId, please use data.findViewByModelId directly');
      return data.findViewByModelId;
    }
  },
  findByTrackingPosition: {
    get() {
      logging.deprecated('Adapt.findByTrackingPosition, please use data.findByTrackingPosition directly');
      return data.findByTrackingPosition;
    }
  },
  location: {
    get() {
      logging.deprecated('Adapt.location, please use core/js/location directly');
      return location;
    }
  },
  router: {
    get() {
      logging.deprecated('Adapt.router, please use core/js/router directly');
      return router;
    }
  },
  scrolling: {
    get() {
      logging.deprecated('Adapt.scrolling, please use core/js/scrolling directly');
      return scrolling;
    }
  },
  scrollTo: {
    get() {
      logging.deprecated('Adapt.scrollTo, please use router.navigateToElement');
      return scrolling.scrollTo;
    }
  },
  startController: {
    get() {
      logging.deprecated('Adapt.startController, please use core/js/startController directly');
      return startController;
    }
  }
});
