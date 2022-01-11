import React, { memo, useState } from 'react'
import {
  Box,
  Switch,
  Button,
  Flex,
  Link,
  Stack,
  FormLabel,
  DarkMode,
  FormControl,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  LightMode,
  PopoverFooter,
  Tooltip,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  ModalHeader,
  useTheme,
} from '@chakra-ui/react'
import {
  ExternalLinkIcon,
  SmallCloseIcon,
  CheckIcon,
  RepeatIcon,
} from '@chakra-ui/icons'
import { DiGithubBadge } from 'react-icons/di'
import { AiFillThunderbolt } from 'react-icons/ai'
import { buildParameters } from '~utils/codesandbox'
import { generateCode } from '~utils/code'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getComponents } from '~core/selectors/components'
import { getShowLayout, getShowCode, getCustomTheme } from '~core/selectors/app'
import { FaRegSave, FaBomb, FaEdit } from 'react-icons/fa'
import { GoRepo } from 'react-icons/go'
import { FiUpload } from 'react-icons/fi'
import JSONTree from 'react-json-tree'

export const jsonTheme = {
  scheme: 'google',
  author: 'seth wright (http://sethawright.com)',
  base00: '#000',
  base01: '#282a2e',
  base02: '#373b41',
  base03: '#969896',
  base04: '#b4b7b4',
  base05: '#c5c8c6',
  base06: '#e0e0e0',
  base07: '#ffffff',
  base08: '#CC342B',
  base09: '#F96A38',
  base0A: '#FBA922',
  base0B: '#198844',
  base0C: '#3971ED',
  base0D: '#3971ED',
  base0E: '#A36AC7',
  base0F: '#3971ED',
}

