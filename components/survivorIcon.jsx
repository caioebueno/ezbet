import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"
        fill="#131C3E"
      />
      <Path
        d="M7.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM12 13.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM16.5 9a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
        fill="#131C3E"
      />
    </Svg>
  )
}

export default SvgComponent
