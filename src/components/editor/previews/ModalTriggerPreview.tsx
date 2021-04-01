import React from 'react'
import { Modal, ModalOverlay, Box, ModalContent,useDisclosure } from '@chakra-ui/react'
import { useInteractive } from '~hooks/useInteractive'
import { useDropComponent } from '~hooks/useDropComponent'
import ComponentPreview from '~components/editor/ComponentPreview'
import { AccordionWhitelist } from '~utils/editor'

const acceptedTypes: ComponentType[] = [
  'ModalOverlay',
  'ModalContent',
  'Button',
]

const ModalPreview: React.FC<IPreviewProps> = ({ component }) => {
  const { props, ref } = useInteractive(component, true)
  console.log("Modal props22=====",props);
  const { drop, isOver } = useDropComponent(component.id, acceptedTypes)
  const { isOpen, onOpen, onClose } = useDisclosure()

  if (isOver) {
    props.bg = 'teal.50'
  }

  let boxProps: any = {}

  return (
    <Box ref={drop(ref)} {...boxProps}>
      <Modal {...props} onClose={onClose}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </Modal>
    </Box>
  )
}

export const ModalOverlayPreview: React.FC<{ component: IComponent }> = ({
  component,
}) => {
  const { props, ref } = useInteractive(component)
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)
  const children = component.children

  if (isOver) {
    props.bg = 'teal.50'
  }

  return (
    <ModalOverlay ref={drop(ref)} {...props}>
      {!children.length ? (
        <Box />
      ) : (
        <Box>
          <ComponentPreview componentName={children[0]} />
        </Box>
      )}
    </ModalOverlay>
  )
}

export const ModalContentPreview = ({ component }: IPreviewProps) => {
  const { props, ref } = useInteractive(component, true)
  const { drop, isOver } = useDropComponent(component.id, AccordionWhitelist)

  if (isOver) {
    props.bg = 'teal.50'
  }

  const boxProps: any = {}

  return (
    <Box {...boxProps} ref={drop(ref)}>
      <ModalContent {...props}>
        {component.children.map((key: string) => (
          <ComponentPreview key={key} componentName={key} />
        ))}
      </ModalContent>
    </Box>
  )
}

export default ModalPreview
