import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M14.705 17.295a.997.997 0 00.001-1.41l-3.171-3.178a1 1 0 010-1.413l3.171-3.178a.997.997 0 00-1.411-1.41l-4.588 4.587a1 1 0 000 1.414l4.588 4.588a.998.998 0 001.41 0z"
        fill="#8013EF"
      />
    </Svg>
  )
}

export default SvgComponent
