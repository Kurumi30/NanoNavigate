import { Response } from "express"
export interface IController {
  urlShortener(originalUrl: string, host: Host): Promise<string>
  redirectUrl(code: string, response: Response): Promise<void | Response>
}

export interface SaveData {
  originalUrl: string
  code: string
  created_at: string
}

export type Host = string | undefined