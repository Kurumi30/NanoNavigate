import { Request, Response } from "express"
import { join } from "path"
import Controller from "../controllers"
import { Host } from "../interfaces/general"

const controller = new Controller()

export default class Actions {
  public static index(req: Request, res: Response) {
    return res.status(200).sendFile(join(__dirname, "..", "..", "public", "index.html"))
  }

  public static async shorter(req: Request, res: Response) {
    const bodyUrl: Host = req.body.url

    if (!bodyUrl || !bodyUrl.startsWith("http://") && !bodyUrl.startsWith("https://")) {
      return handleErrors(res, 400, !bodyUrl ? "Missing url" : "Invalid url")
    }

    try {
      const subDomain = "nanonavigate.is-a.dev" // req.get("host"))
      const url = await controller.urlShortener(bodyUrl, subDomain)

      res.status(200).json({ url })
    } catch (err) {
      console.error(err)

      return handleErrors(res, 500, "Internal server error")
    }
  }

  public static async redirect(req: Request, res: Response) {
    try {
      await controller.redirectUrl(req.params.hash, res)
    } catch (err) {
      console.error(err)

      return handleErrors(res, 500, "Internal server error")
    }
  }
}

export function handleErrors(res: Response, status: number, err?: string | undefined) {
  return res.status(status).json({ error: err })
}
