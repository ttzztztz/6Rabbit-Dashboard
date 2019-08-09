import crypto from "crypto";

const passwordMD5 = (password: string) =>
    crypto
        .createHash("md5")
        .update(password)
        .digest("hex");

export default passwordMD5;
