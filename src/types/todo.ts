export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

export type SortOrder = 'newest' | 'oldest';

export type FilterStatus = 'all' | 'completed' | 'active';

export interface TodoCounts {
    all: number;
    active: number;
    completed: number;
}