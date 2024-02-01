import { Response } from "express"
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs"
import { SaveData, Host, IController } from "../interfaces/general"
import { handleErrors } from "../middlewares/actions"
import { join } from "path"

function createDatabase() {
  const path = join(__dirname, "..", "..", "database")
  const file = join(path, "urls.json")

  if (!existsSync(path)) {
    mkdirSync(path, { recursive: true })

    console.log("Database folder created")
  }

  if (!existsSync(file)) {
    writeFileSync(file, "[]", "utf-8")

    console.log("Database file created")
  }

  return console.log("Database already exists")
}

createDatabase()

const db = "database/urls.json"
const saveToDatabase: SaveData[] = JSON.parse(readFileSync(db).toString())

function getProtocol(host: Host): Promise<string> {
  return new Promise((resolve, reject) => {
    if ((host as string).includes("localhost")) {
      return resolve("http")
    } else {
      return resolve("https")
    }
  })

}

export default class Controller implements IController {
  public async urlShortener(originalUrl: string, host: Host) {
    const code: string = crypto.randomUUID().split("-")[0]
    const created_at: string = new Date().toLocaleTimeString("pt-BR", { hour12: false })
    const saveData: SaveData = { originalUrl, code, created_at }

    saveToDatabase.push(saveData)
    writeFileSync(db, JSON.stringify(saveToDatabase, null, 2))

    return `${await getProtocol(host)}://${host}/${code}`
  }

  public async redirectUrl(code: string, response: Response) {
    const element = saveToDatabase.find(item => item.code == code)

    if (element) {
      return response.redirect(301, element.originalUrl)
    } else {
      return handleErrors(response, 404, "Url not found")
    }
  }
}