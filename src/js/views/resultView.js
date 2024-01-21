import View from './View.js'
import icons from '../../img/icons.svg'
import previewView from './previewView.js'

class ResultView extends View {
   _parentEl = document.querySelector('.results')
   _errorMessage = 'No recipes found, please try another keyword ;)'
   _message = ''
   _generateMarkup() {
      return this._data
         .map(result => previewView.render(result, false))
         .join('')
   }
}

export default new ResultView()
