const apiConfig = {
    baseURL: 'https://api.themoviedb.org/3/',
    apiKey: '973d45784769b5e834721b303dbfc386',
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig