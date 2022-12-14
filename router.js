import Stories from './pages/stories.js'
import Item from './pages/item.js'
import Favorites from './pages/favorites.js'

const router = new Navigo(null, true, '#')

class RouterHandler {
    constructor() {
        this.createRoutes()
    }

    createRoutes() {
        const routes = [
            { path: '/', page: Stories },
            { path: '/newstories', page: Stories},
            { path: '/askstories', page: Stories},
            { path: '/showstories', page: Stories},
            { path: '/item', page: Item},
            {path: '/favorites', page: Favorites}
        ]

        routes.forEach(({ path, page }) => {
            router.on(path, () => {
                page(path)
            }).resolve()
        })
    }
}

export default RouterHandler