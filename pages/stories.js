import view from '../utils/view.js'
import baseUrl from '../utils/baseUrl.js'
import Story from '../components/Story.js'

async function Stories(path) {
    const storiesIds = await getStoriesIds(path)
    const top10Stories = storiesIds.slice(0, 9)
    const stories = await Promise.all(top10Stories.map(async id => {
        return (await fetch(`${baseUrl}/item/${id}.json`)).json()
    }))
    console.log(stories)
    view.innerHTML = `
        <div>
            ${stories.map(story => Story(story))}
        </div>
    `
}

async function getStoriesIds(path) {
    const isHomeRoute = path === '/'
    if (isHomeRoute) {
        path = 'topstories'
    }
    const response = await fetch(`${baseUrl}${path}.json`)
    const storiesIds = await response.json()
    console.log(storiesIds)
    return storiesIds
}

async function getStory(item) {
    const response = await fetch(`${baseUrl}/item/${item}.json`)
    const story = await response.json()
    return story
}

export default Stories