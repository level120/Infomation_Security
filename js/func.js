var key, varp, shf1, k1, shf2, k2, text, e, cipher;

// begin key
function checkKey() {
    key = document.getElementById("key").value;

    if (function () {
            return /^[0-9]+$/g.test(key) ? false : true;
        }() || function () {
            key *= 1;
            if (key < 0 || key > 1023) return true;
            else return false;
        }()) {
        document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-error has-feedback');
        alert('키 값이 올바르지 않습니다.\n유효 키 값의 범위는 0 ~ 1023 입니다.');
        document.getElementById("key").focus();
        return true;
    }
    document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-success has-feedback');
    return false;
}

function kp10() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                varp = p(10, key, 10);
                document.getElementById("p10").focus();
                document.getElementById("p10").value = getbit(10, varp);
                resolve(true);
            }, 500);
        });
}

function shi1() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                shf1 = (ls(1, 5, varp >> 5) << 5) | ls(1, 5, varp & 0x1F);
                document.getElementById("shift1").focus();
                document.getElementById("shift1").value = getbit(10, shf1);
                resolve(true);
            }, 500);
        });
}

function key1() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                k1 = p(8, shf1, 10);
                document.getElementById("k1").focus();
                document.getElementById("k1").value = getbit(8, k1);
                resolve(true);
            }, 500);
        });
}

function shi2() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                shf2 = (ls(2, 5, shf1 >> 5) << 5) | ls(2, 5, shf1 & 0x1F);
                document.getElementById("shift2").focus();
                document.getElementById("shift2").value = getbit(10, shf2);
                resolve(true);
            }, 500);
        });
}

function key2() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                k2 = p(8, shf2, 10);
                document.getElementById("k2").focus();
                document.getElementById("k2").value = getbit(8, k2);
                resolve(true);
            }, 500);
        });
}
// end key


// begin encrypt
function getPlainText() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                text = document.getElementById("text_encrypt1").value;
                resolve(true);
            }, 200);
        });
}

function getChar(idx) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                document.getElementById("text_encrypt1").focus();
                if (text[idx].charCodeAt(0) > 0xFF) {
                    resolve([text[idx].charCodeAt(0) >> 8, text[idx].charCodeAt(0) & 0xFF]);
                } else {
                    resolve([text[idx].charCodeAt(0)]);
                }
            }, 200);
        });
}

function calcEnIp(inv, item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = ip(inv, item);
                document.getElementById("ip_encrypt1").focus();
                document.getElementById("ip_encrypt1").value = getbit(8, res);
                resolve(res);
            }, 200);
        });
}

function calcEnFk1(ip, k) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = fk(ip, k);
                document.getElementById("fk_encrypt1").focus();
                document.getElementById("fk_encrypt1").value = getbit(8, res);
                resolve(res);
            }, 200);
        });
}

function calcEnSw(item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = sw(item);
                document.getElementById("sw_encrypt").focus();
                document.getElementById("sw_encrypt").value = getbit(8, res);
                resolve(res);
            }, 200);
        });
}

function calcEnFk2(ip, k) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = fk(ip, k);
                document.getElementById("fk_encrypt2").focus();
                document.getElementById("fk_encrypt2").value = getbit(8, res);
                resolve(res);
            }, 200);
        });
}

function calcEnIpInv(inv, item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = ip(inv, item);
                document.getElementById("ip_encrypt2").focus();
                document.getElementById("ip_encrypt2").value = getbit(8, res);
                resolve(res);
            }, 200);
        });
}

function outCipherText(chk, item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var tmp = document.getElementById("text_encrypt2").value;

                if (chk) {
                    tmp = e + String.fromCharCode(item);
                    document.getElementById("text_encrypt2").value = tmp;
                } else {
                    e += String.fromCharCode(item);
                    document.getElementById("text_encrypt2").value = e;
                }

                document.getElementById("text_encrypt2").focus();
                resolve(true);
            }, 200);
        });
}

function calcText() {
    var res = 0;

    for (var i in text) {
        if (text[i].charCodeAt(0) > 0xFF) {
            res += 200 * 9;
        }
        res += 200 * 9;
    }

    return res;
}

