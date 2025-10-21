import crypto from 'node:crypto';
import { StringService } from '../services/strings.service.js';

import {
    StringProperties,
    Properties,
    FilterParams,
    FilterKeys,
} from '../types/strings.types';

function generateSHA256(input: string): string {
    return crypto.createHash('sha256').update(input).digest('hex');
}

function isPalindrome(input: string): boolean {
    const reversedString = input.split('').reverse().join('');
    return input.toLowerCase() === reversedString.toLowerCase();
}

function countUniqueCharacters(input: string): number {
    return new Set(input.split('')).size;
}

function characterFrequencyMap(input: string): Record<string, number> {
    const characters: Map<string, number> = new Map();

    input.split('').forEach((string) => {
        characters.set(string, (characters.get(string) || 0) + 1);
    });

    return Object.fromEntries(characters);
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
        sha256_hash: hash,
    };

    return {
        id: hash,
        value: string,
        properties: props,
        created_at: new Date().toISOString(),
    };
}

export function filterStrings(filterParams: FilterParams) {
    let allStrings = StringService.getAll();

    function filterBy(filterKey: FilterKeys, value?: unknown) {
        switch (filterKey) {
            case 'is_palindrome':
                return typeof value === 'boolean'
                    ? allStrings.filter(
                          (s) => s.properties.is_palindrome === value
                      )
                    : allStrings;
            case 'min_length':
                return typeof value === 'number'
                    ? allStrings.filter((s) => s.properties.length >= value)
                    : allStrings;
            case 'max_length':
                return typeof value === 'number'
                    ? allStrings.filter((s) => s.properties.length <= value)
                    : allStrings;
            case 'word_count':
                return typeof value === 'number'
                    ? allStrings.filter(
                          (s) => s.properties.word_count === value
                      )
                    : allStrings;
            case 'contains':
                return typeof value === 'string'
                    ? allStrings.filter((s) => s.value.includes(value))
                    : allStrings;
            default:
                return allStrings;
        }
    }

    if (filterParams.is_palindrome !== undefined) {
        allStrings = filterBy('is_palindrome', filterParams.is_palindrome);
    }

    if (filterParams.min_length !== undefined) {
        allStrings = filterBy('min_length', filterParams.min_length);
    }

    if (filterParams.max_length !== undefined) {
        allStrings = filterBy('max_length', filterParams.max_length);
    }

    if (filterParams.word_count !== undefined) {
        allStrings = filterBy('word_count', filterParams.word_count);
    }

    if (filterParams.contains_character !== undefined) {
        allStrings = filterBy('contains', filterParams.contains_character);
    }

    return allStrings;
}
