const db = require("./database");

module.exports = {
  search: async (query) => {
    await db.read();
    return db.data.animes.filter(anime =>
      anime.title.toLowerCase().includes(query.toLowerCase())
    );
  },

  getAnime: async (id) => {
    await db.read();
    return db.data.animes.find(anime => anime.id === id);
  },

  getEpisode: async (id) => {
    await db.read();
    for (const anime of db.data.animes) {
      const ep = anime.episodes.find(e => e.id === id);
      if (ep) {
        return {
          id: ep.id,
          video: [{ url: ep.video, type: "mp4" }]
        };
      }
    }
    return null;
  }
};
