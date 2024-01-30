import { Request, Response, Router } from "express"
import Controller from "../controllers"

const routes = Router()
const controller = new Controller()

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).json({ info: "I'm working!" })
})

routes.post("/shorter", async (req: Request, res: Response) => {
  if (!req.body.url) {
    return res.status(400).json({ error: "Url not found" })
  }

  if (!req.body.url.startsWith("http://") && !req.body.url.startsWith("https://")) {
    return res.status(400).json({ error: "Invalid url" })
  }

  try {
    const url = await controller.urlShortener(req.body.url, req.get("host"))

    res.status(200).json({ url })
  } catch (err) {
    console.error(err)

    return res.status(500).json({ error: "Internal error server" })
  }
})

routes.get("/:hash", async (req: Request, res: Response) => {
  await controller.redirectUrl(req.params.hash, res)
})

export default routes