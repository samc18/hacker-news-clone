function Story(story) {
    const { title, url, score, by, time, kids, index } = story
    const domain =  url.match(/https:\/\/[a-z 0-9 .]*\//gi)[0]
    return `
        <div class="story">
            <div class="story__line">
                <span class="story__index">${index + 1}</span>
                <span class"story__upvote">▲</span>
                <a href=${url} class="story__title">${title}</a>
                <span class="story__domain">(${domain.slice(8, domain.length - 1)})</span>
            </div>
            <div class="story__line">
                <span class="story__info">${score} points by ${by} ${new Date(time).getHours()} hours ago</span> 
                | <a href="#" class="story__comments">${kids && kids.length} comments</a>
                | <button class="story__favorite">Add to favorites</button>
            </div>
        </div>
    `
}

export default Story