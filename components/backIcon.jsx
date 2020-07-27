import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none" {...props}>
      <Rect opacity={0.1} width={44} height={44} rx={8} fill="#fff" />
      <Path
        d="M25 14l-8 8 8 8"
        stroke="#fff"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
