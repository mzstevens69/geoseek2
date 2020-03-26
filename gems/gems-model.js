const db = require( "../dbConfig" );
const radius = 0.08;

module.exports = {
  addGem,
  findGems,
  findById,
  findGemsByUserId,
  updateGem,
  deleteGem,
  findGemsByDistance,
  findGemsForViewport
};

function addGem(gem) {
  return db("gems")
    .returning("id")
    .insert(gem);
}

function findGems() {
  return db("gems").select("*");
}

function findById(id) {
  return db("gems") 
    .where({ id })
    .first();
}

function findGemsByUserId(userId) {
  return db("gems").where("created_by_user", userId); 
}


async function findGemsByDistance ( long, lat, threshold ) {
  console.log ('Starting findGemsByDistance - Latitude: ',lat, 'Longitude: ', long, 'Threshold: ', threshold)
  let viewport = {
    minLong: long,
    maxLong: long,
    minLat: lat,
    maxLat: lat
  }
  console.log('Initial viewport: ', viewport)
  let nearbyGems = 0;
  let count = 0;

  console.log("Entering Do While Loop...");
  do {
    count += count
    viewport = expandExtents(viewport, radius)
    nearbyGems = await getGemCount(viewport)
  } while ((nearbyGems < threshold) || (count > 20))
  console.log('Exited Do While Loop... with nearby count: ', nearbyGems)
  const result = await findGemsForViewport(viewport, 0)
  return result
 } 

 async function findGemsForViewport(viewport, extents) {
  if (extents == null) {extents = 1}
  var i;
  if ( extents > 0 ) {
    for (i=0;i >= extents; i++) {
      console.log('Expanding in findGemsForViewport ', extents,' times ...count: ', i)
      expandExtents(viewport, radius)
    }
  }
  const result = await db( "gems" )
  .where("longitude", ">=", viewport.minLong)
  .andWhere("longitude", "<=", viewport.maxLong)
  .andWhere("latitude", ">=", viewport.minLat)
  .andWhere("latitude", "<=", viewport.maxLat)
  return result
 }

 function expandExtents(viewport, by) {
    viewport.minLong -= by
    viewport.maxLong += by
    viewport.minLat -= by
    viewport.maxLat += by
    console.log('Extended to:', viewport)
    return viewport
 }

 async function getTotalGemCount() {
  const result = await db("gems")
  .count("id")
  .first()
  console.log('Count returned: ',result.count)
  return result.count

 }

 async function getGemCount(viewport) {
    const result = await db("gems")
    .count("id")
    .where("longitude", ">=", viewport.minLong)
    .andWhere("longitude", "<=", viewport.maxLong)
    .andWhere("latitude", ">=", viewport.minLat)
    .andWhere("latitude", "<=", viewport.maxLat)
    .first()
    console.log('Count returned: ',result.count)
    return result.count
 }

function findGemsByFilter() {}

async function updateGem(id, updated) {
  return await db("gems")
    .where("id", id)
    .update(updated)
} 

function deleteGem(id) {
  return db("gems")
    .where({ id })
    .delete();
}
