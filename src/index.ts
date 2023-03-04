import { Injector, Logger, commands, common, components } from 'replugged'
import { popoverIcon } from './stuff/PopoverIcon'
import { buildPreviewModal } from './stuff/Preview'

const inject = new Injector()
const logger = Logger.plugin('CellMachineTools')

export async function start() {
    logger.log('Started')
	window.CMTOOLS = {
		replace,
		thing,
		buildPopover,
		level: {
			
		},
		logger
	}
}

function thing(message) {
	const m1 = message.content.match(/V1;\d+;\d+;(\d+\.\d+,?)*;(\d\.[0-3]\.\d+\.\d+,?)*;[^;]*;[^;]*(;[0-3]?)?/)
	const m2 = message.content.match(/V2;([0-9a-zA-Z!$%&+-.=?^{}]+;){2}[0-9a-zA-Z!$%&+\-.=?^{}()]+;[^;]*;[^;]*(;[0-3]?)?/)
	const m3 = message.content.match(/V3;([0-9a-zA-Z!$%&+-.=?^{}]+;){2}[0-9a-zA-Z!$%&+\-.=?^{}()]+;[^;]*;[^;]*(;[0-3]?)?/)
	
	const level = m1?.[0] || m2?.[0] || m3?.[0]
	
	if (level) {
		fetch('https://previewer.calion.repl.co/preview', {method: 'POST', body: JSON.stringify({level})}).then(r => r.text()).then(img => {
			if (img == '422') {
				common.toast.toast("Invalid level", common.toast.Kind.FAILURE)
			} else if (img == '413') {
				common.toast.toast("Level too big. Max 600x600", common.toast.Kind.FAILURE)
			} else {
				window.CMTOOLS.level.name = level.split(';')[5] || 'Unnamed level'
				window.CMTOOLS.level.img = img
				buildPreviewModal({})
			}
		})
	} else {
		common.toast.toast("Could not find a level in this msg", common.toast.Kind.FAILURE)
	}
}

function replace(text) {
	return text.replace(/```\n(.*)\n```/g, (t) => {
		const temp = t.slice(0,t.length-3).slice(3).split(';')
		const o = `[34m${temp[0]}[30m;[34m${temp[1]}[30m;[34m${temp[2]}[30m;${temp[3]}[30m;[35m${temp[4]}[30m;` + (temp[5] ? `[32m${temp.slice(5)}` : '')
		return '```ansi\n'+o+'\n```'
	})
}

export function stop() {
    inject.uninjectAll()
}

export function buildPopover(fn, channel, message) {
	return fn({
		label: 'Preview',
		icon: popoverIcon,
		message,
		channel,
		onClick: () => {
			void window.CMTOOLS.thing(message)
		},
	})
}