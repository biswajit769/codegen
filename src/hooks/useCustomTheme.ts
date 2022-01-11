import { useSelector } from 'react-redux'
import { useTheme } from '@chakra-ui/react'
import { getCustomTheme } from '~core/selectors/app'

const useCustomTheme = () => {
  const customTheme = useSelector(getCustomTheme)
  const theme = useTheme()
  //console.log("modified theme=====",customTheme," existing theme====",JSON.stringify(theme));
  return customTheme ? customTheme : theme
  //return theme
}

export default useCustomTheme
