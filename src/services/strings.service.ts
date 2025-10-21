import { getStringProps } from '../utils/getStringProps.js';

import { StringProperties } from '../types/strings.types.js';

const stringDB = new Map<string, StringProperties>();

export class StringService {
    static create(data: StringProperties): StringProperties {
        stringDB.set(data.id, data);
        return data;
    }

    static findByID(id: string): StringProperties | undefined {
        return stringDB.get(id);
    }

    static findByValue(input: string): StringProperties | undefined {
        const objBD = Object.fromEntries(stringDB);

        for (let stringID in objBD) {
            if (objBD[stringID].value === input) {
                return objBD[stringID];
            }
        }

        return undefined;
    }

    static delete(input: string): StringProperties | undefined {
        const stringProps = StringService.findByValue(input);

        if (!stringProps) {
            return undefined;
        }

        stringDB.delete(stringProps.id);
        return stringProps;
    }

    static getAll(): StringProperties[] {
        return Array.from(stringDB.values())
    }
}
