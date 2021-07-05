/**
 * Data Model Interfaces
 */
import { IValue, Value } from "./value.model";

/**
 * Service Methods
 */
export const findAll = async():Promise<IValue[]> => 
    await Value.find({});    

export const find = async (id: string): Promise<IValue> =>    
    await Value.findById(id).populate("activities");    

export const create = async (newValue: IValue): Promise<IValue> => {
    const value = new Value({ ...newValue });
    await value.save();    
    
    return value;
};

export const update = async (
    id: string,
    valueUpdate: IValue
): Promise<IValue | null> => {
    const value = await Value.findByIdAndUpdate(id, {...valueUpdate});

    if (!value) {
        return null;
    }    

    return value;
};

export const remove =  async (id: string): Promise<null | void> =>
    await Value.findByIdAndDelete(id);