const db = require("../data/dbConfig");

module.exports = {
  addArtwork,
  findArtworkBy,
  findAllArtworkByArtist,
  findArtworkById,
  updateArtwork,
  removeArtwork
};

function findArtworkBy(filter) {
  return db("artwork").where(filter);
}

function findArtworkById(id) {
  return db("artwork")
    .where({ id })
    .first();
}

function findAllArtworkByArtist(user_id) {
  return db("artwork")
    .join("users", "users.id", "=", "artwork.user_id")
    .select(
      "artwork.artist",
      "artwork.title",
      "artwork.description",
      "artwork.imgUrl"
    )
    .where({ user_id });
}

async function addArtwork(art) {
  const [id] = await db("artwork").insert(art);

  return findArtworkById(id);
}

function updateArtwork(id, newInfo) {
  return db("artwork")
    .where({ id })
    .update(newInfo);
}

function removeArtwork(id) {
  return db("artwork")
    .where({ id })
    .del();
}
