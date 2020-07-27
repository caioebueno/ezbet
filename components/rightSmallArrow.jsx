import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M9.295 17.295a.998.998 0 01-.001-1.41l3.171-3.178a1 1 0 000-1.413L9.294 8.116a.998.998 0 011.411-1.41l4.588 4.587a1 1 0 010 1.414l-4.588 4.588a.998.998 0 01-1.41 0z"
        fill="#8013EF"
      />
    </Svg>
  )
}

export default SvgComponent
