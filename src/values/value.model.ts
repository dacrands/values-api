import { Schema, model } from 'mongoose';

export interface IValue {
    name: string;
    description: string;
    importance: number;
    activities: string[];
}

const schema = new Schema<IValue>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    importance: { type: Number, required: true },
    activities: [{ type: Schema.Types.ObjectId, ref: 'Activity' }]
});

export const Value = model<IValue>('Value', schema);