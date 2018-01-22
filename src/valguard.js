(function (global) {
    let valguard = function () {

    };

    valguard.make = {};
    valguard.has = {};
    valguard.is = {};
    //simple checks
    /**
     * @param string
     * @return {boolean}
     */
    valguard.has.uppercase = function (string) {
        return /(?=.*[A-Z])/.test(string);
    };
    /**
     *
     * @param string
     * @return {boolean}
     */
    valguard.has.lowercase = function (string) {
        return /(?=.*[a-z])/.test(string);
    };
    /**
     * @param string
     * @return {boolean}
     */
    valguard.has.symbol = function (string) {
        return /(?=.*[@#$%])/.test(string);
    };
    /**
     * @param string
     * @return {boolean}
     */
    valguard.has.email = function (string) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(string);
    };


    valguard.is['>='] = function (value, min) {
        if(typeof value === 'string'){
            return value.length >= min;
        }else{
            return value >= min;
        }

    };
    valguard.is['<='] = function (value, max) {
        if(typeof value === 'string'){
            return value.length <= max;
        }else{
            return value <=  max;
        }
    };
    valguard.is['>'] = function (value,num) {
        if(typeof value === 'string'){
            return value.length > num;
        }else{
            return value > min;
        }

    };

    valguard.is['<'] = function (value,num) {
        if (typeof value === 'string') {
            return value.length < num;
        } else {
            return value < num;
        }
    };
    valguard.is['='] = function (value,num) {
        if (typeof value === 'string') {
            return value.length < num;
        } else {
            return value < num;
        }
    };




    /**
     * @desc options.banned contains the not allowed domains. Details: isEmail, isNotBanned
     * @param options
     * @return {Function}
     */
    valguard.make.email = function (options) {
        return function (email) {
            let banned = options.banned || null;
            let domain = email.split('@').pop();
            let isEmail = valguard.has.email(email);
            let isNotBanned = banned ? banned.includes(domain) : true;
            return {result: isEmail && isNotBanned, details: {email: isEmail, NotBanned: isNotBanned}}
        };
    };
    valguard.make.validation = function (options) {
        return function (password) {
            let obj = {};
            let res = [];
            if (options.have) {
                res.concat(options.have.map(check => {
                    let temp = valguard.has[check](password);
                    obj[check] = temp;
                    return temp;
                }));
            }
            if (options.is){
                for (is in options.is){
                    if(options.is.hasOwnProperty(is)){
                        let temp = valguard.is[is](password, options.is[is]);
                        res.push(temp);
                        obj[is] = temp;
                    }
                }
            }
            return {result: !res.includes(false), details: obj}
        }
    };
    global.Valguard = valguard;
})(typeof window === 'undefined' ? global : window);

let emailVal = Valguard.make.email({
    banned: ['yahoo.com']
});
let passVal = Valguard.make.validation({
    have: ['symbol', 'uppercase', 'lowercase'],
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

console.log(Valguard.is['>=']('phwH',1));
console.log(Valguard.has.lowercase('sssHDD'));