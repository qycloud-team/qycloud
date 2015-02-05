require('commons/crypto-sha256/crypto-sha256');

angular.module("commons.services").factory("Security", function () {
    var Security = {}, i = 0, j = 0, sbox = [];

    function setup(key) {
        var k, x;
        var kl = key.length;

        for (i = 0; i < 256; i++) {
            sbox[i] = i >= 128 ? (i % 128 - 128) : i;
        }

        for (i = 0, j = 0, k = 0; i < 256; i++) {
            j = j + sbox[i] + key.charCodeAt(k) & 0xff;
            k = (k + 1) % kl;

            x = sbox[i];
            sbox[i] = sbox[j];
            sbox[j] = x;
        }

        // Set things up to start coding/decoding

        i = 0;
        j = 0;
    }

    function codeDecode(key, plaintext) {
        setup(key);

        var x, r = "";
        var pl = plaintext.length;
        for (var k = 0; k < pl; k++) {
            i = i + 1 & 0xff;
            j = j + sbox[i] & 0xff;

            x = sbox[i];
            sbox[i] = sbox[j];
            sbox[j] = x;

            r += String.fromCharCode(plaintext.charCodeAt(k)
            ^ sbox[sbox[i] + sbox[j] & 0xff] & 0xff);
        }
        return r;

    }

    function randomCharString() {
        var radStr = "1234567890abcdefghijklmnopqrstuvwxyz";
        var length = 32;
        var randBuffer = [];
        for (var i = 0; i < length; i++) {
            randBuffer[i] = radStr.charAt(~~(Math.floor(Math.random() * 36)));
        }
        return randBuffer.join("");
    }

    function byteStringToHexString(s) {
        var r = "", i, tmp;
        for (i = 0; i < s.length; i++) {
            tmp = (s.charCodeAt(i)).toString(16);
            r += (tmp.length === 1 ? "0" + tmp : tmp);
        }
        return r;
    }

    /**
     * 返回nonce对象
     * @param name
     * @param newpwd
     * @returns {{nonce: *, haskKey: *, password: *}}
     */
    function getNonceDTO(name, newpwd) {
        var nonce = randomCharString();
        var password = newpwd;//Crypto.SHA256($.trim(newpwd));
        var hashKey = Crypto.SHA256(name + password + nonce);
        password = byteStringToHexString(codeDecode(nonce, password));
        return {
            nonce: nonce,
            hashKey: hashKey,
            password: password
        }
    }

    function hexStringToByteString(str) {
        var byteString = "";
        var i;
        var len;

        for (i = 0, len = str.length; i < len; i += 2) {
            byteString += String.fromCharCode(parseInt(str.substring(i, i + 2), 16));
        }
        return byteString;
    }

// export method
    Security.codeDecode = codeDecode;
    Security.randomCharString = randomCharString;
    Security.byteStringToHexString = byteStringToHexString;
    Security.hexStringToByteString = hexStringToByteString;
    Security.getNonceDTO = getNonceDTO;

    return Security;
});