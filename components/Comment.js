function Comment(comment) {
    const { by, time, text } = comment
    const hasNestedComments = comment.comments
    return `
        <div class="comment">
            <p class="comment__header">
                ${by} | ${new Date(time).getHours()} hours ago
            </p>
            <div class="comment__content">
                ${text}
                ${hasNestedComments && comment.comments.map(comment => Comment(comment)).join('')}
            </div>
        </div>
    `
}

export default Comment