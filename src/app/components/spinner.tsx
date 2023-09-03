import '@/styles/spinner.css'

interface SpinnerProps {
    show: boolean;
}

const Spinner = ({ show }: SpinnerProps) => {
  return (
    <div style={{ display: show ? 'block' : 'none'}} className="dot-spinner">
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
        <div className="dot-spinner__dot"></div>
    </div>
  )
}

export default Spinner