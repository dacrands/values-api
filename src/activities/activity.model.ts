import { Schema, model } from 'mongoose';

export interface IActivity {
    name: string;
    duration: number;
    time: Date;
    value: string;
}

const schema = new Schema<IActivity>({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    time: { type: Date, required: true},
    value: {
        ref: 'Value',
        type: Schema.Types.ObjectId,
    }
}, { timestamps: true });

export const Activity = model<IActivity>('Activity', schema);