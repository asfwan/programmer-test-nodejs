import bcrypt from "bcryptjs";

function makeid(length: number) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

async function saltPassword(password: string | undefined) {
  if (password === undefined) return "";
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

async function compareCredential(
  password: string | undefined,
  dbPassword: string | undefined
) {
  if (password === undefined || dbPassword === undefined) return false;
  return bcrypt.compare(password, dbPassword);
}

export { makeid, saltPassword, compareCredential };
