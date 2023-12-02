import express, {Express, Request, Response} from "express"

const app: Express = express()
const port = 8080
const apiWebRoot = "/api/1.0"

app.get("/", (req: Request, res: Response) => {
	res.sendFile("index.html", {root: __dirname})
})

app.get("/client.js", (req: Request, res: Response) => {
	res.sendFile("client.js", {root: __dirname})
})

app.post(apiWebRoot + "/on", (req: Request, res: Response) => {
	console.log("turned on!")
	res.status(200).send("turned on!")
})

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})