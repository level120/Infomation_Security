// Usage : bit count, item(10=key, 8=char), item length
function p(cnt, item, bit) {
    var bitset = [];
    bitset.length = bit;

    for (var i = 0; i < bitset.length; i++) {
        bitset[i] = (item >> (bitset.length - (i + 1))) & 0x1;
    }
    // console.log((cnt==10?('bitset10 : '):cnt==8?('bitset8 : '):('bitset4 : ')) + bitset);

    var list = (cnt == 10 ? [2, 4, 1, 6, 3, 9, 0, 8, 7, 5] :
        cnt == 8 ? [5, 2, 6, 3, 7, 4, 9, 8] : [1, 3, 2, 0]);
    var result = 0;

    for (i = 0; i < cnt; i++) {
        result |= bitset[list[i]];
        if (i != (cnt - 1)) {
            result = result << 1;
        }
    }
    return result;
}

// Usage : shift count, bit size, item(4-bit)
function ls(scnt, bsize, item) {
    if (scnt == 1) {
        return ((item << 1) | (item >> (bsize - 1))) & 0x1F;
    }

    if (scnt == 2) {
        return ((item << 2) | ((item >> (bsize - 1)) << 1) | ((item >> (bsize - 2)) & 0x1)) & 0x1F;
    }
}

// Usage : is inverter, char(8-bit)
function ip(isInv, item) {
    var bitset = [];
    bitset.length = 8;

    for (var i = 0; i < bitset.length; i++) {
        bitset[i] = (item >> (bitset.length - (i + 1))) & 0x1;
    }
    // console.log('bitset8S : ' + bitset);

    var list = (!isInv ? [1, 5, 2, 0, 3, 7, 4, 6] : [3, 0, 2, 4, 6, 1, 7, 5]);
    var result = 0;

    for (i = 0; i < bitset.length; i++) {
        result |= bitset[list[i]];
        if (i != (bitset.length - 1)) {
            result = result << 1;
        }
    }
    return result;
}

// Usage : right bit(4-bit), sub key
function F(r, sk) {
    var s0 = [
                [1, 0, 3, 2],
                [3, 2, 1, 0],
                [0, 2, 1, 3],
                [3, 1, 3, 2]
            ];
    var s1 = [
                [0, 1, 2, 3],
                [2, 0, 1, 3],
                [3, 0, 1, 0],
                [2, 1, 0, 3]
            ];

    var bitsetR = [];
    var bitsetSK = [];
    bitsetR.length = 4;
    bitsetSK.length = 8;

    for (var i = 0; i < 4; i++) {
        bitsetR[i] = (r >> (4 - (i + 1))) & 0x1;
    }
    for (i = 0; i < 8; i++) {
        bitsetSK[i] = (sk >> (8 - (i + 1))) & 0x1;
    }
    // console.log('bitset4ef : ' + bitsetR);
    // console.log('bitset8sk : ' + bitsetSK);

    var list = [3, 0, 1, 2, 1, 2, 3, 0];
    var ep = 0;

    for (i = 0; i < 8; i++) {
        ep |= bitsetR[list[i]];
        if (i != 7) {
            ep = ep << 1;
        }
    }

    var matP = [];
    matP.length = 8;

    for (i = 0; i < matP.length; i++) {
        matP[i] = bitsetR[i] ^ bitsetSK[i];
        if (i != (matP.length - 1)) {
            matP = matP << 1;
        }
    }

    return p(4, ((s0[(matP[0] << 1) | matP[3]][(matP[1] << 1) | matP[2]] << 2) | s1[(matP[4] << 1) | matP[7]][(matP[5] << 1) | matP[6]]), 4);
}

// Usage : item(8-bit), sub key
function fk(item, sk) {
    var l = item >> 4;
    var r = item & 0xF;

    return (l ^ F(r, sk)) << 4 | r;
}

// Usage : item(8-bit)
function sw(item) {
    return ((item & 0xF) << 4) | (item >> 4);
}

// Usage : bit count, item(n-bit)
function getbit(cnt, item) {
    var bitset = [];
    bitset.length = cnt;

    for (var i = 0; i < bitset.length; i++) {
        bitset[i] = (item >> (bitset.length - (i + 1))) & 0x1;
    }
    var result = '';
    for (var i in bitset) {
        result += bitset[i];
    }
    return result;
}
