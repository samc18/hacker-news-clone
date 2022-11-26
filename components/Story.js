function Story(story) {
    const { title, url, score, by, time } = story
    return `
        <div>
            <div>
                <span>1</span>
                <span>▲</span>
                <span>${title}</span>
                <span>(${url})</span>
            </div>
            <div>
                <span>${score} points by ${by} ${new Date(time).getHours()} hours ago</span>
            </div>
        </div>
    `
}

export default Story