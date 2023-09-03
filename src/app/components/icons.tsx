interface IconProps {
    className?: string;
    size?: number | string;
    color?: string;
}

export const DeleteIcon = ({className, size = 24, color = 'black'}: IconProps) => {
    return (
        <svg className={`${className} icon icon-tabler icon-tabler-trash`}  width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
        </svg>
    )
}

export const EditIcon = ({className, size = 24, color = 'black'}: IconProps) => {
    return (
        <svg className={`${className} icon icon-tabler icon-tabler-pencil`} width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
            <path d="M13.5 6.5l4 4"></path>
        </svg>
    )
}

export const QRCodeIcon = ({className, size = 24, color = 'black'}: IconProps) => {
    return (
        <svg className={`${className} icon icon-tabler icon-tabler-qrcode`} width={size} height={size} viewBox="0 0 24 24" strokeWidth="2" stroke={color} fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M7 17l0 .01"></path>
            <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M7 7l0 .01"></path>
            <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"></path>
            <path d="M17 7l0 .01"></path>
            <path d="M14 14l3 0"></path>
            <path d="M20 14l0 .01"></path>
            <path d="M14 14l0 3"></path>
            <path d="M14 20l3 0"></path>
            <path d="M17 17l3 0"></path>
            <path d="M20 17l0 3"></path>
        </svg>
    )
}