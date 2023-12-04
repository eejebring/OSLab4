import onoff from "onoff"

const Gpio = onoff.Gpio

export class LightControl {
	//private light: onoff.Gpio
	private state: boolean = false
	private Intervall: NodeJS.Timeout | undefined
	private pin: number

	constructor(pin: number) {
		//this.light = new Gpio(pin, "out")
		this.pin = pin
	}

	public getState() {
		return this.state
	}

	public setState(state: boolean) {
		this.stopBlink()
		this.state = state
		console.log("light: ", this.pin, " turned " + (this.state ? "on!" : "off!"))
	}

	public toggle() {
		this.state = !this.state
		console.log("light: ", this.pin, " toggled " + (this.state ? "on!" : "off!"))
		//this.light.writeSync(this.state ? 1 : 0)
	}

	public blink(intervalTime: number) {
		this.stopBlink()
		this.Intervall = setInterval(() => {
			this.toggle()
		}, intervalTime)
	}

	public stopBlink() {
		if (this.Intervall) {
			clearInterval(this.Intervall)
		}
	}
}
