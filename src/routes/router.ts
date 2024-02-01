import { Router } from "express"
import Actions from "../middlewares/actions"

const routes = Router()

routes.get("/", Actions.index)

routes.post("/shorter", Actions.shorter)

routes.get("/:hash", Actions.redirect)

routes.get("/api/database", Actions.queryDb)

// routes.get("*", (req: Request, res: Response) => {
//   return res.status(404).json({ error: "Page not found" })
// })

export default routes