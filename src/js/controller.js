import recpieView from './views/recpieView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarkView from './views/bookmarkView';
import addRecpieView from './views/addRecpieView.js';
import { MESSAGE_RECPIE_LODED } from './config.js';
import * as model from './model.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const recipeContainer = document.querySelector('.recipe');

// if (model.hot) {
//   model.hot.accept();
// }
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlrecpies = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recpieView.renderspinner();
    // 0) update the recpie
    resultsView.update(model.getSearchResultsPage());
    // update bookmark
    bookmarkView.update(model.state.bookmarks);
    // 1) loading recpie
    await model.loadRecpie(id);
    // 2) Rendering recpie
    recpieView.render(model.state.recipe);
  } catch (err) {
    recpieView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // render spinner
    resultsView.renderspinner();
    // get search query
    const query = searchView.getQuery();
    if (!query) return;
    // clean the filds
    searchView.clearFilds();
    console.log(query);
    // get search results
    await model.loadingSearchResults(query);
    //render results
    resultsView.render(model.getSearchResultsPage());
    // render pagination buttons
    paginationView.render(model.state.search);
    console.log(model.state.search.results);
  } catch (err) {
    recpieView.renderError();
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};
const controlUpdateServings = function (newServings) {
  model.updateServings(newServings);
  recpieView.update(model.state.recipe);
};
const controlAddBookmark = function () {
  // add bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  // delete bookmark
  else model.delteBookmark(model.state.recipe.id);
  //update bookmark class
  recpieView.update(model.state.recipe);

  //render bookmark from the list
  bookmarkView.render(model.state.bookmarks);

  console.log(model.state.recipe);
};
const controlRenderBookmark = function () {
  bookmarkView.render(model.state.bookmarks);
};
const controlAddRecpie = async function (newRecpie) {
  try {
    // loading spinner
    addRecpieView.renderspinner();
    // upload the recpie
    await model.uploadRecpie(newRecpie);
    // render the recpie
    console.log(model.state.recipe);
    recpieView.render(model.state.recipe);
    // show massage
    addRecpieView.renderMessage();

    // render bookmarks
    bookmarkView.render(model.state.bookmarks);

    // change the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // close the model
    setTimeout(() => {
      addRecpieView.toggleWindow();
    }, MESSAGE_RECPIE_LODED * 1000);
    // rerander
    // addRecpieView.cleanAndPreview();
    console.log(model.state.recipe);
  } catch (err) {
    addRecpieView.renderError(err.message);
    console.error(err);
  }
};
const init = function () {
  bookmarkView.addHendlerBookmark(controlRenderBookmark);
  recpieView.addHendlerRander(controlrecpies);
  recpieView.addHendlerUpdateServings(controlUpdateServings);
  recpieView.addHendlerBookmark(controlAddBookmark);
  searchView.addHendlerSearch(controlSearchResults);
  paginationView.addHendlerButtons(controlPagination);
  addRecpieView.addHendlerUpload(controlAddRecpie);
};
init();
