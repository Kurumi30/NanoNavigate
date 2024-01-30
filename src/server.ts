import express, { Application } from "express"
import cors from "cors"
import { join } from "path"
import routes from "./routes/router"

const app: Application = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(join(__dirname, "../public")))

app.set("json spaces", 2)

app.use(routes)

app.listen(port, () => console.log(`Server running on http://localhost:${port}`))
