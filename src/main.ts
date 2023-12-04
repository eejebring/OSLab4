import express, {Express, Request, Response} from "express"
import {LightControl} from "./lightControl"

const app: Express = express()
const port = 8080
const apiWebRoot = "/api/1.0"
const lights = [
	new LightControl(28),
	new LightControl(29),
]

app.get("/", (req: Request, res: Response) => {
	res.sendFile("index.html", {root: __dirname})
})

app.get("/client.js", (req: Request, res: Response) => {
	res.sendFile("client.js", {root: __dirname})
})

app.post(apiWebRoot + "/on/:lightId", (req: Request, res: Response) => {
	try {
		const lightId = parseInt(req.params.lightId)
		lights[lightId].setState(true)
		res.sendStatus(200)
	} catch (e) {
		res.sendStatus(500)
	}
})
app.post(apiWebRoot + "/off/:lightId", (req: Request, res: Response) => {
	try {
		const lightId = parseInt(req.params.lightId)
		lights[lightId].setState(false)
		res.sendStatus(200)
	} catch (e) {
		res.sendStatus(500)
	}
})

app.use((req: Request, res: Response) => {
	res.sendStatus(404)
})

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`)
})