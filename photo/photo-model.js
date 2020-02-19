const db = require('../dbConfig')

module.exports = {
   findPhotoByGem,
   create,
   findAll,
   edit 
}

function edit(id, edit) {
    return db('photo_clues')
    .where('id', id)
    .update(edit)
    .then(() => {
        return db('photo_clues')
        .where('id', id)
    })
}

// function updateGem(id, updated){
//     return db('gems')
//         .where('id', id)
//         .update(updated)
//         .then(() => {
//             return db('gems')
//             .where('id', id)
//           })
// }

function findAll() {
    return db('photo_clues')
    .select('*')
}

function findPhotoByGem(gem_id) {
    return db('photo_clues')
    .select('*')
    .where('gem_id', gem_id)
}

function create(photo) {
    return db('photo_clues')
    .insert(photo)
}