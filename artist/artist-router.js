const express = require("express");
const Artwork = require("./artist-model");

const router = express.Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const art = await Artwork.findAllArtworkByArtist(id);

  try {
    res.status(200).json(art);
  } catch ({ err }) {
    res.status(500).json({
      err,
      message: `Could not retrieve artwork from artist with id of ${id}...`
    });
  }
});

router.post("/", async (req, res) => {
  const artData = req.body;
  const newArt = await Artwork.addArtwork(artData);

  try {
    res.status(201).json({ message: "added new work.", newArt });
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not add new work." });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const change = req.body;

  try {
    const count = await Artwork.updateArtwork(id, change);

    if (count) {
      res.json({ updated: count });
    } else {
      res
        .status(404)
        .json({ message: `Could not find artwork with the given id of ${id}` });
    }
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not update work." });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const count = await Artwork.removeArtwork(id);

    if (count) {
      res.json({ removed: count });
    } else {
      res
        .status(404)
        .json({ message: "Could not find artwork with the given id" });
    }
  } catch ({ err }) {
    res.status(500).json({ err, message: "Could not delete work" });
  }
});

module.exports = router;
