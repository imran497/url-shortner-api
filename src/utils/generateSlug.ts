/**
 * Generates a random slug containing lowercase, uppercase, and numbers
 * @param {number} length - The length of the slug (minimum: 4, default: 8)
 * @returns {string} A random slug of specified length
 * @throws {Error} If length is less than 4
 */
export function generateSlug(length: number = 8): string {
    if (length < 4) {
        throw new Error('Slug length must be at least 4 characters');
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const allChars = lowercase + uppercase + numbers;
    
    let slug = '';
    
    // Ensure at least one character from each type
    slug += lowercase[Math.floor(Math.random() * lowercase.length)];
    slug += uppercase[Math.floor(Math.random() * uppercase.length)];
    slug += numbers[Math.floor(Math.random() * numbers.length)];
    
    // Fill the rest with random characters
    for (let i = 3; i < length; i++) {
      slug += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the characters to make it more random
    return slug.split('').sort(() => Math.random() - 0.5).join('');
}