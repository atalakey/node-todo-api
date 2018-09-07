/*
  JSON Web Token (JWT) defines a compact and self-contained way for
  securely transmitting information between parties as a JSON object.
  This information can be verified and trusted because it is digitally
  signed.

  JSON Web Tokens consist of three parts separated by dots (.), which are:

    Header:
      consists of two parts
        1. the type of the token, which is JWT.
        2. the hashing algorithm being used, such as HMAC SHA256 or RSA.

      Ex. { "alg": "HS256", "typ": "JWT" }

    Payload (user info):
      contains the claims. Claims are statements about an entity and
      additional data. There are three types of claims:

        1. Registered claims:
          These are a set of predefined claims which are not mandatory
          but recommended, to provide a set of useful, interoperable
          claims. Some of them are: iss (issuer), exp (expiration time),
          sub (subject), aud (audience), and others.

        2. Public claims:
          These can be defined at will by those using JWTs. But to avoid
          collisions they should be defined in the IANA JSON Web Token
          Registry or be defined as a URI that contains a collision resistant
          namespace.

        3. Private claims:
          These are the custom claims created to share information between
          parties that agree on using them and are neither registered or
          public claims.
      
      Ex. { "id": 4, "iat": 1536292489 }

    Signature:
      To create the signature part you have to take the encoded header, the
      encoded payload, a secret, the algorithm specified in the header, and
      sign that. The signature is used to verify the message wasn't changed
      along the way, and, in the case of tokens signed with a private key,
      it can also verify that the sender of the JWT is who it says it is.

      Ex. HMACSHA256(
            base64UrlEncode(header) + "." + base64UrlEncode(payload),
            256-bit-secret
          )
*/
const jwt = require('jsonwebtoken');

const data = { id: 4 };

const token = jwt.sign(data, '123abc');
console.log('encoded:', token);

const decoded = jwt.verify(token, '123abc');
console.log('decoded:', decoded);
