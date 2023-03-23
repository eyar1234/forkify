import View from './view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
class bookmarkVieww extends View {
  _perentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'no bookmarks yet, find a nice recpie and bookmark it 😅';

  addHendlerBookmark(hendler) {
    window.addEventListener('load', hendler);
  }
  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new bookmarkVieww();
