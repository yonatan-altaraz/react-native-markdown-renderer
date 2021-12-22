// import getIsTextType from './getIsTextType';
import Token from './Token'
import isSeparatedLink from './isSeparatedLink'
// import getIsInlineTextType from './getIsInlineTextType';

export default function groupTextTokens(tokens) {
    const result = []
    let isLinkOpen = false
    let hasGroup = false
    tokens.forEach((token, index) => {
        if (!token.block && !hasGroup && !isLinkOpen) {
            hasGroup = true
            result.push(new Token('textgroup', 1))
            result.push(token)
        } else if (isSeparatedLink(tokens, token, index)) {
            // if its a link, close textgroup
            hasGroup = false
            result.push(new Token('textgroup', -1))
            result.push(token)
            isLinkOpen = true
        } else if (!token.block && hasGroup) {
            result.push(token)
        } else if (token.block && hasGroup) {
            hasGroup = false
            result.push(new Token('textgroup', -1))
            result.push(token)
        } else {
            result.push(token)
        }
        // closing a link so original code can start new textgroup
        if (token.type === 'link' && token.nesting === -1) {
            isLinkOpen = false
        }
    })
    return result
}
