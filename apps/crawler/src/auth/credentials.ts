import { TOTP } from "otpauth";
import { debug } from "../logger.js";

interface Credentials {
  username: string;
  password: string;
}

export async function getCredentials(): Promise<Credentials> {
  const username = process.env.MF_USERNAME;
  const password = process.env.MF_PASSWORD;

  if (!username || !password) {
    throw new Error("MF_USERNAME and MF_PASSWORD must be set in .env");
  }

  return { username, password };
}

export async function getOTP(): Promise<string> {
  const secret = process.env.MF_TOTP_SECRET;

  if (!secret) {
    throw new Error("MF_TOTP_SECRET must be set in .env");
  }

  debug("Generating OTP from TOTP secret...");
  const totp = new TOTP({ secret });
  const otp = totp.generate();

  if (!otp) {
    throw new Error("Failed to generate OTP");
  }

  return otp;
}

/**
 * テスト用: no-op (1Password互換インターフェース維持)
 */
export function _resetOpClient(): void {
  // no-op
}
