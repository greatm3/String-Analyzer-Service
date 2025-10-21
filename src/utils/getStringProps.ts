import crypto from 'node:crypto';

import { StringProperties, Properties } from '../types/strings.types';

function generateSHA256(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function isPalindrome(input: string): boolean {
    const reversedString = input.split('').reverse().join('');
    return input.toLowerCase() === reversedString.toLowerCase();
}

function countUniqueCharacters(input: string): number {
    return new Set(input.split('')).size
}

function characterFrequencyMap(input: string): Record<string, number> {
    const characters: Map<string, number> = new Map();

    input.split('').forEach((string) => {
        characters.set(string, (characters.get(string) || 0) + 1)
    })

    return Object.fromEntries(characters)

}


export function getStringProps(string: string): StringProperties {
    const hash = generateSHA256(string);
    const length = string.length;
    const isStringPalindrome = isPalindrome(string);

    const wordCount = string.split(' ').length;

    const props: Properties = {
        length: length,
        is_palindrome: isStringPalindrome,
        unique_characters: countUniqueCharacters(string),
        word_count: wordCount,
        character_frequency_map: characterFrequencyMap(string),
        sha256_hash: hash
    }

    return {
        id: hash,
        value: string,
        properties: props,
        created_at: new Date().toISOString()
    }
}
