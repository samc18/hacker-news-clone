import view from "../utils/view.js"
import baseUrl from "../utils/baseUrl.js"
import Comment from "../components/Comment.js"
import Story from "../components/Story.js"

async function Item() {
    const story = await getStory()
    const storyKidsIds = await getStoryKidsIds()
    const kids = await Promise.all(storyKidsIds.map(async id => {
        return getKid(id)
    }))
    view.innerHTML = `
        ${Story(story)}
        ${kids.map(kid => Comment(kid)).join('')}
    ` 
    console.log(kids)
}

async function getKid(id) {
    const response = await fetch(`${baseUrl}/item/${id}.json`)
    const kid = await response.json()
    return kid
}

async function getStoryKidsIds() {
    const story = await getStory()
    return story.kids
}

async function getStory() {
    const storyId = window.location.hash.split('?id=')[1]
    const response = await fetch(`${baseUrl}/item/${storyId}.json`)
    const story = await response.json()
    return story
}

export default Item