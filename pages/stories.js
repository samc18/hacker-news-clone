import view from '../utils/view.js'
import baseUrl from '../utils/baseUrl.js'
import Story from '../components/Story.js'
import store from '../store.js'
import checkFavorite from '../utils/checkFavorite.js'

async function Stories(path) {
    const storiesIds = await getStoriesIds(path)
    const top10Stories = storiesIds.slice(0, 9)
    const stories = await Promise.all(top10Stories.map(async id => {
        return getStory(id)
    }))
    view.innerHTML = `${stories.map((story, index) => Story({...story, index})).join('')}`

    handleEvents()
}

async function getStoriesIds(path) {
    const isHomeRoute = path === '/'
    if (isHomeRoute) {
        path = 'topstories'
    }
    const response = await fetch(`${baseUrl}${path}.json`)
    const storiesIds = await response.json()
    return storiesIds
}

async function getStory(id) {
    const response = await fetch(`${baseUrl}/item/${id}.json`)
    const story = await response.json()
    return story
}

function handleEvents() {
    document.querySelectorAll('.story__favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', function() {
            const story = JSON.parse(this.dataset.story)
            const isFavorited = checkFavorite(store.getState().favorites, story)
            store.dispatch({type: isFavorited ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE', payload: {favorite: story}})
            console.log(store.getState().favorites)
        })
    })
}

export default Stories