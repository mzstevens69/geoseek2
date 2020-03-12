const db = require("../dbConfig");

module.exports = {
  findPhotoByGem,
  createPhoto,
  findAll, // Remove
  editPhoto,
  destroy
};

function destroy(id) {
  return db("photo_clues")
    .where({ id })
    .delete();
}

function editPhoto(id, edit) {
  return db("photo_clues")
    .where("id", id)
    .update(edit)
    .then(() => {
      return db("photo_clues").where("id", id);
    });
}

function findAll() {
  return db("photo_clues").select("*");
}

function findPhotoByGem(gem_id) {
  return db("photo_clues")
    .select("*")
    .where("gem_id", gem_id);
}

function createPhoto(photo) {
  return db("photo_clues").insert(photo);
}
