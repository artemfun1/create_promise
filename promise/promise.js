
function noop(){

}

class MyPromise {
 
  constructor(ex){
     this.queue = []
    this.errorHandler = noop
    this.finallyHandler = noop
    try {
      ex.call(null, this.onResolve.bind(this), this.onReject.bind(this))
    } catch (error) {
      this.errorHandler(error)
    } finally{
      this.finallyHandler()
    }
   
  }

  onResolve(data){
    this.queue.forEach(cb=>{
      data = cb(data)
    })

    this.finallyHandler()

  }

  onReject(error){
    this.errorHandler(error)
    this.finallyHandler()
  }

  then(fn){
    this.queue.push(fn)
    return this
  }

  catch(fn){
    this.errorHandler=fn
    return this
  }

  finally(fn){
    this.finallyHandler = fn
    return this
  }



}


module.exports = MyPromise