import { Request, Response } from 'express';
import { StringService } from '../services/strings.service.js';
import { filterStrings, getStringProps } from '../utils/utils.js';
import { FilterParams } from '../types/strings.types.js';

export function getString(req: Request, res: Response) {
    const stringParam = req.params.string_value;

    if (!StringService.findByValue(stringParam)) {
        return res.status(404).json({ error: 'resource not found' });
    }

    res.status(200).json(StringService.findByValue(stringParam));
}

export function getAllStrings(req: Request, res: Response) {
    const filters: FilterParams = {
        is_palindrome: req.query.is_palindrome === 'true' ? true : undefined,
        min_length: Number(req.query.min_length)
            ? Number(req.query.min_length)
            : undefined,
        max_length: Number(req.query.max_length)
            ? Number(req.query.max_length)
            : undefined,
        word_count: Number(req.query.word_count)
            ? Number(req.query.word_count)
            : undefined,
        contains_character: req.query.contains_character
            ? String(req.query.contains_character)
            : undefined,
    };
    const filteredStrings = filterStrings(filters);
    const response = {
        data: filteredStrings,
        count: filteredStrings.length,
        filters_applied: filters,
    };

    res.status(200).json(response);
}

export function createString(req: Request, res: Response) {
    const stringValue = req.body.value;

    if (!stringValue) {
        return res.status(400).json({ error: 'bad request' });
    }

    if (typeof stringValue !== 'string') {
        return res
            .status(422)
            .json({ error: 'value must be of type "string"' });
    }

    if (StringService.findByValue(stringValue)) {
        return res.status(409).json({ error: 'value already exists' });
    } else {
        const newValue = getStringProps(stringValue);
        StringService.create(newValue);
        return res.status(201).json(newValue);
    }
}

export function deleteString(req: Request, res: Response) {
    const stringValue = req.params.string_value;

    if (!stringValue || !StringService.findByValue(stringValue)) {
        return res.status(404).json({ error: 'resource not found' });
    }

    StringService.delete(stringValue);
    res.status(204).send();
}

export function getByNl(req: Request, res: Response) {
    let query = req.query.query;

    if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: 'unable to parse query' });
    }

    const filters: FilterParams = {
        is_palindrome: undefined,
        min_length: undefined,
        max_length: undefined,
        word_count: undefined,
        contains_character: undefined,
    };

    const uniqueFilters = new Map<string, number>();

    query = query.split(' ');

    query.forEach((value) => {
        switch (value) {
            case 'palindromic':
                if (uniqueFilters.has(value)) {
                    return res
                        .status(422)
                        .json({ error: 'conflicting filters' });
                }
                filters.is_palindrome = true;
                uniqueFilters.set(value, 1);
                break;
            case 'single word':
                if (uniqueFilters.has(value)) {
                    return res
                        .status(422)
                        .json({ error: 'conflicting filters' });
                }
                filters.word_count = 1;
                uniqueFilters.set(value, 1);
                break;
            case 'containing the letter z':
                if (uniqueFilters.has(value)) {
                    return res
                        .status(422)
                        .json({ error: 'conflicting filters' });
                }
                filters.contains_character = 'z';
                uniqueFilters.set(value, 1);
                break;
            case 'first vowel':
                if (uniqueFilters.has(value)) {
                    return res
                        .status(422)
                        .json({ error: 'conflicting filters' });
                }
                filters.contains_character = 'a';
                uniqueFilters.set(value, 1);
                break;
            case 'longer than 10 characters':
                if (uniqueFilters.has(value)) {
                    return res
                        .status(422)
                        .json({ error: 'conflicting filters' });
                }
                filters.min_length = 11;
                uniqueFilters.set(value, 1);
                break;
            default:
                break;
        }
    });

    console.log(filters);
    console.log(query);
}
