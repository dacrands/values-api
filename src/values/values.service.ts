/**
 * Data Model Interfaces
 */
import { IValue, Value } from "./value.interface";

/**
 * Service Methods
 */
export const findAll = async():Promise<IValue[]> => 
    await Value.find({});    

export const find = async (id: string): Promise<IValue> =>    
    await Value.findById(id).exec();    

export const create = async (newValue: IValue): Promise<IValue> => {
    const value = new Value({ ...newValue });
    await value.save();    
    return value._id;
};

export const update = async (
    id: string,
    valueUpdate: IValue
): Promise<IValue | null> => {
    const value = await Value.findByIdAndUpdate(id, {...valueUpdate});

    if (!value) {
        return null;
    }    

    return value._id;
};

export const remove =  async (id: string): Promise<null | void> => {
    await Value.findByIdAndDelete(id);
};