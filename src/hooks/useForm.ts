import { ChangeEvent, useCallback, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import useDispatch from './useDispatch'
import { getSelectedComponentId } from '~core/selectors/components'
import axios from 'axios'

const BASE_URL = 'http://localhost:5000/'

export const useForm = () => {
  const dispatch = useDispatch()
  const componentId = useSelector(getSelectedComponentId)
  const [fileSelected, setFileSelected] = useState<File>()

  useEffect(() => {
    // Update the document title using the browser API

    if (fileSelected) {
      console.log('I have called= inside effect====', fileSelected)
      const formData = new FormData()
      formData.append('image', fileSelected, fileSelected.name)
      axios.post(BASE_URL + 'upload', formData).then(response => {
        //console.log("test upload=====",response);
        //this.setState({imageUrl: [response.data.imageUrls, ...this.state.imageUrls]});
        if (response && response.data && response.data.imageUrl) {
          //setValue('src', `${location.protocol}//${location.host}/` + response.data.imageUrl)
        }
      })
      //const formData = new FormData();
      //formData.append("image", fileSelected, fileSelected.name);
    }
  }, [fileSelected])

  const setValueFromEvent = ({
    target: { name, value },
  }: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(name, value)
  }

  const handleImageChange = function(e: React.ChangeEvent<HTMLInputElement>) {
    const fileList = e.target.files
    //console.log("input file list0======",fileList[0]);

    if (!fileList) return
    setFileSelected(fileList[0])
  }

  const setValue = useCallback(
    (name: string, value: any) => {
      dispatch.components.updateProps({
        id: componentId,
        name,
        value,
      })
    },
    [componentId, dispatch.components],
  )

  return { setValue, setValueFromEvent, handleImageChange }
}
