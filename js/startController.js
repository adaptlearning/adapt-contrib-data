import Adapt from 'core/js/adapt';
import wait from 'core/js/wait';
import LockingModel from 'core/js/models/lockingModel';
import router from 'core/js/router';
import data from 'core/js/data';
import Backbone from 'backbone';
import $ from 'jquery';

class StartController extends Backbone.Controller {

  initialize(...args) {
    super.initialize(...args);
    this.model = null;
  }

  loadCourseData() {
    this.model = new LockingModel(Adapt.course.get('_start'));
  }

  setStartLocation() {
    if (!this.isEnabled()) return;
    window.history.replaceState('', '', this.getStartHash());
  }

  returnToStartLocation() {
    const startIds = this.model.get('_startIds');
    if (startIds) {
      // ensure we can return to the start page even if it is completed
      startIds.forEach(startId => (startId._skipIfComplete = false));
    }
    window.location.hash = this.getStartHash(true);
  }

  /**
   * Returns a string in URL.hash format representing the route that the course should be sent to
   * @param {boolean} [alwaysForce] Ignore any route specified in location.hash and force use of the start page instead
   * @return {string}
   */
  getStartHash(alwaysForce) {
    const startId = this.getStartId();
    const isRouteSpecified = window.location.href.indexOf('#') > -1;
    const shouldForceStartId = alwaysForce || this.model.get('_force');
    const shouldNavigateToStartId = startId && (!isRouteSpecified || shouldForceStartId);

    if (shouldNavigateToStartId && startId !== Adapt.course.get('_id')) {
      return '#/id/' + startId;
    }

    // If there's a route specified in location.hash, use that - otherwise go to main menu
    return window.location.hash || '#/';
  }

  isEnabled() {
    return Boolean(this.model?.get('_isEnabled'));
  }

  getStartId() {
    let startId = this.model.get('_id');
    const startIds = this.model.get('_startIds');

    if (!startIds?.length) return startId;

    const $html = $('html');
    for (let i = 0, l = startIds.length; i < l; i++) {
      const item = startIds[i];
      const className = item._className;
      const skipIfComplete = item._skipIfComplete;

      const model = data.findById(item._id);

      if (!model) {
        console.log('startController: cannot find id', item._id);
        continue;
      }

      if (skipIfComplete) {
        if (model.get('_isComplete')) continue;
      }

      if (!className || $html.is(className) || $html.hasClass(className)) {
        // See https://github.com/adaptlearning/adapt_framework/issues/1843
        startId = item._id;
        break;
      }
    }

    return startId;
  }

}

Adapt.once('adapt:start', () => {
  startController.loadCourseData();
  startController.setStartLocation();
});

/*
* allows you to call returnToStartLocation either by calling `Adapt.trigger('navigation:returnToStart')`
* or by including in the top navigation bar a button that has the attribute `data-event="returnToStart"`
*/
Adapt.on('navigation:returnToStart', () => {
  startController.returnToStartLocation();
});

Adapt.on('app:languageChanged', () => {
  wait.for(done => {
    startController.loadCourseData();
    const hash = startController.isEnabled() ? startController.getStartHash(false) : '#/';
    router.navigate(hash, { trigger: true, replace: true });
    done();
  });
});

const startController = new StartController();
export default startController;
