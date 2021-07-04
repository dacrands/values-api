/**
 * Data Model Interfaces
 */
import { BaseValue, Value } from "./value.interface";
import { Values } from "./values.interface";

/**
 * In-Memory Store
 */
let values: Values = {
    1: {
        id: 1,
        name: "Health",
        description: "Exercising, eating well, mental-hygeine",
        importance: 10
    },
    2: {
        id: 2,
        name: "Learning",
        description: "Pursuit of knowledge",
        importance: 10
    },
    3: {
        id: 3,
        name: "Health",
        description: "Exercising, eating well, mental-hygeine",
        importance: 10
    }
}

/**
 * Service Methods
 */
export const findAll = async():Promise<Value[]> =>
    Object.values(values);

export const find = async (id: number): Promise<Value> =>
    values[id];

export const create = async (newValue: BaseValue): Promise<Value> => {
    const id = new Date().valueOf();
    
    values[id] = {
        id,
        ...newValue
    }

    return values[id];
};

export const update = async (
    id: number,
    valueUpdate: BaseValue
): Promise<Value | null> => {
    const value = await find(id);

    if (!value) {
        return null;
    }

    values[id] = { id, ...valueUpdate };

    return values[id];
};

export const remove =  async (id: number): Promise<null | void> => {
    const value = await find(id);

    if (!value) {
        return null;
    }

    delete values[id];
};