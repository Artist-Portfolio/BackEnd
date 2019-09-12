const db = require("../data/dbConfig");
const Artwork = require("../artist/artist-model");

describe("artwork model", () => {
  describe("add addArtwork()", () => {
    beforeEach(async () => {
      await db("artwork").truncate();
    });

    it("should add two works of art", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "ohayo gozaimasu",
        description: "cool anime picture",
        imgUrl:
          "https://myanimeshelf.com/upload/dynamic/2011-01/17/afro-samurai_1030372.jpg"
      });
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "sayonara",
        description: "awesome picture",
        imgUrl:
          "https://shootmefirst909.files.wordpress.com/2010/07/8658_render_vongola_primo1.png"
      });

      const artwork = await db("artwork");
      expect(artwork).toHaveLength(2);
    });
  });

  describe("find artwork by id findArtworkById()", () => {
    beforeEach(async () => {
      await db("artwork").truncate();
    });

    it("should find artwork by id", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "ohayo gozaimasu",
        description: "cool anime picture",
        imgUrl:
          "https://myanimeshelf.com/upload/dynamic/2011-01/17/afro-samurai_1030372.jpg"
      });

      const work = await Artwork.findArtworkById(1);
      expect(work.id).toBe(1);
    });
  });

  describe("find artwork by a given parameter findArtworkBy()", () => {
    beforeEach(async () => {
      await db("artwork").truncate();
    });

    it("should find artwork by artist name", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "ohayo gozaimasu",
        description: "cool anime picture",
        imgUrl:
          "https://myanimeshelf.com/upload/dynamic/2011-01/17/afro-samurai_1030372.jpg"
      });
      await Artwork.addArtwork({
        artist: "Mike Hat",
        title: "sayonara",
        description: "awesome picture",
        imgUrl:
          "https://shootmefirst909.files.wordpress.com/2010/07/8658_render_vongola_primo1.png"
      });

      const returnedArtist = await Artwork.findArtworkBy({
        artist: "Weeaboo Jones"
      }).first();
      expect(returnedArtist["artist"]).toBe("Weeaboo Jones");
    });

    it("should find artwork by title", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "ohayo gozaimasu",
        description: "cool anime picture",
        imgUrl:
          "https://myanimeshelf.com/upload/dynamic/2011-01/17/afro-samurai_1030372.jpg"
      });
      await Artwork.addArtwork({
        artist: "Mike Hat",
        title: "sayonara",
        description: "awesome picture",
        imgUrl:
          "https://shootmefirst909.files.wordpress.com/2010/07/8658_render_vongola_primo1.png"
      });

      const returnedTitle = await Artwork.findArtworkBy({
        title: "sayonara"
      }).first();
      expect(returnedTitle["title"]).toBe("sayonara");
    });

    it("should find artwork by description", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "ohayo gozaimasu",
        description: "cool anime picture",
        imgUrl:
          "https://myanimeshelf.com/upload/dynamic/2011-01/17/afro-samurai_1030372.jpg"
      });
      await Artwork.addArtwork({
        artist: "Mike Hat",
        title: "sayonara",
        description: "awesome picture",
        imgUrl:
          "https://shootmefirst909.files.wordpress.com/2010/07/8658_render_vongola_primo1.png"
      });

      const returnedDesc = await Artwork.findArtworkBy({
        description: "cool anime picture"
      }).first();
      expect(returnedDesc["description"]).toBe("cool anime picture");
    });
  });

  describe("update artwork info updateArtwork()", () => {
    beforeEach(async () => {
      await db("artwork").truncate();
    });

    it("should update information about work", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "sayonara",
        description: "awesome picture",
        imgUrl:
          "https://shootmefirst909.files.wordpress.com/2010/07/8658_render_vongola_primo1.png"
      });

      const newWork = await Artwork.updateArtwork(1, {
        artist: "Weeaboo Jones",
        title: "sayonara, dude",
        description: "different style of beloved anime character",
        imgUrl:
          "https://shootmefirst909.files.wordpress.com/2010/07/8658_render_vongola_primo1.png"
      });

      const returnedWork = db("artwork").first();

      expect(returnedWork.description).toBe(newWork.description);
    });
  });

  describe("delete removeArtwork()", () => {
    beforeEach(async () => {
      await db("artwork").truncate();
    });

    it("should remove work", async () => {
      await Artwork.addArtwork({
        artist: "Weeaboo Jones",
        title: "ohayo gozaimasu",
        description: "cool anime picture",
        imgUrl:
          "https://myanimeshelf.com/upload/dynamic/2011-01/17/afro-samurai_1030372.jpg"
      });

      const deletedWork = await Artwork.removeArtwork(1);
      const newDb = await db("artwork");
      expect(newDb).toHaveLength(0);
    });
  });
});
