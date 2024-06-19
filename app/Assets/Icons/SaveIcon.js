import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SaveIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      className="ionicon"
      viewBox="0 0 512 512"
      {...props}
    >
      <Path
        d="M352 48H160a48 48 0 00-48 48v368l144-128 144 128V96a48 48 0 00-48-48z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={32}
      />
    </Svg>
  )
}

export default SaveIcon
