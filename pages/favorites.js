import Story from "../components/Story.js"
import store from "../store.js"
import view from "../utils/view.js"
import checkFavorite from "../utils/checkFavorite.js"

function Favorites() {
    const { favorites } = store.getState()
    const hasFavorites = favorites.length > 0

    view.innerHTML = `${hasFavorites ? favorites.map(story => Story({
        ...story, isFavorite: checkFavorite(favorites, story)
    })).join('') : '<div class="favorites-msg">Add some favorites!</div>'}`

    handleEvents()
}

function handleEvents() {
    document.querySelectorAll('.story__favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', function() {
            const story = JSON.parse(this.dataset.story)
            const isFavorited = checkFavorite(store.getState().favorites, story)
            store.dispatch({type: isFavorited ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE', payload: {favorite: story}})
            Favorites()
        })
    })
}

export default Favorites