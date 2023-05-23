// import icons from '../../img/icons.svg';
import view from './view.js';
import icons from '../../img/icons.svg';

class paginationView extends view {
  _perentElement = document.querySelector('.pagination');
  numPages;
  renderNumPages() {
    this._perentElement.insertAdjacentHTML('afterbegin', this.numPages);
  }
  _generateMarkup() {
    const curPage = this._data.page;
    // how much pages do i need?
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    console.log(numPages);
    // page 1, there are other pages
    if (curPage === 1 && numPages > 1) {
      return `<button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
      `;
    }

    // page 1, there are (no) thers pages
    if (numPages === 1) {
      return '😘';
    }

    //last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>page ${curPage - 1}</span>
          </button>
      `;
    }

    // other pages
    if (curPage < numPages) {
      return ` <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span> page ${curPage - 1}</span>
            </button>
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
            <span> page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
        `;
    }
  }
  addHendlerButtons(hendler) {
    this._perentElement.addEventListener('click', function (e) {
      //   e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      console.log(btn);
      const goToPage = +btn.dataset.goto;
      hendler(goToPage);
    });
  }
}
export default new paginationView();
