import { Schema, model } from 'mongoose';

export interface IValue {
    name: string;
    description: string;
    importance: number;
}

const schema = new Schema<IValue>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    importance: { type: Number, required: true },
});

export const Value = model<IValue>('Value', schema);