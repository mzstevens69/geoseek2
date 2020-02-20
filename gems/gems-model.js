const db= require('../dbConfig')

module.exports={
    addGem,
    findGems,
    findGemsByUserId,
    updateGem,
    deleteGem
}

function addGem(gem){
    return db('gems')
        .insert(gem)
}

function findGems(){
    return db('gems').select("*");
}

function findGemsByUserId(userId){
    return db('gems')
        .where ('user_id', userId)
}

function updateGem(id, updated){
    return db('gems')
        .where('id', id)
        .update(updated)
        .then(() => {
            return db('gems')
            .where('id', id)
          })
}

function deleteGem(id){
    return db('gems')
        .where('id', id)
        .delete()
}