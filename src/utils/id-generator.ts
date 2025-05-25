import { createId } from '@paralleldrive/cuid2';

export const generateId = (prefix: string) => `${prefix}_${createId()}`;