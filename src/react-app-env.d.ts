/// <reference types="react-scripts" />;
declare module 'prettier/standalone'
declare module 'coloreact'
declare module 'browser-nativefs'
declare module 'react-json-tree'

type ComponentType =
  | 'Accordion'
  | 'AccordionItem'
  | 'AccordionButton'
  | 'AccordionPanel'
  | 'AccordionIcon'
  | 'Alert'
  | 'AlertIcon'
  | 'AlertTitle'
  | 'AlertDescription'
  | 'AspectRatio'
  | 'AvatarBadge'
  | 'AvatarGroup'
  | 'Avatar'
  | 'Badge'
  | 'Box'
  | 'Breadcrumb'
  | 'BreadcrumbItem'
  | 'BreadcrumbLink'
  | 'Button'
  | 'Center'
  | 'Checkbox'
  | 'CircularProgress'
  | 'CloseButton'
  | 'Code'
  | 'Container'
  | 'Divider'
  | 'Editable'
  | 'Flex'
  | 'FormControl'
  | 'FormLabel'
  | 'FormHelperText'
  | 'FormErrorMessage'
  | 'Grid'
  | 'Heading'
  | 'Icon'
  | 'IconButton'
  | 'Image'
  | 'Input'
  | 'InputGroup'
  | 'InputLeftAddon'
  | 'InputRightAddon'
  | 'InputLeftElement'
  | 'InputRightElement'
  | 'Link'
  | 'List'
  | 'ListItem'
  | 'ListIcon'
  | 'Menu'
  | 'NumberInput'
  | 'Progress'
  | 'Radio'
  | 'RadioGroup'
  | 'Select'
  | 'SimpleGrid'
  | 'Spinner'
  | 'Stack'
  | 'Switch'
  | 'Tab'
  | 'Tabs'
  | 'TabList'
  | 'TabPanel'
  | 'TabPanels'
  | 'Tag'
  | 'Text'
  | 'Textarea'
  | 'Popover'
  | 'PopoverTrigger'
  | 'PopoverContent'
  | 'PopoverHeader'
  | 'PopoverBody'
  | 'PopoverArrow'
  | 'PopoverCloseButton'
  | 'PopoverFooter'
  | 'Modal'
  | 'ModalOverlay'
  | 'ModalContent'
  | 'ModalHeader'
  | 'ModalFooter'
  | 'ModalBody'
  | 'ModalCloseButton'

type MetaComponentType =
  | 'FormControlMeta'
  | 'AccordionMeta'
  | 'ListMeta'
  | 'AlertMeta'
  | 'InputGroupMeta'
  | 'BreadcrumbMeta'
  | 'PopoverMeta'
  | 'ModalMeta'

interface IComponent {
  children: string[]
  type: ComponentType
  parent: string
  id: string
  props: any
  rootParentType?: ComponentType
  componentName?: string
}

interface IComponents {
  [name: string]: IComponent
}

interface IPreviewProps {
  component: IComponent
}

interface ComponentItemProps {
  id: string
  label: string
  type: ComponentType
  isMoved?: boolean
  isChild?: boolean
  isMeta?: boolean
  soon?: boolean
  rootParentType?: ComponentType
}
