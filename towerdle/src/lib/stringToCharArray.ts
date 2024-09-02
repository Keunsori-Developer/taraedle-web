export const toCharArray = (input: string) => {
  const firstLetter = [
    'ㄱ',
    'ㄲ',
    'ㄴ',
    'ㄷ',
    'ㄸ',
    'ㄹ',
    'ㅁ',
    'ㅂ',
    'ㅃ',
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅉ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ]
  const middleLetter = [
    'ㅏ',
    'ㅐ',
    'ㅑ',
    'ㅒ',
    'ㅓ',
    'ㅔ',
    'ㅕ',
    'ㅖ',
    'ㅗ',
    ['ㅗ', 'ㅏ'],
    ['ㅗ', 'ㅐ'],
    ['ㅗ', 'ㅣ'],
    'ㅛ',
    'ㅜ',
    ['ㅜ', 'ㅓ'],
    ['ㅜ', 'ㅔ'],
    ['ㅜ', 'ㅣ'],
    'ㅠ',
    'ㅡ',
    ['ㅡ', 'ㅣ'],
    'ㅣ',
  ]
  const lastLetter = [
    '',
    'ㄱ',
    'ㄲ',
    ['ㄱ', 'ㅅ'],
    'ㄴ',
    ['ㄴ', 'ㅈ'],
    ['ㄴ', 'ㅎ'],
    'ㄷ',
    'ㄹ',
    ['ㄹ', 'ㄱ'],
    ['ㄹ', 'ㅁ'],
    ['ㄹ', 'ㅂ'],
    ['ㄹ', 'ㅅ'],
    ['ㄹ', 'ㅌ'],
    ['ㄹ', 'ㅍ'],
    ['ㄹ', 'ㅎ'],
    'ㅁ',
    'ㅂ',
    ['ㅂ', 'ㅅ'],
    'ㅅ',
    'ㅆ',
    'ㅇ',
    'ㅈ',
    'ㅊ',
    'ㅋ',
    'ㅌ',
    'ㅍ',
    'ㅎ',
  ]
  const korean_start = 0xac00
  const korean_end = 0xd7a3
  let result: string = ''
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i)
    if (code < korean_start || code > korean_end) {
      return ''
    }
    const codeOffset = code - korean_start
    const last = codeOffset % 28
    const middle = ((codeOffset - last) / 28) % 21
    const first = ((codeOffset - last) / 28 - middle) / 21
    const arr: string[] = [
      firstLetter[first],
      ...middleLetter[middle],
      ...lastLetter[last],
    ]
    result += arr.join('')
  }
  return result
}
