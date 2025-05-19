module.exports = {
  search: async (query) => {
    return [{ id: "naruto", title: "Naruto", episodes: 220 }];
  },
  getAnime: async (id) => {
    return {
      id: id,
      title: "Naruto",
      episodes: Array.from({ length: 5 }, (_, i) => ({ id: `${id}-episodio-${i+1}`, title: `Episódio ${i+1}` }))
    };
  },
  getEpisode: async (id) => {
    return {
      id: id,
      video: [{ url: "https://example.com/video.mp4", type: "mp4" }]
    };
  }
};
