const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey test cases", () => {
  it("Should return the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  test('Should return the literal \'0\' when event is null', () => {
    expect(deterministicPartitionKey(null)).toEqual('0');
  });

  test('Should work if partition key is very long', () => {
    const tooLongPartitionKey = new Array(100).fill('mrq').join('')
    const hashedValue = crypto.createHash('sha3-512').update(tooLongPartitionKey).digest('hex');
    const event = { partitionKey: tooLongPartitionKey };
    expect(deterministicPartitionKey(event)).toEqual(hashedValue);
  });

  test('Should return the same partitionKey as string if it is passed as a number', () => {
    const event = { partitionKey: 53727 };
    expect(deterministicPartitionKey(event)).toEqual("53727");
  });

  test('Should return hashed generated partition key if it does not exist', () => {
    const event = {name: 'Muhammad Rehan Qadri', age: 28, gender: 'M' };
    const hashedValue = crypto.createHash('sha3-512').update(JSON.stringify(event)).digest('hex');
    expect(deterministicPartitionKey(event)).toEqual(hashedValue);
  });

  test('Should return unchanged partitionKey if provided partitionKey in the event', () => {
    const event = { partitionKey: 'somePartitionKey' };
    expect(deterministicPartitionKey(event)).toEqual('somePartitionKey');
  });


});
