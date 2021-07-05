import { Schema, model } from 'mongoose';
import { IValue } from '../values/value.model';

export interface IActivity {
    name: string;
    duration: number;
    value: string;
}

const schema = new Schema<IActivity>({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    value: {
        ref: 'Value',
        type: Schema.Types.ObjectId,
    }
}, { timestamps: true });

export const Activity = model<IActivity>('Activity', schema);