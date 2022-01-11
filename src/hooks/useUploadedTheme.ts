import { useSelector } from 'react-redux'
import { useTheme } from '@chakra-ui/react'
import { getCustomTheme } from '~core/selectors/app'
import { DEFAULT_PROPS } from '~utils/defaultProps'

const useUploadedTheme = () => {
  //console.log("inside new hook");
  // const customTheme = useSelector(getCustomTheme)
  // const defaultTheme = DEFAULT_PROPS
  // const customThemeContainer = {
  //   ...DEFAULT_PROPS,
  //   ...(customTheme as {}),
  // }
  //console.log("modified theme=====",customTheme," existing theme====",JSON.stringify(DEFAULT_PROPS));
  //return customTheme ? customTheme : theme
  //return theme
}

export default useUploadedTheme
