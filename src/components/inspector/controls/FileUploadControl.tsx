import React, { ReactNode, memo, useRef } from 'react'
import {
  Input,
  FormControl as ChakraFormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
  Code,
  Icon,
  Grid,
  Box,
  IconButton,
} from '@chakra-ui/react'

import { PlusSquareIcon } from '@chakra-ui/icons'

type FileUploadControlPropType = {
  label: ReactNode
  children: ReactNode
  htmlFor?: string
  hasColumn?: boolean
}

const FileUploadControl: React.FC<FileUploadControlPropType> = ({
  label,
  htmlFor,
  children,
  hasColumn,
}) => (
  <ChakraFormControl
    mb={3}
    as={Grid}
    display="flex"
    alignItems="center"
    justifyItems="center"
  >
    <FormLabel
      p={0}
      mr={2}
      color="gray.500"
      lineHeight="1rem"
      width={hasColumn ? '2.5rem' : '90px'}
      fontSize="xs"
      htmlFor={htmlFor}
    >
      {label}
    </FormLabel>
    <InputGroup>
      <InputLeftElement pointerEvents="none" children={<PlusSquareIcon />} />
      <input type="file" style={{ display: 'none' }}></input>
      <Input placeholder={'Your file ...'} />
    </InputGroup>
  </ChakraFormControl>
)

export default memo(FileUploadControl)
