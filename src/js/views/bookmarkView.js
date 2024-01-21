import View from './View.js'
import previewView from './previewView.js'
import icons from '../../img/icons.svg'
class BookmarkView extends View {
   _parentEl = document.querySelector('.bookmarks__list')
   _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)'
   _message = ''

   addHandlerRender(handler) {
      window.addEventListener('load', handler)
   }

   _generateMarkup() {
      return this._data
         .map(bookmark => previewView.render(bookmark, false))
         .join('')
   }

   // <div class="preview__user-generated">
   //         <svg>
   //           <use href="${icons}#icon-user"></use>
   //         </svg>
   //       </div>
}

export default new BookmarkView()
