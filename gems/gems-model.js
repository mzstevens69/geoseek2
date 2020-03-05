const db = require( "../dbConfig" );

module.exports = {
  addGem,
  findGems,
  findById,
  findGemsByUserId,
  updateGem,
  deleteGem,
  findGemsByDistance
};

function addGem ( gem ) {
  return db("gems")
    .returning('id')
    .insert( gem );
}

function findGems () {
  return db( "gems" ).select( "*" );
}

function findById(id) {
    return db("completed")
      .where({ id })
      .first();
  }

function findGemsByUserId ( userId ) {
  return db( "gems" ).where( "user_id", userId );
}


async function findGemsByDistance ( long, lat, threshold ) {
  console.log ('Starting findGemsByDistance - Latitude: ',lat, 'Longitude: ', long, 'Threshold: ', threshold)
  let extents = {
    minLong: long,
    maxLong: long,
    minLat: lat,
    maxLat: lat
  }
  console.log('Initial extents: ', extents)
  let radius = 0.08;
  let nearbyGems = 0;
  
  console.log('Entering Do While Loop...')
  do {
    extents = expandExtents(extents, radius)
    nearbyGems = await getGemCount(extents)
    //console.log('getCountResult:  ', getGemCount(extents))
  } while (nearbyGems < threshold)
  console.log('Exited Do While Loop... with nearby count: ', nearbyGems)
  return db( "gems" )
  .where("longitude", ">=", extents.minLong)
  .andWhere("longitude", "<=", extents.maxLong)
  .andWhere("latitude", ">=", extents.minLat)
  .andWhere("latitude", "<=", extents.maxLat)
 } 

 function expandExtents(extents, by) {
   //console.log('Expanding: ', extents)
    extents.minLong -= by
    extents.maxLong += by
    extents.minLat -= by
    extents.maxLat += by
    console.log('Extended to:', extents)
    return extents
 }

 async function getGemCount(extents) {
    const result = await db("gems")
    .count("id")
    .where("longitude", ">=", extents.minLong)
    .andWhere("longitude", "<=", extents.maxLong)
    .andWhere("latitude", ">=", extents.minLat)
    .andWhere("latitude", "<=", extents.maxLat)
    .first()
    console.log('Count returned: ',result.count)
    return result.count
 }

function findGemsByFilter(){

}

function updateGem ( id, updated ) {
  return db( "gems" )
    .where( "id", id )
    .update( updated )
    .then( () => {
      return db( "gems" ).where( "id", id );
    } );
}

function deleteGem ( id ) {
  return db( "gems" )
    .where( { id } )
    .delete();
}
