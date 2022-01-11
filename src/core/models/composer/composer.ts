import { DEFAULT_PROPS } from '~utils/defaultProps'
import { generateId } from '~utils/generateId'
import useUploadedTheme from '~hooks/useUploadedTheme'
import { useSelector } from 'react-redux'
import { getCustomTheme } from '~core/selectors/app'

type AddNode = {
  type: ComponentType
  parent?: string
  props?: any
  rootParentType?: ComponentType
}

class Composer {
  components: IComponents = {}

  rootComponentType: ComponentType | undefined = undefined

  constructor(name?: ComponentType) {
    if (name) {
      this.rootComponentType = name
    }
  }

  addNode = ({
    type,
    parent = 'root',
    props = {},
    rootParentType,
  }: AddNode): string => {
    //const customTheme = useSelector(getCustomTheme)

    //if(localStorage.getItem("customTheme")){
    /* const customThemeContainer = {
        ...DEFAULT_PROPS,
        ...(JSON.parse(JSON.parse(localStorage.getItem('customTheme') || '{}')) as {}),
      }*/
    let customThemeContainer = {}
    if (localStorage.getItem('customTheme')) {
      customThemeContainer = {
        ...DEFAULT_PROPS,
        ...(JSON.parse(
          JSON.parse(localStorage.getItem('customTheme') || '{}'),
        ) as {}),
      }
    } else {
      customThemeContainer = {
        ...DEFAULT_PROPS,
      }
    }
    console.log('This part3 has been called', customThemeContainer)
    //}
    const id = generateId()

    if (parent === 'root' && !this.rootComponentType) {
      this.rootComponentType = type
    }
    const localRootParentType = rootParentType || this.rootComponentType

    const { form, ...defaultProps } = customThemeContainer[type] || {}

    this.components = {
      ...this.components,
      [id]: {
        children: [],
        type,
        parent,
        id,
        props: { ...defaultProps, ...props },
        rootParentType: localRootParentType,
      },
    }

    if (parent !== 'root' && this.components[parent]) {
      this.components[parent].children.push(id)
    }

    return id
  }

  getComponents() {
    console.log('This part4 has been called', this.components)
    return this.components
  }
}

export default Composer
