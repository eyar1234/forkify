class searchView {
  _perentEl = document.querySelector('.search');
  getQuery() {
    return this._perentEl.querySelector('.search__field').value;
  }
  clearFilds() {
    this._perentEl.querySelector('.search__field').value = '';
  }
  addHendlerSearch(hendler) {
    this._perentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      hendler();
    });
  }
}

export default new searchView();
