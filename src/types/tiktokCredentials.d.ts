export interface TikTokCredentials {
  open_id: string; // The TikTok user's unique identifier.
  scope: string; // A comma-separated list (,) of the scopes the user has agreed to authorize.
  access_token: string; //The access token for future calls on behalf of the user.
  expires_in: number; // The expiration of access_token in seconds. It is valid for 24 hours after initial issuance.
  refresh_token: string; // The token to refresh access_token. It is valid for 365 days after the initial issuance.
  refresh_expires_in: number; // The expiration of refresh_token in seconds.
  token_type: string; // The value should be Bearer.
}

export interface TitTokExchangeCodeError {
  error: string;
  error_description: string;
  log_id: string;
}

export type TikTokExchangeCodeResponse =
  | TikTokCredentials
  | TitTokExchangeCodeError;
