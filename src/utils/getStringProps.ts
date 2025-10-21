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
    return new Set(input.toLowerCase().split('')).size
}

function character_frequency_map(i)


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
        character_frequency_map
        sha256_hash: hash
    }

    return {
        id: hash,
        value: string,
        properties: props,
        created_at: new Date().toISOString()
    }
}