function encryptText() {
    return new Promise(
        function (resolve, reject) {
            var n = 0;
            for (var i in text) {
                (function (x) {
                    if (text[x].charCodeAt(0) > 0xFF) {
                        n += 1800;
                    }
                    var t1 = setTimeout(
                        function () {
                            var bitset;
                            var result = 0;

                            getChar(x)
                                .then(function (res) {
                                    bitset = res;
                                })
                                .then(
                                    function () {
                                        return function () {
                                            for (var j in bitset) {
                                                (function (y) {
                                                    var t2 = setTimeout(
                                                        function () {
                                                            var resIp, resFk1, resSw, resFk2, resIpInv;

                                                            calcEnIp(false, bitset[y])
                                                                .then(function (res) {
                                                                    resIp = res;
                                                                    return calcEnFk1(resIp, k1);
                                                                })
                                                                .then(function (res) {
                                                                    resFk1 = res;
                                                                    return calcEnSw(resFk1);
                                                                })
                                                                .then(function (res) {
                                                                    resSw = res;
                                                                    return calcEnFk2(resSw, k2);
                                                                })
                                                                .then(function (res) {
                                                                    resFk2 = res;
                                                                    return calcEnIpInv(true, resFk2);
                                                                })

                                                                .then(function (res) {
                                                                    resIpInv = res;
                                                                    result |= resIpInv;

                                                                    if (y == 0 && (text[x].charCodeAt(0) > 0xFF)) {
                                                                        result = result << 8;
                                                                        return outCipherText(true, result);
                                                                    } else {
                                                                        clearTimeout(t1);
                                                                        clearTimeout(t2);
                                                                        return outCipherText(false, result);
                                                                    }
                                                                });
                                                        }, 200 * 5 * y);
                                                })(j);
                                            }
                                        }();
                                    });
                        }, 200 * 6 * x + (x == 0 ? 0 : n));
                })(i);
            }
            resolve(true);
        });
}
// end encrypt


// begin decrypt
function getCipherText() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                //                e = document.getElementById("text_encrypt2").value;
                resolve(true);
            }, 200);
        });
}

function getCharde(idx) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                document.getElementById("text_decrypt1").focus();
                if (e[idx].charCodeAt(0) > 0xFF) {
                    resolve([e[idx].charCodeAt(0) >> 8, e[idx].charCodeAt(0) & 0xFF]);
                } else {
                    resolve([e[idx].charCodeAt(0)]);
                }
            }, 200);
        });
}

function calcDeIp(inv, item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = ip(inv, item);
                document.getElementById("ip_decrypt2").value = getbit(8, res);
                document.getElementById("ip_decrypt2").focus();
                resolve(res);
            }, 200);
        });
}

function calcDeFk1(ip, k) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = fk(ip, k);
                document.getElementById("fk_decrypt2").value = getbit(8, res);
                document.getElementById("fk_decrypt2").focus();
                resolve(res);
            }, 200);
        });
}

function calcDeSw(item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = sw(item);
                document.getElementById("sw_decrypt").value = getbit(8, res);
                document.getElementById("sw_decrypt").focus();
                resolve(res);
            }, 200);
        });
}

function calcDeFk2(ip, k) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = fk(ip, k);
                document.getElementById("fk_decrypt1").value = getbit(8, res);
                document.getElementById("fk_decrypt1").focus();
                resolve(res);
            }, 200);
        });
}

function calcDeIpInv(inv, item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var res = ip(inv, item);
                document.getElementById("ip_decrypt1").value = getbit(8, res);
                document.getElementById("ip_decrypt1").focus();
                resolve(res);
            }, 200);
        });
}

function outPlainText(chk, item) {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                var tmp = document.getElementById("text_encrypt2").value;

                if (chk) {
                    tmp = cipher + String.fromCharCode(item);
                    document.getElementById("text_decrypt1").value = tmp;
                } else {
                    cipher += String.fromCharCode(item);
                    document.getElementById("text_decrypt1").value = cipher;
                }

                document.getElementById("text_decrypt1").focus();
                resolve(true);
            }, 200);
        });
}

//function calcE() {
//    var res = 0;
//
//    for (var i in e) {
////        if (e[i].charCodeAt(0) > 0xFF) {
////            res += 200 * 7;
////        }
//        res += 200 * 7;
//    }
//
//    return res;
//}

