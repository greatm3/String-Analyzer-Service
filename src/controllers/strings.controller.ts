import { Request, Response } from 'express';
import { StringService } from '../services/strings.service.js';
import { getStringProps } from '../utils/getStringProps.js';

export function getString(req: Request, res: Response) {
    const stringParam = req.params.string_value;

    if (!StringService.findByValue(stringParam)) {
        return res.status(404).json({ error: 'resource not found' });
    }

    res.status(200).json(StringService.findByValue(stringParam));
}

export function getAllStrings(req: Request, res: Response) {
    res.status(200).json(StringService.getAll());
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
