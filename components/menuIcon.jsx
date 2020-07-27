import * as React from "react"
import Svg, { Rect, Circle } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={44} height={44} viewBox="0 0 44 44" fill="none" {...props}>
      <Rect opacity={0.1} width={44} height={44} rx={8} fill="#fff" />
      <Circle cx={15} cy={15} r={3} fill="#fff" />
      <Circle cx={29} cy={15} r={3} fill="#fff" />
      <Circle cx={29} cy={29} r={3} fill="#fff" />
      <Circle cx={15} cy={29} r={3} fill="#fff" />
    </Svg>
  )
}

export default SvgComponent
