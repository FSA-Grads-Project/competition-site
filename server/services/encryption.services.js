require("dotenv").config();
const crypto = require("crypto");

const encryptEmail = (email) => {
  // Choose encryption algorithm: AES => Advanced Encryption Standard
  const algorithm = "aes-256-cbc";

  // Grab initialization vector and secret key from .env file
  const initVector = Buffer.from(process.env.INIT_VECTOR, "hex");
  const secretKey = Buffer.from(process.env.SECRET_KEY, "hex");

  // Create cipher using the algorithm, secret key and initialization vector
  const cipherText = crypto.createCipheriv(algorithm, secretKey, initVector);

  // Begin encrypting the email
  let encryptedEmail = cipherText.update(email, "utf-8", "hex");

  // Complete encrypting the email and terminate the cipher
  encryptedEmail += cipherText.final("hex");

  return encryptedEmail;
};

const decryptEmail = (email) => {
  // Choose encryption algorithm: AES => Advanced Encryption Standard
  const algorithm = "aes-256-cbc";

  // Grab initialization vector and secret key from .env file
  const initVector = Buffer.from(process.env.INIT_VECTOR, "hex");
  const secretKey = Buffer.from(process.env.SECRET_KEY, "hex");

  // Create decipher to decrypt the email
  const decipherText = crypto.createDecipheriv(
    algorithm,
    secretKey,
    initVector
  );

  // Begin decrypting the email
  let decryptedEmail = decipherText.update(email, "hex", "utf-8");

  // Complete decryption and terminate the decipher
  decryptedEmail += decipherText.final("utf8");

  return decryptedEmail;
};

module.exports = { encryptEmail, decryptEmail };
