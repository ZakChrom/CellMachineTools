import { common, components } from 'replugged'
const { Modal, Text, Button } = components
const { closeModal, openModal } = common.modal

let thing;

function Thing(props) {
	return (
		<Modal.ModalRoot {...props}>
			<Modal.ModalHeader>
				<Text.H1>{window.CMTOOLS.level.name}</Text.H1>
			</Modal.ModalHeader>
			<Modal.ModalContent>
				<img style={{height: 'auto', width: '100%', objectFit: 'contain'}} src={window.CMTOOLS.level.img} />
				<Button onClick={()=>{closeModal(thing)}}>
					Close
				</Button>
			</Modal.ModalContent>
		</Modal.ModalRoot>
	)
}

export function buildPreviewModal(key) {
  thing = openModal((props) => <Thing {...props} />)
}