function decryptText() {
    return new Promise(
        function (resolve, reject) {
            var n = 0;
            for (var i in e) {
                (function (x) {
                    if (e[x].charCodeAt(0) > 0xFF) {
                        n += 1800;
                    }
                    var t1 = setTimeout(
                        function () {
                            var bitset;
                            var result = 0;

                            getCharde(x)
                                .then(function (res) {
                                    bitset = res;
                                })
                                .then(
                                    function () {
                                        return function () {
                                            for (var j in bitset) {
                                                (function (y) {
                                                    var t2 = setTimeout(
                                                        function () {
                                                            var resIp, resFk1, resSw, resFk2, resIpInv;

                                                            calcDeIp(false, bitset[y])
                                                                .then(function (res) {
                                                                    resIp = res;
                                                                    return calcDeFk1(resIp, k2);
                                                                })
                                                                .then(function (res) {
                                                                    resFk1 = res;
                                                                    return calcDeSw(resFk1);
                                                                })
                                                                .then(function (res) {
                                                                    resSw = res;
                                                                    return calcDeFk2(resSw, k1);
                                                                })
                                                                .then(function (res) {
                                                                    resFk2 = res;
                                                                    return calcDeIpInv(true, resFk2);
                                                                })

                                                                .then(function (res) {
                                                                    resIpInv = res;
                                                                    result |= resIpInv;

                                                                    if (y == 0 && (e[x].charCodeAt(0) > 0xFF)) {
                                                                        result = result << 8;
                                                                        return outPlainText(true, result);
                                                                    } else {
                                                                        clearTimeout(t1);
                                                                        clearTimeout(t2);
                                                                        return outPlainText(false, result);
                                                                    }
                                                                });
                                                        }, 200 * 5 * y);
                                                })(j);
                                            }
                                        }();
                                    });
                        }, 200 * 6 * x + (x == 0 ? 0 : n));
                })(i);
            }
            resolve(true);
        });
}
// end decrypt


// other functions
function resetRun() {
    document.getElementById("ip_encrypt1").value = document.getElementById("fk_encrypt1").value = document.getElementById("sw_encrypt").value = document.getElementById("fk_encrypt2").value = document.getElementById("ip_encrypt2").value = document.getElementById("text_encrypt2").value = document.getElementById("ip_decrypt1").value = document.getElementById("fk_decrypt1").value = document.getElementById("sw_decrypt").value = document.getElementById("fk_decrypt2").value = document.getElementById("ip_decrypt2").value = document.getElementById("text_decrypt1").value = document.getElementById("text_decrypt2").value = document.getElementById("p10").value = document.getElementById("shift1").value = document.getElementById("k1").value = document.getElementById("shift2").value = document.getElementById("k2").value = '';
    document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-feedback');
    e = '';
    cipher = '';
}

function reset() {
    document.getElementById("key").value = document.getElementById("ip_encrypt1").value = document.getElementById("fk_encrypt1").value = document.getElementById("sw_encrypt").value = document.getElementById("fk_encrypt2").value = document.getElementById("ip_encrypt2").value = document.getElementById("text_encrypt1").value = document.getElementById("text_encrypt2").value = document.getElementById("ip_decrypt1").value = document.getElementById("fk_decrypt1").value = document.getElementById("sw_decrypt").value = document.getElementById("fk_decrypt2").value = document.getElementById("ip_decrypt2").value = document.getElementById("text_decrypt1").value = document.getElementById("text_decrypt2").value = document.getElementById("p10").value = document.getElementById("shift1").value = document.getElementById("k1").value = document.getElementById("shift2").value = document.getElementById("k2").value = '';
    document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-feedback');
    e = '';
    cipher = '';
}

function reset2() {
    document.getElementById("key_2").value = document.getElementById("text_encrypt1_2").value = document.getElementById("text_decrypt1_2").value = document.getElementById("text_encrypt2_2").value = document.getElementById("text_decrypt2_2").value = '';
    document.getElementById("key_2").parentElement.parentElement.setAttribute('class', 'form-group has-feedback');
    e = '';
    cipher = '';
}

