import View from './view.js';
import icons from '../../img/icons.svg';
class addRecpieView extends View {
  _perentElement = document.querySelector('.upload');
  _message = 'your recpie is loded 😘';
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHendlerShowWindow();
    this._addHendlerCloseWindow();
  }
  toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHendlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHendlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }
  addHendlerUpload(hendler) {
    this._perentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const arrData = [...new FormData(this)];
      const data = Object.fromEntries(arrData);
      hendler(data);
    });
  }
  cleanAndPreview() {
    const markup = `
<div class="overlay hidden"></div>
    <div class="add-recipe-window hidden">
      <button class="btn--close-modal">&times;</button>
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TEST5555" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST5555" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST5555" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST5555" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

`;
    this._clear;
    this._perentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
export default new addRecpieView();
