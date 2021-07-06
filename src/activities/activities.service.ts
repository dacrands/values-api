/**
 * Data Model Interfaces
 */
import { IActivity, Activity } from "./activity.model";
import { Value } from "../values/value.model";

/**
 * Service Methods
 */
export const findAll = async (): Promise<IActivity[]> =>
    await Activity.find({}).populate("value");

export const find = async (id: string): Promise<IActivity> =>
    await Activity.findById(id).populate("value");

export const create = async (newActivity: IActivity): Promise<IActivity> => {
    const activity = new Activity({ ...newActivity });
    const activityValue = await Value.findById(activity.value);

    if (activityValue) {
        activityValue.activities.push(activity._id);
        await activityValue.save();
    }

    await activity.save();
    return activity;
};

export const update = async (
    id: string,
    activityUpdate: IActivity
): Promise<IActivity | null> => {
    const activity = await Activity.findByIdAndUpdate(id, { ...activityUpdate });
    
    if (!activity) {
        return null;
    }

    const activityValue = await Value.findById(activity.value);

    if (activityValue) {
        activityValue.activities.push(activity._id);
        await activityValue.save();
    }

    return activity;
};

export const remove = async (id: string): Promise<null | void> => {
    const activity = await Activity.findById(id);

    if (!activity) {
        return null;
    }

    const value = await Value.findById(activity.value);

    if (value) {        
        value.activities.pull(id);
        value.save();
    }

    await activity.remove();
}