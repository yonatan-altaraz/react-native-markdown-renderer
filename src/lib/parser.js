import React from 'react'
import { View } from 'react-native'
import tokensToAST from './util/tokensToAST'
import { stringToTokens } from './util/stringToTokens'
import { cleanupTokens } from './util/cleanupTokens'
import groupTextTokens from './util/groupTextTokens'
import cleanRedundantSoftBreaks from './util/cleanRedundantSoftBreaks'

/**
 *
 * @param {string} source
 * @param {function} [renderer]
 * @param {AstRenderer} [markdownIt]
 * @return {View}
 */
export default function parser(source, renderer, markdownIt) {
  let tokens = stringToTokens(source, markdownIt)
  tokens = cleanupTokens(tokens)
  tokens = groupTextTokens(tokens)
  let astTree = tokensToAST(tokens)
  astTree = cleanRedundantSoftBreaks(astTree)

  return renderer(astTree)
}
