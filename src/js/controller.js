import * as model from './model.js'
import { MODAL_CLOST_DELAY } from './config.js'
import recipeView from './views/recipeView.js'
import searchView from './views/searchView.js'
import resultView from './views/resultView.js'
import bookmarkView from './views/bookmarkView.js'
import paginationView from './views/paginationView.js'
import addRecipeView from './views/addRecipeView.js'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
const recipeContainer = document.querySelector('.recipe')

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
   module.hot.accept()
}

const controlRecipes = async function () {
   try {
      const id = window.location.hash.slice(1)
      if (!id) return
      recipeView.renderSpinner(recipeContainer)
      resultView.update(model.getSearchResultsPage())
      bookmarkView.update(model.state.bookmarks)
      await model.loadRecipe(id)
      recipeView.render(model.state.recipe)
   } catch (error) {
      console.log(error)
      recipeView.renderError(error)
   }
}

const controlSearchResults = async function () {
   try {
      resultView.renderSpinner()
      const query = searchView.getQuery()
      if (!query) return
      await model.loadSearchResults(query)
      // resultView.render(model.state.search.results)
      resultView.render(model.getSearchResultsPage())
      paginationView.render(model.state.search)
      console.log(model.state.search)
   } catch (error) {
      console.log(error)
   }
}

const controlPagination = function (goto) {
   resultView.render(model.getSearchResultsPage(goto))
   paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
   model.updateServings(newServings)
   recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
   if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe)
   else model.deleteBookmark(model.state.recipe.id)

   recipeView.update(model.state.recipe)
   bookmarkView.render(model.state.bookmarks)
}

const controlBookmarks = function () {
   bookmarkView.render(model.state.bookmarks)
}

const controlAddRecipe = async function (newRecipe) {
   try {
      addRecipeView.renderSpinner()
      await model.uploadRecipe(newRecipe)
      console.log(model.state.recipe)
      recipeView.render(model.state.recipe)
      addRecipeView.renderMessage()
      bookmarkView.render(model.state.bookmarks)
      window.history.pushState(null, '', `#${model.state.recipe.id}`)
      setTimeout(function () {
         addRecipeView.toggleWindow()
      }, MODAL_CLOST_DELAY * 1000)
   } catch (error) {
      console.log(error)
      addRecipeView.renderError(error.message)
   }
}

const init = function () {
   bookmarkView.addHandlerRender(controlBookmarks)
   recipeView.addHandlerRender(controlRecipes)
   recipeView.addHandlerUpdateServings(controlServings)
   recipeView.addHandlerAddBookmark(controlAddBookmark)
   searchView.addHandlerSearch(controlSearchResults)
   paginationView.addHandlerClick(controlPagination)
   addRecipeView.addHandlerUpload(controlAddRecipe)
}
init()
