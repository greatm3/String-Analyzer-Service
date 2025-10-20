import type { Request, Response } from 'express';

export function getAllStrings(req: Request, res: Response) {
    res.status(200).json([
        {
            id: 1,
            value: 'test1',
        },
        {
            id: 2,
            value: 'test2',
        },
    ]);
}
