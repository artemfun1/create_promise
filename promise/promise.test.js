const MyPromise = require('./promise');

const t = setTimeout

describe('Promise', () => {

  let promise
  let executorSpy
  const successResult = 42
  const errorResult = 'i am error'

  beforeEach(()=>{
    executorSpy = jest.fn((r) => t(()=>r(successResult),50));
    promise = new MyPromise(executorSpy);
  })

  test('should exists and to be typeof function', () => {
    expect(MyPromise).toBeDefined();
    expect(typeof MyPromise).toBe('function');
  });

  test('should have methods: then, catch, finally', () => {
    expect(promise.then).toBeDefined();
    expect(promise.catch).toBeDefined();
    expect(promise.finally).not.toBeUndefined();
  });

  test('should call executor function', () => {
    expect(executorSpy).toHaveBeenCalled();
  });

  test('should get data in then block and chain them', async () => {
    const result = await promise.then(num=>num).then(num=>num*2)
    expect(result).toEqual(successResult*2)
  });

  test('should catch error', () => {
    const err = (_, r)=>t(()=>r(errorResult),50)
    const errorPromise = new MyPromise(err)
    return new Promise(resolve=>{
      errorPromise.catch(error=>{
        expect(error).toEqual(errorResult)
        resolve()
      })
    })
  });

  test('should call finally method', async () => {
    const finallySpy = jest.fn(()=>{})
    await promise.finally(finallySpy)

    expect(finallySpy).toHaveBeenCalled()
  });


});
