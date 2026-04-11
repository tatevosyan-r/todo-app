export interface Todo {
    id: number;
    text: string;
    completed: boolean;
    createdAt: string;
}

export type FilterStatus = 'all' | 'active' | 'completed';
export type SortOrder = 'newest' | 'oldest';