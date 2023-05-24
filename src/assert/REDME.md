# node:assert 模块提供了一组用于验证不变量的断言函数。

## assert.ok(value[, message])

- value \<any>
- message \<string> | \<Error>

测试 value 是否为真。 相当于 assert.equal(!!value, true, message)。

如果 value 不是真值，则抛出 AssertionError，其 message 属性设置为等于 message 参数的值。 如果 message 参数为 undefined，则分配默认错误消息。 如果 message 参数是 Error 的实例，则将抛出错误而不是 AssertionError。 如果根本没有传入任何参数，message 将被设置为字符串： 'No value argument passed to `assert.ok()`'。


```js
import assert from 'node:assert/strict';

assert.ok(true);
// OK
assert.ok(1);
// OK

assert.ok();
// AssertionError: No value argument passed to `assert.ok()`

assert.ok(false, 'it\'s false');
// AssertionError: it's false
```

## assert(value[, message])

- value \<any> 检查为真的输入。
- message \<string> | \<Error>

assert.ok() 的别名

## assert.deepEqual(actual, expected[, message])

- actual \<any>
- expected \<any>
- message \<string> | \<Error>

严格断言模式。assert.deepStrictEqual() 的别名。

测试 actual 和 expected 参数之间的深度相等。 考虑使用 assert.deepStrictEqual() 代替。 assert.deepEqual() 可能产生意外的结果。

深度相等意味着子对象的可枚举 "自有" 属性也按以下规则递归计算。

比较详情：
- 原始值与 == 操作符 进行比较，但 NaN 除外。 如果双方都是 NaN，则视为相同。
- 对象的 Type tags 应该是相同的。
- 仅考虑 可枚举的 "自有" 属性。
- Error 名称和消息总是被比较，即使它们不是可枚举的属性。
- 对象封装器 作为对象和展开的值进行比较。
- Object 属性是无序比较的。
- Map 键和 Set 项是无序比较的。
- 当双方不同或双方遇到循环引用时，则递归停止。
- 实现不测试对象的 \[[Prototype]]。
- 不比较 Symbol 属性。
- WeakMap 和 WeakSet 的比较不依赖于它们的值。
- RegExp 的 lastIndex、flags 和 source 总是被比较，即使它们不是可枚举的属性。

如果值不相等，则抛出 AssertionError，其 message 属性设置为等于 message 参数的值。 如果未定义 message 参数，则分配默认错误消息。 如果 message 参数是 Error 的实例，则将抛出错误而不是 AssertionError。

## assert.deepStrictEqual(actual, expected[, message])

- actual \<any>
- expected \<any>
- message \<string> | \<Error>

测试 actual 和 expected 参数之间的深度相等。 "深度" 相等意味着子对象的可枚举 "自有" 属性也按以下规则递归计算。

比较详情:
- 使用 Object.is() 比较原始值。
- 对象的 Type tags 应该是相同的。
- 使用 === 操作符 比较对象的 \[[Prototype]]。
- 仅考虑 可枚举的 "自有" 属性。
- Error 名称和消息总是被比较，即使它们不是可枚举的属性。
- 也比较了可枚举的自有 Symbol 属性。
- 对象封装器 作为对象和展开的值进行比较。
- Object 属性是无序比较的。
- Map 键和 Set 项是无序比较的。
- 当双方不同或双方遇到循环引用时，则递归停止。
- WeakMap 和 WeakSet 的比较不依赖于它们的值。 有关更多详细信息，请参见下文。
- RegExp 的 lastIndex、flags 和 source 总是被比较，即使它们不是可枚举的属性。


```js

import assert from 'node:assert/strict';

// This fails because 1 !== '1'.
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   {
// +   a: 1
// -   a: '1'
//   }

// The following objects don't have own properties
const date = new Date();
const object = {};
const fakeDate = {};
Object.setPrototypeOf(fakeDate, Date.prototype);

// Different [[Prototype]]:
assert.deepStrictEqual(object, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + {}
// - Date {}

// Different type tags:
assert.deepStrictEqual(date, fakeDate);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 2018-04-26T00:49:08.604Z
// - Date {}

assert.deepStrictEqual(NaN, NaN);
// OK because Object.is(NaN, NaN) is true.

// Different unwrapped numbers:
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + [Number: 1]
// - [Number: 2]

assert.deepStrictEqual(new String('foo'), Object('foo'));
// OK because the object and the string are identical when unwrapped.

assert.deepStrictEqual(-0, -0);
// OK

// Different zeros:
assert.deepStrictEqual(0, -0);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
// + 0
// - -0

const symbol1 = Symbol();
const symbol2 = Symbol();
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });
// OK, because it is the same symbol on both objects.

assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError [ERR_ASSERTION]: Inputs identical but not reference equal:
//
// {
//   [Symbol()]: 1
// }

const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap([[{}, {}]]);
const weakMap3 = new WeakMap();
weakMap3.unequal = true;

assert.deepStrictEqual(weakMap1, weakMap2);
// OK, because it is impossible to compare the entries

// Fails because weakMap3 has a property that weakMap1 does not contain:
assert.deepStrictEqual(weakMap1, weakMap3);
// AssertionError: Expected inputs to be strictly deep-equal:
// + actual - expected
//
//   WeakMap {
// +   [items unknown]
// -   [items unknown],
// -   unequal: true
//   }
```


如果值不相等，则抛出 AssertionError，其 message 属性设置为等于 message 参数的值。 如果未定义 message 参数，则分配默认错误消息。 如果 message 参数是 Error 的实例，则将抛出错误而不是 AssertionError。