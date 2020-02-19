const router= require('express').Router()
const gems= require('./gems-model')

router.post('/', (req, res)=>{
    const newGem= req.body
    if(!newGem.longitude){
        res.status(422).json({error: 'please provide longitude'})
    }
    if(!newGem.latitude){
        res.status(422).json({error: 'please provide latitude'})
    }
    if(!newGem.difficulty){
        res.status(422).json({error: 'please provide a difficulty rating'})
    }
    gems.addGem(newGem)
        .then(gem=>{
            res.status(201).json({message: 'gem created'})
        })
        .catch(err=>{
            res.status(500).json({error: 'error creating gem'})
        })
})

router.get('/', (req, res)=>{
    gems.findGems()
        .then(gem=>{
            res.status(201).json(gem)
        })
        .catch(err=>{
            res.status(500).json({error: 'error fetching gems'})
        })
})

router.get('/:id', (req, res)=>{
    const userId= req.body
    gems.findGemsByUserId(userId)
        .then(gems=>{
            res.status(201).json(gems)
        })
        .catch(err=>{
            res.status(500).json({error: 'error fetching gems'})
        })
})

router.put('/:id', (req, res)=>{
    const id= req.params.id
    const changes= req.body
    gems.updateGem(id, changes)
        .then(update=>{
            res.status(200).json({success: true})
        })
        .catch(err=>{
            res.status(500).json({error: `error updating gem ${id}`})
        })
})

router.delete('/:id', (req, res)=>{
    const id= req.params.id
    gems.deleteGem(id)
        .then(gem=>{
            if(gem){
                res.status(200).json({message: `deleted gem ${id}`})
            }else{
                res.status(404).json({error: 'could not find gem with given ID'})
            }
        })
        .catch(err=>{
            res.status(500).json({error: `error updaing gem ${id}`})
        })
})

module.exports= router