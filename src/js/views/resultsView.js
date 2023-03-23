import View from './view.js';
import previewView from './previewView.js';
import icons from '../../img/icons.svg';
import { title } from 'process';
class resultsVeiw extends View {
  _perentElement = document.querySelector('.results');
  _errorMessage = 'there is no recpie found 🥲';

  _generateMarkup() {
    console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new resultsVeiw();
