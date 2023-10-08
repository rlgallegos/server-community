'use client'


interface Props{
    messages: Array<string>
}

export default function RoleChatDisplay({messages}: Props){
    const messageList = messages.map(message => {
        return <li>{message}</li>
    })
    return (
        <div>
            <ul>
                {messageList}
            </ul>
        </div>
    )
}