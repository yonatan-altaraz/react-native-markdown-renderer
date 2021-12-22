const breakingElements = ['softbreak', 'paragraph', 'hardbreak']

// checks if the link should be separated from textgroup
// if it's not in line with text
export default function isSeparatedLink(tokens, token, index) {
    // check if token is a beginning (open tag) of a link
    if (!(token.type === 'link' && token.nesting === 1)) {
        return false
    }
    // find link closing tag index
    const closingLinkIndex =
        tokens
            .slice(index)
            .findIndex(x => x.type === 'link' && x.nesting === -1) + index
    // checking if link is on a line of its own -
    // starting at beginning of paragraph or after a softbreak, and ends in a softbreak or end of paragraph
    return (
        index > 0 &&
        breakingElements.includes(tokens[index - 1].type) &&
        closingLinkIndex < tokens.length - 1 &&
        breakingElements.includes(tokens[closingLinkIndex + 1].type)
    )
}
