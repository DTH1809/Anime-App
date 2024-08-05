import React, { CSSProperties } from 'react'
import { DotLoader } from 'react-spinners'

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

const Spinner = () => {
  return (
    <DotLoader
      cssOverride={override}
      aria-label="Loading Spinner"
    />
  )
}

export default Spinner