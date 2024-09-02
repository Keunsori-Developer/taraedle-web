import { ORTHOGRAPHY } from "../constant/orthography";
import { CONFIG } from "../constant/config";


function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export const SORTED_ORTHOGRAPHY = [...ORTHOGRAPHY].sort(
    (a, b) => b.length - a.length
)

const joinedCharacters = CONFIG.escapeSpecialCharacters
    ? SORTED_ORTHOGRAPHY.map((x) => escapeRegExp(x)).join('|')
    : SORTED_ORTHOGRAPHY.join('|')

export const ORTHOGRAPHY_PATTERN = new RegExp('(' + joinedCharacters + ')', 'g')