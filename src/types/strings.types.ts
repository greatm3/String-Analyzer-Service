export type Properties = {
    length: number
    is_palindrome: boolean
    unique_characters: number
    word_count: number
    sha256_hash: string
    character_frequency_map: Record<string, number>,
    
}

export interface StringProperties {
    id: string
    value: string
    properties: Properties
    created_at: string
}