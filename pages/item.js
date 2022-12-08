import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import Comment from "../components/Comment.js"
import Story from "../components/Story.js"
import checkFavorite from "../utils/checkFavorite.js"
import store from "../store.js"

async function Item() {
    let story = null
    let hasComments = false
    let hasError = false

    try {
        story = await getStory()
        hasComments = story.kids
    } catch (error) {
        hasError = true
        console.error(error)
    }

    if (hasError) {
        view.innerHTML = `<div class="error">Error fetching story</div>`
    }

    if (hasComments) {
        const storyKidsIds = story.kids
        const kids = await Promise.all(storyKidsIds.map(async id => {
            return getKid(id)
        }))
        view.innerHTML = `
            ${Story(story)}
            ${kids.map(kid => Comment(kid)).join('')}` 
    } else {
        view.innerHTML = `
            ${Story(story)}
            <div class="comment__msg">No comments</div>`
    }

    handleEvents()
}

async function getKid(id) {
    const response = await fetch(`${baseUrl}/item/${id}.json`)
    const kid = await response.json()
    const hasNestedComments = kid.kids && kid.kids.length > 0
    if (hasNestedComments) {
        kid.kids = await Promise.all(kid.kids.map(async id => {
            return getKid(id)
        }))
        return {...kid, comments: kid.kids}
    } else {
        return kid
    }
}

async function getStory() {
    const storyId = window.location.hash.split('?id=')[1]
    const response = await fetch(`${baseUrl}/item/${storyId}.json`)
    const story = await response.json()
    return story
}

function handleEvents() {
    document.querySelectorAll('.story__favorite').forEach(favoriteButton => {
        favoriteButton.addEventListener('click', function() {
            const story = JSON.parse(this.dataset.story)
            const isFavorited = checkFavorite(store.getState().favorites, story)
            store.dispatch({type: isFavorited ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE', payload: {favorite: story}})
        })
    })
}

export default Item