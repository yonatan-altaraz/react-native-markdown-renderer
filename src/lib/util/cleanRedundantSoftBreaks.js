const breakTypes = ['softbreak', 'hardbreak']

// removes all line breaking elements that are left overs from links manipulation,
// now redundant because different closing a text group already breaks line.
export default function cleanRedundantSoftBreaks(astTree) {
    astTree.forEach(x => {
        if (x.children) {
            // remove all textgroups that contain only a break element
            x.children = x.children.filter(
                el =>
                    !(
                        el.type === 'textgroup' &&
                        el.children?.length === 1 &&
                        breakTypes.includes(el.children[0].type)
                    ),
            )
            // remove all first or last break elements in a textgroup
            x.children
                .filter(el => el.type === 'textgroup' && el.children)
                .forEach(el => {
                    if (breakTypes.includes(el.children[0]?.type)) {
                        el.children.shift()
                    }
                    if (
                      breakTypes.includes(el.children[el.children.length - 1]?.type)
                    ) {
                        el.children.pop()
                    }
                })
        }
    })
    return astTree
}