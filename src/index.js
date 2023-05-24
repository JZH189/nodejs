import assert from 'node:assert/strict';

// 待测试代码
function sum(...arr) {
  return arr.reduce((p, c) => p + c)
}

// try {
//   // 测试代码
//   assert(sum(1, 2) === 4, ' 预期 sum(1, 2) 返回 3')
// } catch (error) {
//   console.log('error: ', error);
// }

assert.deepStrictEqual({ a: 1 }, { a: '1' });

