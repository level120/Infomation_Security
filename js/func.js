function run() {
    var key = document.getElementById("key").value;

    if (function () {
            return /^[0-9]+$/g.test(key) ? false : true;
        }() || function () {
            key *= 1;
            if (key < 0 || key > 1023) return true;
            else return false;
        }()) {
        document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-error has-feedback');
        alert('키 값이 올바르지 않습니다.\n유효 키 값의 범위는 0 ~ 1023 입니다.');
        return;
    }
    document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-success has-feedback');
    
    // Key
    var varp = p(10, key, 10);
    var shf1 = (ls(1, 5, varp >> 5) << 5) | ls(1, 5, varp & 0x1F);
    var k1 = p(8, shf1, 10);
    var shf2 = (ls(2, 5, shf1 >> 5) << 5) | ls(2, 5, shf1 & 0x1F);
    var k2 = p(8, shf2, 10);

    document.getElementById("p10").value = getbit(10, varp);
    document.getElementById("shift1").value = getbit(10, shf1);
    document.getElementById("k1").value = getbit(8, k1);
    document.getElementById("shift2").value = getbit(10, shf2);
    document.getElementById("k2").value = getbit(8, k2);

    // encrypt
    var text = document.getElementById("text_encrypt1").value;
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

                document.getElementById("ip_encrypt1").value = getbit(8, resIp);
                document.getElementById("fk_encrypt1").value = getbit(8, resFk1);
                document.getElementById("sw_encrypt").value = getbit(8, resSw);
                document.getElementById("fk_encrypt2").value = getbit(8, resFk2);
                document.getElementById("ip_encrypt2").value = getbit(8, resIpInv);
            }
            e += String.fromCharCode(result);
            document.getElementById("text_encrypt2").value = e;
        } else {
            var resIp = ip(false, text[i].charCodeAt(0));
            var resFk1 = fk(resIp, k1);
            var resSw = sw(resFk1);
            var resFk2 = fk(resSw, k2);
            var resIpInv = ip(true, resFk2);
            e += String.fromCharCode(resIpInv);

            document.getElementById("ip_encrypt1").value = getbit(8, resIp);
            document.getElementById("fk_encrypt1").value = getbit(8, resFk1);
            document.getElementById("sw_encrypt").value = getbit(8, resSw);
            document.getElementById("fk_encrypt2").value = getbit(8, resFk2);
            document.getElementById("ip_encrypt2").value = getbit(8, resIpInv);

            document.getElementById("text_encrypt2").value = e;
        }
    }

    document.getElementById("text_decrypt2").value = e;

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

                document.getElementById("ip_decrypt1").value = getbit(8, resIp);
                document.getElementById("fk_decrypt1").value = getbit(8, resFk1);
                document.getElementById("sw_decrypt").value = getbit(8, resSw);
                document.getElementById("fk_decrypt2").value = getbit(8, resFk2);
                document.getElementById("ip_decrypt2").value = getbit(8, resIpInv);
            }
            t += String.fromCharCode(result);
            document.getElementById("text_decrypt1").value = t;
        } else {
            var resIp = ip(false, e[i].charCodeAt(0));
            var resFk1 = fk(resIp, k2);
            var resSw = sw(resFk1);
            var resFk2 = fk(resSw, k1);
            var resIpInv = ip(true, resFk2);
            t += String.fromCharCode(resIpInv);

            document.getElementById("ip_decrypt1").value = getbit(8, resIp);
            document.getElementById("fk_decrypt1").value = getbit(8, resFk1);
            document.getElementById("sw_decrypt").value = getbit(8, resSw);
            document.getElementById("fk_decrypt2").value = getbit(8, resFk2);
            document.getElementById("ip_decrypt2").value = getbit(8, resIpInv);

            document.getElementById("text_decrypt1").value = t;
        }
    }
}

