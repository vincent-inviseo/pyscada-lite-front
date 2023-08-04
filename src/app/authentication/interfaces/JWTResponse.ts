import Tokens from "../models/Token";

export interface JWTResponse {
    id: string;
    tokens: Tokens;
    username: string;
    email: string
  }
  