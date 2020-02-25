const db= require('../dbConfig')

module.exports={
    addGem,
    findById,
    findGems,
    findGemsByUserId,
    updateGem,
    deleteGem
}

function addGem(gem){
    return db('gems')
        .returning('id')
        .insert(gem)
        .then((ids) => {
            return findById(ids[0]);
          });
}
function findById(id) {
    return db("completed")
      .where({ id })
      .first();
  }

function findGems(){
    return db('gems').select("*");
}

function findGemsByUserId(userId){
    return db('gems')
        .where ('user_id', userId)
}

function findGemsByDistance(long, lat){
    let realLong
    let realLat
    let radius= 0.08
    let nearbyGems= 0
    if(Math.sign(long)===-1){
        realLong=(((long*-1)+radius)*-1)
    }else{
        realLong= long+radius
    }
    if(Math.sign(lat)===-1){
       realLat=(((long*-1)+radius)*-1)
    }else{
        realLat= lat+radius
    }
    return db('gems')
        .where('longitude'<=realLong && 'latitude'<=realLat)
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