

export const formatText = (text) => {
    // Split the text by underscores and capitalize each word
    const words = text.split('_').map(word => word.charAt(0) + word.slice(1).toLowerCase());
    // Join the words with a space
    return words.join(' ');
    // return words.join(' ').toUpperCase();
}