import React from 'react'
import { Flex, Box, useTheme, ThemeProvider } from '@chakra-ui/react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import { Global } from '@emotion/react'
import Metadata from '~components/Metadata'
import useShortcuts from '~hooks/useShortcuts'
import Header from '~components/Header'
import Sidebar from '~components/sidebar/Sidebar'
import EditorErrorBoundary from '~components/errorBoundaries/EditorErrorBoundary'
import Editor from '~components/editor/Editor'
import { InspectorProvider } from '~contexts/inspector-context'
import Inspector from '~components/inspector/Inspector'
import { getCustomTheme } from '~core/selectors/app'
import { useSelector } from 'react-redux'

const Themes = () => {
  useShortcuts()
  const theme = useTheme()
  const customTheme = useSelector(getCustomTheme)
  console.log('get custom theme1', customTheme)

  const customThemeContainer = {
    ...theme,
    ...(customTheme as {}),
  }
  console.log('custom theme container===', customThemeContainer)
  return (
    <>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Metadata />
      <Header />
      <DndProvider backend={Backend}>
        <Flex h="calc(100vh - 3rem)">
          <Sidebar />

          {/* <ThemeProvider theme={customThemeContainer}> */}
          <EditorErrorBoundary>
            <Box bg="white" flex={1} position="relative">
              <Editor />
            </Box>
          </EditorErrorBoundary>
          {/* </ThemeProvider>  */}

          <Box
            maxH="calc(100vh - 3rem)"
            flex="0 0 15rem"
            bg="#f7fafc"
            overflowY="auto"
            overflowX="visible"
            borderLeft="1px solid #cad5de"
          >
            <InspectorProvider>
              <Inspector />
            </InspectorProvider>
          </Box>
        </Flex>
      </DndProvider>
    </>
  )
}

export default Themes
