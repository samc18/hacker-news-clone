function Story(story) {
    const { title, url, score, by, time, kids, index, isFavorite } = story
    const domain = url && url.match(/https{0,1}:\/\/[a-z 0-9 .-]*\/{0,1}/gi)[0]
    return `
        <div class="story">
            <div class="story__line">
                <span class="story__index">${index + 1}</span>
                <span class"story__upvote">▲</span>
                <a href=${url} class="story__title">${title}</a>
                ${url ? `<span class="story__domain">(${domain && domain.slice(8, domain.length - 1)})</span>` : ''}
            </div>
            <div class="story__line">
                <span class="story__info">${score} points by ${by} ${new Date(time).getHours()} hours ago</span> 
                | <a href="#" class="story__comments">${kids ? kids.length : 0} comments</a>
                | <button class="story__favorite" data-story='${JSON.stringify(story)}'>
                    ${isFavorite ? 'Remove favorite' : 'Add to favorites'}
                </button>
            </div>
        </div>
    `
}

export default Story