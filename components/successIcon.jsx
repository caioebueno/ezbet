import * as React from "react"
import Svg, { Circle, Rect } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={174} height={174} viewBox="0 0 174 174" fill="none" {...props}>
      <Circle
        cx={87}
        cy={87}
        r={84.5}
        fill="#CCFFB4"
        stroke="#239828"
        strokeWidth={5}
      />
      <Rect
        x={29}
        y={89.428}
        width={18}
        height={70}
        rx={9}
        transform="rotate(-39.413 29 89.428)"
        fill="#239828"
      />
      <Rect
        x={134.411}
        y={34.732}
        width={18}
        height={122}
        rx={9}
        transform="rotate(36.405 134.411 34.732)"
        fill="#239828"
      />
    </Svg>
  )
}

export default SvgComponent
