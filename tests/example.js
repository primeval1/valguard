
//there is no export variable on valguard file right now.
require('../src/valguard');
let emailVal = Valguard.make.email({
    banned: ['yahoo.com']
});
let passVal = Valguard.make.validation({
    have: ['specialSymbol', 'uppercase', 'lowercase','numbers'],
    is: {'>=':4},
});
console.log(
    emailVal('sdjd@gmail.com'),
    emailVal('sdjd@yahoo.com'),
    emailVal('sss'),
    passVal('phw'),
    passVal('asdf!@#$%'),
    passVal('A!@#$%'),
    passVal('12345678910aB@'),
    passVal('12345aA@'),
);

console.log(Valguard.has.numbers('wewdkfkjd'));
console.log(Valguard.is['>=']('phwH',1));
console.log(Valguard.has.lowercase('sssHDD'));