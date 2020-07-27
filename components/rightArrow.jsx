import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={12} height={20} viewBox="0 0 12 20" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M.94 19.06a1.5 1.5 0 002.12 0l8-8a1.5 1.5 0 000-2.12l-8-8A1.5 1.5 0 00.94 3.06L7.878 10l-6.94 6.94a1.5 1.5 0 000 2.12z"
        fill="#E6D0FC"
      />
    </Svg>
  )
}

export default SvgComponent