function copy_auto() {
    return new Promise(
        function (resolve, reject) {
            var t = setTimeout(function () {
                clearTimeout(t);
                document.getElementById("text_decrypt2").value = document.getElementById("text_encrypt2").value;
                resolve(true);
            }, calcText());
        });
}

//function copy() {
//    document.getElementById("text_decrypt2").value = document.getElementById("text_encrypt2").value;
//}


// run
function run() {
    resetRun();

    if (checkKey()) {
        return;
    }

    kp10()
        .then(function () {
            return shi1();
        })
        .then(function () {
            return key1();
        })
        .then(function () {
            return shi2();
        })
        .then(function () {
            return key2();
        })
        .then(function () {
            return getPlainText();
        })
        .then(function () {
            return encryptText();
        })
        .then(function () {
            return copy_auto();
        })
        .then(function () {
            return getCipherText();
        })
        .then(function () {
            return decryptText();
        });
}

function run2() {
    var key = document.getElementById("key_2").value;

    if (function () {
            return /^[0-9]+$/g.test(key) ? false : true;
        }() || function () {
            key *= 1;
            if (key < 0 || key > 1023) return true;
            else return false;
        }()) {
        document.getElementById("key_2").parentElement.parentElement.setAttribute('class', 'form-group has-error has-feedback');
        alert('키 값이 올바르지 않습니다.\n유효 키 값의 범위는 0 ~ 1023 입니다.');
        document.getElementById("key_2").focus();
        return;
    }
    document.getElementById("key_2").parentElement.parentElement.setAttribute('class', 'form-group has-success has-feedback');

    // Key
    var varp = p(10, key, 10);
    var shf1 = (ls(1, 5, varp >> 5) << 5) | ls(1, 5, varp & 0x1F);
    var k1 = p(8, shf1, 10);
    var shf2 = (ls(2, 5, shf1 >> 5) << 5) | ls(2, 5, shf1 & 0x1F);
    var k2 = p(8, shf2, 10);

    // encrypt
    var text = document.getElementById("text_encrypt1_2").value;
    var e = '';
    var t = '';

    for (var i in text) {
        if (text[i].charCodeAt(0) > 0xFF) {
            var bitset = [text[i].charCodeAt(0) >> 8, text[i].charCodeAt(0) & 0xFF];
            var result = 0;

            for (var j in bitset) {
                var resIp = ip(false, bitset[j]);
                var resFk1 = fk(resIp, k1);
                var resSw = sw(resFk1);
                var resFk2 = fk(resSw, k2);
                var resIpInv = ip(true, resFk2);
                result |= resIpInv;

                if (j == 0) {
                    result = result << 8;
                }
            }
            e += String.fromCharCode(result);
            document.getElementById("text_encrypt2_2").value = e;
        } else {
            var resIp = ip(false, text[i].charCodeAt(0));
            var resFk1 = fk(resIp, k1);
            var resSw = sw(resFk1);
            var resFk2 = fk(resSw, k2);
            var resIpInv = ip(true, resFk2);
            e += String.fromCharCode(resIpInv);
            document.getElementById("text_encrypt2_2").value = e;
        }
    }

    document.getElementById("text_decrypt2_2").value = e;

    // decrypt
    for (var i in e) {
        if (e[i].charCodeAt(0) > 0xFF) {
            var bitset = [e[i].charCodeAt(0) >> 8, e[i].charCodeAt(0) & 0xFF];
            var result = 0;

            for (var j in bitset) {
                var resIp = ip(false, bitset[j]);
                var resFk1 = fk(resIp, k2);
                var resSw = sw(resFk1);
                var resFk2 = fk(resSw, k1);
                var resIpInv = ip(true, resFk2);
                result |= resIpInv;

                if (j == 0) {
                    result = result << 8;
                }
            }
            t += String.fromCharCode(result);
            document.getElementById("text_decrypt1_2").value = t;
        } else {
            var resIp = ip(false, e[i].charCodeAt(0));
            var resFk1 = fk(resIp, k2);
            var resSw = sw(resFk1);
            var resFk2 = fk(resSw, k1);
            var resIpInv = ip(true, resFk2);
            t += String.fromCharCode(resIpInv);

            document.getElementById("text_decrypt1_2").value = t;
        }
    }
}
