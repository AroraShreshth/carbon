import React from 'react'
import ListSetting from './ListSetting'
import { FONTS } from '../lib/constants'
import { fileToDataURL as blobToUrl } from '../lib/util'

const EXTENSIONS = ['.otf', '.ttf', '.woff']

const Font = ({ id, name }) => (
  <span style={id === 'upload' ? { textAlign: 'center', width: '100%' } : { fontFamily: id }}>
    {name}
  </span>
)

function FontSelect(props) {
  const inputEl = React.useRef(null)
  const [fonts, updateFonts] = React.useState(FONTS)

  function onChange(id) {
    if (id === 'upload') {
      inputEl.current.click()
    } else {
      props.onChange('fontFamily', id)
      const font = fonts.find(f => f.id === id)
      props.onChange('fontUrl', font.url || null)
    }
  }

  async function onFiles(e) {
    const { files } = e.target

    const name = files[0].name.split('.')[0]
    const url = await blobToUrl(files[0])

    updateFonts(fonts => [{ id: name, name, url }, ...fonts])
    props.onChange('fontFamily', name)
    props.onChange('fontUrl', url)
  }

  return (
    <div>
      <ListSetting
        title="Font"
        items={[{ id: 'upload', name: 'Upload +' }, ...fonts]}
        {...props}
        onChange={onChange}
      >
        {Font}
      </ListSetting>
      <input
        hidden
        ref={inputEl}
        type="file"
        multiple
        accept={EXTENSIONS.join(',')}
        onChange={onFiles}
      />
    </div>
  )
}

export default FontSelect
