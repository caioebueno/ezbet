import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M13 4v2.67l-1 1-1-1V4h2zm7 7v2h-2.67l-1-1 1-1H20zM6.67 11l1 1-1 1H4v-2h2.67zM12 16.33l1 1V20h-2v-2.67l1-1zM15 2H9v5.5l3 3 3-3V2zm7 7h-5.5l-3 3 3 3H22V9zM7.5 9H2v6h5.5l3-3-3-3zm4.5 4.5l-3 3V22h6v-5.5l-3-3z"
        fill="#131C3E"
      />
    </Svg>
  )
}

export default SvgComponent
