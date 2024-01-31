import { Router } from "express"
import Actions from "../middlewares/actions"

const routes = Router()

routes.get("/", Actions.index)

routes.get("/database", Actions.database)

routes.post("/shorter", Actions.shorter)

routes.get("/:hash", Actions.redirect)

// routes.get("*", (req: Request, res: Response) => {
//   return res.status(404).json({ error: "Page not found" })
// })

export default routes