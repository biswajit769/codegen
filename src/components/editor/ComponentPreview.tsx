import React, { memo } from 'react'
import { useSelector } from 'react-redux'

import AlertPreview from '~components/editor/previews/AlertPreview'
import AvatarPreview, {
  AvatarBadgePreview,
  AvatarGroupPreview,
} from '~components/editor/previews/AvatarPreview'
import AccordionPreview, {
  AccordionButtonPreview,
  AccordionItemPreview,
  AccordionPanelPreview,
} from '~components/editor/previews/AccordionPreview'
import PopoverTriggerPreview, {
  PopoverContentPreview,
} from './previews/PopoverTriggerPreview'
import ModalOverlayPreview, {
  ModalContentPreview,
} from './previews/ModalTriggerPreview'
import * as Chakra from '@chakra-ui/react'
import { getComponentBy } from '~core/selectors/components'
import { InputRightElementPreview } from '~components/editor/previews/InputRightElement'
import { InputLeftElementPreview } from '~components/editor/previews/InputLeftElement'
import AspectRatioPreview from '~components/editor/previews/AspectRatioBoxPreview'
import ButtonPreview from '~components/editor/previews/ButtonPreview'
import PreviewContainer from '~components/editor/PreviewContainer'
import WithChildrenPreviewContainer from '~components/editor/WithChildrenPreviewContainer'
import IconPreview from './previews/IconPreview'
import IconButtonPreview from './previews/IconButtonPreview'
import SelectPreview from '~components/editor/previews/SelectPreview'
import NumberInputPreview from '~components/editor/previews/NumberInputPreview'
import PopoverPreview from './previews/PopoverTriggerPreview'
import ModalPreview from './previews/ModalTriggerPreview'

const ComponentPreview: React.FC<{
  componentName: string
}> = ({ componentName, ...forwardedProps }) => {
  const component = useSelector(getComponentBy(componentName))
  if (!component) {
    console.error(`ComponentPreview unavailable for component ${componentName}`)
  }

  const type = (component && component.type) || null

  switch (type) {
    // Simple components
    case 'Badge':
    case 'Image':
    case 'Text':
    case 'Link':
    case 'Spinner':
    case 'Checkbox':
    case 'Textarea':
    case 'CircularProgress':
    case 'Heading':
    case 'Switch':
    case 'FormLabel':
    case 'FormHelperText':
    case 'FormErrorMessage':
    case 'TabPanel':
    case 'Tab':
    case 'Input':
    case 'Radio':
    case 'ListItem':
    case 'BreadcrumbLink':
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    // Wrapped functional components (forward ref issue)
    case 'AlertIcon':
    case 'Select':
    case 'PopoverBody':
    case 'PopoverFooter':
    case 'PopoverHeader':
    case 'PopoverArrow':
    case 'PopoverCloseButton':
    return (
      <PreviewContainer
        component={component}
        type={Chakra[type]}
        {...forwardedProps}
      />
    )
    case 'ModalHeader':
    case 'ModalFooter':
    case 'ModalBody':
    case 'ModalCloseButton':
    return (
      <PreviewContainer
        component={component}
        type={Chakra[type]}
        {...forwardedProps}
      />
    )
    case 'Progress':
    case 'CloseButton':
    case 'AccordionIcon':
    case 'Code':
    case 'ListIcon':
    case 'Divider':
    case 'AlertDescription':
    case 'AlertTitle':
    case 'InputRightAddon':
    case 'InputLeftAddon':
    case 'Tag':
      return (
        <PreviewContainer
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // Components with childrens
    case 'Box':
    case 'SimpleGrid':
    case 'Flex':
    case 'FormControl':
    case 'Tabs':
    case 'List':
    case 'TabList':
    case 'TabPanels':
    case 'Grid':
    case 'Center':
    case 'Container':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
        />
      )
    case 'RadioGroup':
    case 'Stack':
    case 'Breadcrumb':
    case 'InputGroup':
    case 'BreadcrumbItem':
      return (
        <WithChildrenPreviewContainer
          enableVisualHelper
          component={component}
          type={Chakra[type]}
          {...forwardedProps}
          isBoxWrapped
        />
      )
    // More complex components
    case 'InputRightElement':
      return <InputRightElementPreview component={component} />
    case 'InputLeftElement':
      return <InputLeftElementPreview component={component} />
    case 'Avatar':
      return <AvatarPreview component={component} />
    case 'AvatarBadge':
      return <AvatarBadgePreview component={component} />
    case 'AvatarGroup':
      return <AvatarGroupPreview component={component} />
    case 'Alert':
      return <AlertPreview component={component} />
    case 'Accordion':
      return <AccordionPreview component={component} />
    case 'AccordionButton':
      return <AccordionButtonPreview component={component} />
    case 'AccordionItem':
      return <AccordionItemPreview component={component} />
    case 'AccordionPanel':
      return <AccordionPanelPreview component={component} />
    case 'AspectRatio':
      return <AspectRatioPreview component={component} />
    case 'Button':
      return <ButtonPreview component={component} />
    case 'Icon':
      return <IconPreview component={component} />
    case 'IconButton':
      return <IconButtonPreview component={component} />
    case 'Select':
      return <SelectPreview component={component} />
    case 'NumberInput':
      return <NumberInputPreview component={component} />
    case 'PopoverTrigger':
      return <PopoverTriggerPreview component={component} />
    case 'Popover':
      return <PopoverPreview component={component} />
    case 'PopoverContent':
      return <PopoverContentPreview component={component} />
    case 'Modal':
      return <ModalPreview component={component} />
    case 'ModalContent':
      return <ModalContentPreview component={component} />
    case 'ModalOverlay':
      return <ModalOverlayPreview component={component} />
    default:
      return null
  }
}

export default memo(ComponentPreview)