const CodeSandboxButton = () => {
  const components = useSelector(getComponents)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <Tooltip
      zIndex={100}
      hasArrow
      bg="yellow.100"
      aria-label="Builder mode help"
      label="Export in CodeSandbox"
    >
      <Button
        onClick={async () => {
          setIsLoading(true)
          const code = await generateCode(components)
          setIsLoading(false)
          const parameters = buildParameters(code)

          window.open(
            `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
            '_blank',
          )
        }}
        isLoading={isLoading}
        rightIcon={<ExternalLinkIcon path="" />}
        variant="ghost"
        size="xs"
      >
        Export code
      </Button>
    </Tooltip>
  )
}

const ClearCustomThemeButton = () => {
  const components = useSelector(getComponents)
  const [isLoading, setIsLoading] = useState(false)
  console.log('local storage type====', typeof localStorage)
  if (typeof window !== 'undefined' && localStorage.getItem('customTheme')) {
    return (
      <Tooltip
        zIndex={100}
        hasArrow
        bg="yellow.100"
        aria-label="Builder mode help"
        label="Clear Imported Theme"
      >
        <Button
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
          rightIcon={<RepeatIcon path="" />}
          variant="ghost"
          size="xs"
        >
          Clear Custom Theme
        </Button>
      </Tooltip>
    )
  } else {
    return null
  }
}

const Header = () => {
  const showLayout = useSelector(getShowLayout)
  useSelector(getCustomTheme)
  const showCode = useSelector(getShowCode)
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileLoaded, setFileLoaded] = useState(false)
  const [fileError, setFileError] = useState(false)
  const theme = useTheme()

  console.log('current_theme====', theme)

  const handleChange = async (selectorFiles: any) => {
    selectorFiles.preventDefault()
    const reader = new FileReader()
    reader.onload = async e => {
      if (e.target!.result) {
        const text = e.target!.result
        // @ts-ignore
        dispatch.app.getCustomTheme(JSON.parse(text))
        console.log(
          'stringify object is====',
          JSON.stringify(text).replace(/(?:\\[rn])+/g, ''),
        )
        localStorage.setItem('customTheme', JSON.stringify(text))
        setFileLoaded(true)
      } else {
        setFileError(true)
      }
    }
    reader.readAsText(selectorFiles.target.files[0])
  }

  return (
    <DarkMode>
      <Flex
        justifyContent="space-between"
        bg="#1a202c"
        as="header"
        height="3rem"
        px="1rem"
      >
        <Flex
          width="14rem"
          height="100%"
          backgroundColor="#1a202c"
          color="white"
          as="a"
          fontSize="xl"
          flexDirection="row"
          alignItems="center"
          aria-label="Chakra UI, Back to homepage"
        >
          <Box fontWeight="bold">Code</Box>Gen
        </Flex>

        <Flex flexGrow={1} justifyContent="space-between" alignItems="center">
          <Stack isInline spacing={4} justify="center" align="center">
            <Box>
              <Menu>
                <MenuButton>
                  <Button size="xs" variant="ghost" variantColor="gray">
                    Editor
                  </Button>
                </MenuButton>
                <LightMode>
                  <MenuList zIndex={100}>
                    <MenuItem>
                      <Box mr={2} as={FaRegSave} />
                      Save components
                    </MenuItem>
                    <MenuItem>
                      <Box mr={2} as={FiUpload} />
                      Import components
                    </MenuItem>
                    <MenuItem onClick={onOpen}>
                      <Box mr={2} as={FaEdit} />
                      Edit theme
                    </MenuItem>
                  </MenuList>
                </LightMode>
              </Menu>
            </Box>
            <FormControl>
              <Tooltip
                zIndex={100}
                hasArrow
                bg="yellow.100"
                aria-label="Builder mode help"
                label="Builder mode adds extra padding/borders"
              >
                <FormLabel
                  cursor="help"
                  color="gray.200"
                  fontSize="xs"
                  htmlFor="preview"
                  pb={0}
                >
                  Builder mode
                </FormLabel>
              </Tooltip>
              <Switch
                isChecked={showLayout}
                color="teal"
                size="sm"
                onChange={() => dispatch.app.toggleBuilderMode()}
                id="preview"
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.200" fontSize="xs" htmlFor="code" pb={0}>
                Code panel
              </FormLabel>
              <Switch
                isChecked={showCode}
                id="code"
                color="teal"
                onChange={() => dispatch.app.toggleCodePanel()}
                size="sm"
              />
            </FormControl>
          </Stack>

          <Stack isInline>
            <CodeSandboxButton />
            <ClearCustomThemeButton />

            <Popover>
              {({ onClose }) => (
                <>
                  <PopoverTrigger>
                    <Button ml={4} size="xs" variant="ghost">
                      Clear
                    </Button>
                  </PopoverTrigger>
                  <LightMode>
                    <PopoverContent zIndex={100}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Are you sure?</PopoverHeader>
                      <PopoverBody fontSize="sm">
                        Do you really want to remove all components on the
                        editor?
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <Button
                          size="sm"
                          variant="ghost"
                          variantColor="red"
                          onClick={() => {
                            dispatch.components.reset()
                            if (onClose) {
                              onClose()
                            }
                          }}
                        >
                          Yes, clear
                        </Button>
                      </PopoverFooter>
                    </PopoverContent>
                  </LightMode>
                </>
              )}
            </Popover>
          </Stack>
          <LightMode>
            <Modal isOpen={isOpen} onClose={onClose} size="lg">
              <ModalOverlay />
              <ModalContent rounded={10}>
                <ModalHeader fontSize="15px" textAlign="center">
                  Add your custom JSON Theme Object
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Input
                    id="themeFile"
                    type="file"
                    accept="application/json"
                    onChange={(selectorFiles: any) =>
                      handleChange(selectorFiles)
                    }
                  />

                  {fileLoaded && (
                    <div>
                      <p style={{ textAlign: 'center', marginTop: '20px' }}>
                        Your theme has been successfully loaded{' '}
                        <span
                          style={{ verticalAlign: 'middle' }}
                          role="img"
                          aria-label="light"
                        >
                          ✅
                        </span>
                      </p>
                    </div>
                  )}

                  {fileError && (
                    <p>
                      Can't read this file / theme{' '}
                      <span
                        style={{ verticalAlign: 'middle' }}
                        role="img"
                        aria-label="light"
                      >
                        ❌
                      </span>
                    </p>
                  )}
                  <Box rounded={5}>
                    <JSONTree data={theme} theme={jsonTheme} />
                  </Box>
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={onClose} size="sm">
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </LightMode>
        </Flex>

        <Stack
          justifyContent="flex-end"
          width="13rem"
          align="center"
          isInline
          spacing="2"
        ></Stack>
      </Flex>
    </DarkMode>
  )
}

export default memo(Header)
