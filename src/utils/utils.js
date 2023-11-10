// Function to generate a random user ID
export const generateUserID = () => {
    return 'user_' + Math.random().toString(36).slice(2, 8); // slice to skip the "0."
}