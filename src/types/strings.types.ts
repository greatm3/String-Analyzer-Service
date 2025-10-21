export type Properties = {
    length: number;
    is_palindrome: boolean;
    unique_characters: number;
    word_count: number;
    sha256_hash: string;
    character_frequency_map: Record<string, number>;
};

export interface StringProperties {
    id: string;
    value: string;
    properties: Properties;
    created_at: string;
}

export interface FilterParams {
    is_palindrome?: boolean | string;
    min_length?: number;
    max_length?: number;
    word_count?: number;
    contains_character?: string;
}

export type FilterKeys =
    | 'is_palindrome'
    | 'min_length'
    | 'max_length'
    | 'word_count'
    | 'contains';