function runStep() {
    var key = document.getElementById("key").value;

    if (function () {
            return /^[0-9]+$/g.test(key) ? false : true;
        }() || function () {
            key *= 1;
            if (key < 0 || key > 1023) return true;
            else return false;
        }()) {
        alert('키 값이 올바르지 않습니다.\n유효 키 값의 범위는 0 ~ 1023 입니다.');
        return;
    }

    // Key
    var varp = p(10, key, 10);
    var shf1 = (ls(1, 5, varp >> 5) << 5) | ls(1, 5, varp & 0x1F);
    var k1 = p(8, shf1, 10);
    var shf2 = (ls(2, 5, shf1 >> 5) << 5) | ls(2, 5, shf1 & 0x1F);
    var k2 = p(8, shf2, 10);

    // encrypt
    var text = document.getElementById("text_encrypt1").value;
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
        } else {
            var resIp = ip(false, text[i].charCodeAt(0));
            var resFk1 = fk(resIp, k1);
            var resSw = sw(resFk1);
            var resFk2 = fk(resSw, k2);
            var resIpInv = ip(true, resFk2);
            e += String.fromCharCode(resIpInv);
        }
    }

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
        } else {
            var resIp = ip(false, e[i].charCodeAt(0));
            var resFk1 = fk(resIp, k2);
            var resSw = sw(resFk1);
            var resFk2 = fk(resSw, k1);
            var resIpInv = ip(true, resFk2);
            t += String.fromCharCode(resIpInv);
        }
    }

            console.log(flag);
    switch (flag) {
        case 16:
            if (document.getElementById("text_decrypt2").value == '') {
                alert('Encrypted Text 필드가 비어있습니다.\n"암호문 자동복사" 버튼을 누른 후 계속하십시오.');
                break;
            }
            document.getElementById("text_decrypt1").value = t;
        case 15:
            if (document.getElementById("text_decrypt2").value == '') {
                alert('Encrypted Text 필드가 비어있습니다.\n"암호문 자동복사" 버튼을 누른 후 계속하십시오.');
                break;
            }
            document.getElementById("ip_decrypt1").value = getbit(8, resIpInv);
        case 14:
            if (document.getElementById("text_decrypt2").value == '') {
                alert('Encrypted Text 필드가 비어있습니다.\n"암호문 자동복사" 버튼을 누른 후 계속하십시오.');
                break;
            }
            document.getElementById("fk_decrypt1").value = getbit(8, resFk2);
        case 13:
            if (document.getElementById("text_decrypt2").value == '') {
                alert('Encrypted Text 필드가 비어있습니다.\n"암호문 자동복사" 버튼을 누른 후 계속하십시오.');
                break;
            }
            document.getElementById("sw_decrypt").value = getbit(8, resSw);
        case 12:
            if (document.getElementById("text_decrypt2").value == '') {
                alert('Encrypted Text 필드가 비어있습니다.\n"암호문 자동복사" 버튼을 누른 후 계속하십시오.');
                break;
            }
            document.getElementById("fk_decrypt2").value = getbit(8, resFk1);
        case 11:
            if (document.getElementById("text_decrypt2").value == '') {
                alert('Encrypted Text 필드가 비어있습니다.\n"암호문 자동복사" 버튼을 누른 후 계속하십시오.');
                break;
            }
            document.getElementById("ip_decrypt2").value = getbit(8, resIp);
            
        case 10:document.getElementById("text_encrypt2").value = e;
        case 9:document.getElementById("ip_encrypt2").value = getbit(8, resIpInv);
        case 8:document.getElementById("fk_encrypt2").value = getbit(8, resFk2);
        case 7:document.getElementById("sw_encrypt").value = getbit(8, resSw);
        case 6:document.getElementById("fk_encrypt1").value = getbit(8, resFk1);
        case 5:document.getElementById("ip_encrypt1").value = getbit(8, resIp);
            
        case 4:document.getElementById("k2").value = getbit(8, k2);
        case 3:document.getElementById("shift2").value = getbit(10, shf2);
        case 2:document.getElementById("k1").value = getbit(8, k1);
        case 1:document.getElementById("shift1").value = getbit(10, shf1);
        case 0:document.getElementById("p10").value = getbit(10, varp); flag++;
    }
}

function reset() {
    document.getElementById("key").value = document.getElementById("ip_encrypt1").value = document.getElementById("fk_encrypt1").value = document.getElementById("sw_encrypt").value = document.getElementById("fk_encrypt2").value = document.getElementById("ip_encrypt2").value = document.getElementById("text_encrypt1").value = document.getElementById("text_encrypt2").value = document.getElementById("ip_decrypt1").value = document.getElementById("fk_decrypt1").value = document.getElementById("sw_decrypt").value = document.getElementById("fk_decrypt2").value = document.getElementById("ip_decrypt2").value = document.getElementById("text_decrypt1").value = document.getElementById("text_decrypt2").value = document.getElementById("p10").value = document.getElementById("shift1").value = document.getElementById("k1").value = document.getElementById("shift2").value = document.getElementById("k2").value = '';
    document.getElementById("key").parentElement.parentElement.setAttribute('class', 'form-group has-feedback');
}

function copy() {
    document.getElementById("text_decrypt2").value = document.getElementById("text_encrypt2").value;
}

