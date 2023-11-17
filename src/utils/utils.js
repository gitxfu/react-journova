// Function to generate a random user ID
export const generateUserID = () => {
    return 'user_' + Math.random().toString(36).slice(2, 8); // slice to skip the "0."
}


export const isYouTubeVideo = (url) => {
    const regExp = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
    return regExp.test(url);
};

export const getYouTubeEmbedURL = (url) => {
    let videoId = '';

    const regExp1 = /^.*(youtube\.com\/watch\?v=)([^#\&\?]*).*/;
    const match1 = url.match(regExp1);
    if (match1 && match1[2].length === 11) {
        videoId = match1[2];
    }

    const regExp2 = /^.*(youtu.be\/)([^#\&\?]*).*/;
    const match2 = url.match(regExp2);
    if (match2 && match2[2].length === 11) {
        videoId = match2[2];
    }

    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
};
