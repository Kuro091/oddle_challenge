
import { ClipLoader } from 'react-spinners'

export default function Spinner() {
  return (
    <>
      <div style={{
        width: '100%', height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        pointerEvents: 'all',
        zIndex: '99999',
        border: 'none',
        margin: '0',
        padding: '0',
        top: '0',
        left: '0',
        cursor: 'wait',
        position: 'fixed',
      }}>
        Please wait a moment...
        <ClipLoader loading={true} color={'darkgrey'} cssOverride={{

          position: 'absolute',
          top: '42%',
          left: '46%',

        }} size={150} />
      </div>
    </>

  )
}
