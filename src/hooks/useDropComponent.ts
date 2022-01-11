import { useDrop, DropTargetMonitor } from 'react-dnd'
import { rootComponents } from '~utils/editor'
import useDispatch from './useDispatch'
import { useSelector } from 'react-redux'
import builder from '~core/models/composer/builder'
import { getCustomTheme } from '~core/selectors/app'
//import useUploadedTheme from '~hooks/useUploadedTheme'

export const useDropComponent = (
  componentId: string,
  accept: (ComponentType | MetaComponentType)[] = rootComponents,
  canDrop: boolean = true,
) => {
  const dispatch = useDispatch()
  const customTheme = useSelector(getCustomTheme)

  console.log('my custom theme====', customTheme)

  const [{ isOver }, drop] = useDrop({
    accept,
    collect: monitor => ({
      isOver: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: ComponentItemProps, monitor: DropTargetMonitor) => {
      if (!monitor.isOver()) {
        return
      }

      if (item.isMoved) {
        dispatch.components.moveComponent({
          parentId: componentId,
          componentId: item.id,
        })
      } else if (item.isMeta) {
        dispatch.components.addMetaComponent(builder[item.type](componentId))
      } else {
        //const customTheme = useUploadedTheme();
        console.log('this component part has been executed1')
        dispatch.components.addComponent({
          parentName: componentId,
          type: item.type,
          rootParentType: item.rootParentType,
          uploadedTheme: customTheme,
        })
      }
    },
    canDrop: () => canDrop,
  })

  return { drop, isOver }
}
