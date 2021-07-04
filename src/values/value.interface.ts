export interface BaseValue {
    name: string;
    description: string;
    importance: number;
}

export interface Value extends BaseValue {
    id: number;
}