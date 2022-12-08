function Comment(comment) {
    const { by, time, text } = comment
    console.log(comment)

    return `
        <div class="comment">
            <p class="comment__header">
                ${by} | ${new Date(time).getHours()}
            </p>
            <p class="comment__content">
                ${text}
            </p>
        </div>
    `
}

export default Comment