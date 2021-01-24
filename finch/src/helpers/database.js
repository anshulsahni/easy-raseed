import { customAlphabet } from 'nanoid';

const CHARS_IN_PUBLIC_ID
 = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
const nanoid = customAlphabet(CHARS_IN_PUBLIC_ID, 10);
export const publicId = () => nanoid();
