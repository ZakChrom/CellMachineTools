import { Injector, Logger, commands } from "replugged"

const inject = new Injector()
const logger = Logger.plugin("CellMachineTools")

export async function start() {
    logger.log('Started')
	commands.registerCommand({
		name: 'test',
		description: 'testing',
		usage: '{c}',
		executer: logger.log
	})
}

export function stop() {
    inject.uninjectAll()
	commands.unregisterCommand('test')
}