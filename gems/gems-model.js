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


function findGemsByDistance ( long, lat, threshold ) {
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
  
  do {
    console.log('Entering Do While Loop...')
    extents = expandExtents(extents, radius)
    console.log('getCountResult:  ', getGemCount(extents))
    nearbyGems = getGemCount(extents)
    console.log('     Do While Loop has Count: ', nearbyGems)
  } while (nearbyGems < threshold)
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

 function getGemCount(extents) {
   let count = 0
   const builder = db
   .count('t.* as count')
   // You actually can use string|function with this = knex builder|another knex builder
   .from(function () {
       // Your actual query goes here
       this
          .select('*')
          .from('gems')
          .where("longitude", ">=", extents.minLong)
          .andWhere("longitude", "<=", extents.maxLong)
          .andWhere("latitude", ">=", extents.minLat)
          .andWhere("latitude", "<=", extents.maxLat)
          .as('t') // Alias for your DB (For example Postgres requires that inner query must have an alias)
   })
   .first()
   const query = builder.toString()
   builder.first().then(function(count) { let resultCount = count.count
                                          console.log('Count returned: ',resultCount);
                                          return resultCount; });
   console.log('Count Query: ', query)

  // count = db("gems").count("id")
  // .where("longitude", ">=", extents.minLong)
  // .andWhere("longitude", "<=", extents.maxLong)
  // .andWhere("latitude", ">=", extents.minLat)
  // .andWhere("latitude", "<=", extents.maxLat)
  // console.log('getGemCount Result: ', count.first())
  //return count
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
