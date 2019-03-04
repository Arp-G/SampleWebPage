var Encrypt_Driver;
var Decrypt_Driver;
var makeKey;
var createSubstitutionMatrix;
var encrypt;
var decrypt;

Encrypt_Driver = function(plainText, key = "nH=#,VG=([gG$9Hh8)M2ZQErN") {

  let matrix = createSubstitutionMatrix();

  let newKey = makeKey(plainText.length, key);

  let cipher = encrypt(plainText, newKey, matrix);

  return cipher;
}

Decrypt_Driver = function(cipherText, key = "nH=#,VG=([gG$9Hh8)M2ZQErN") {

  let matrix = [];

  for (let i = 0; i < 94; i++) //declare the 2nd dimension of the matrix
    matrix[i] = [];

  matrix = createSubstitutionMatrix();

  let newKey = makeKey(cipherText.length, key);

  let plainText = decrypt(cipherText, newKey, matrix);

  return plainText;

}

makeKey = function(len, key) {

  let newKey = "";

  let j = 0;

  for (let i = 0; i < len; i++) {

    if (j >= key.length)
      j = 0;

    newKey += key.charAt(j);
    j++;
  }

  return newKey;

}


createSubstitutionMatrix = function() {

  let ascii = 32;

  let matrix = [];

  for (let i = 0; i < 94; i++) //declare the 2nd dimension of the matrix
    matrix[i] = [];

  for (let i = 0; i < 94; i++) {

    ascii = 32 + i;

    for (let j = 0; j < 94; j++) {

      matrix[j][i] = String.fromCharCode(ascii);

      ascii++;

      if (ascii > 126)
        ascii = 32;

    }
  }

  return matrix;

}



encrypt = function(src, newKey, matrix) {

  let cipherText = "";

  for (let i = 0; i < src.length; i++)
    cipherText += matrix[(newKey.charAt(i)).charCodeAt(0) - 32][(src.charAt(i)).charCodeAt(0) - 32];


  return cipherText;
}



decrypt = function(cipherText, newKey, matrix) {

  let plainText = "";



  for (let i = 0; i < newKey.length; i++) {

    row = (newKey.charAt(i)).charCodeAt(0) - 32;
    let ch = cipherText.charAt(i);

    for (let j = 0; j < 94; j++) {
      if (matrix[row][j] == ch)
        plainText += matrix[0][j];
    }

  }

  return plainText;

}