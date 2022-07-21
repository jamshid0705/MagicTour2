class FeatureApi{
  constructor(clientQuery,dataQuery){
    this.clientQuery=clientQuery,
    this.dataQuery=dataQuery
  }
  filter(){
    const filter=JSON.stringify({...this.clientQuery})
    const query=filter.replace(/\bgte\b/g,'$gte').replace(/\bgt\b/g,'$gt').replace(/\blte\b/g,'$lte').replace(/\blt\b/g,'$lt')
    this.dataQuery=this.dataQuery.find(JSON.parse(query))
    return this
  }
  sort(){
    if(this.clientQuery.sort){
      const query=this.clientQuery.sort.split(',').join(' ')
      this.dataQuery=this.dataQuery.sort(query)
    }
    return this
  }
  field(){
    if(this.clientQuery.field){
      const query=this.clientQuery.field.split(',').join(' ')
      this.dataQuery=this.dataQuery.select(query)
    }
    return this
  }
  page(){
    if(this.clientQuery.page && this.clientQuery.limit){
      const limit=this.clientQuery.limit*1
      const page=this.clientQuery.page*1
      const skip=(page-1)*limit
      this.dataQuery=this.dataQuery.skip(skip).limit(limit)
    }
    return this
  }
}

module.exports=FeatureApi