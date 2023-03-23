import { async } from 'regenerator-runtime';
import { API_URL, LONG_PAGE, KEY } from './config';
import { AJEX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: LONG_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const createRecpieObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecpie = async function (id) {
  try {
    const data = await AJEX(`${API_URL}${id}`);

    state.recipe = createRecpieObject(data);
    if (state.bookmarks.some(bookmark => bookmark.id === id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
    console.log(state.recipe);
  } catch (err) {
    console.error(`${err} 😭 `);
  }
};

export const loadingSearchResults = async function (query) {
  try {
    const data = await AJEX(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  // state.recipe.servings = newServings;
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function (recpie) {
  // push the bookmark
  state.bookmarks.push(recpie);
  // mark the bookmark
  if (recpie.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  presistBookmark();
};
export const delteBookmark = function (id) {
  const index = state.bookmarks.findIndex(bookmark => bookmark.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  presistBookmark();
};

const presistBookmark = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};
init();

export const uploadRecpie = async function (newRecpie) {
  try {
    const ingredients = Object.entries(newRecpie)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) throw new Error('worng ingredient format!✋');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecpie.title,
      source_url: newRecpie.sourceUrl,
      image_url: newRecpie.image,
      publisher: newRecpie.publisher,
      cooking_time: +newRecpie.cookingTime,
      servings: +newRecpie.servings,
      ingredients,
    };
    console.log(recipe);
    const data = await AJEX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecpieObject(data);

    // add to bookmark
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
