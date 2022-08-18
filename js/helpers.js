import Adapt from 'core/js/adapt';
import Handlebars from 'handlebars';

const helpers = {

  /**
   * makes the _globals object in course.json available to a template
   */
  import_globals(context) {
    if (context.data.root._globals) {
      return '';
    }
    context.data.root._globals = Adapt.course.get('_globals');
    return '';
  },

  /**
   * makes the Adapt module data available to a template
   */
  import_adapt(context) {

    if (context.data.root.Adapt) {
      return;
    }
    const adapt = context.data.root.Adapt = {};

    let i, l, name;

    const directImport = ['config', 'course'];
    for (i = 0, l = directImport.length; i < l; i++) {
      name = directImport[i];
      // convert the model to a json object and add to the current context
      adapt[name] = Adapt[name].toJSON();
    }

    const indexedImport = ['contentObjects', 'articles', 'blocks', 'components'];
    for (i = 0, l = indexedImport.length; i < l; i++) {
      name = indexedImport[i];
      // convert the collection of models to an array of json objects
      const importArray = Adapt[name].toJSON();
      // convert the array of json models to an object indexed by id
      const importIndex = {};
      for (let i1 = 0, l1 = importArray.length; i1 < l1; i1++) {
        const item = importArray[i1];
        importIndex[item._id] = item;
      }
      // add the indexed object to the current context
      adapt[name] = importIndex;
    }

    return '';

  }

};

for (const name in helpers) {
  Handlebars.registerHelper(name, helpers[name]);
}

export default helpers;
