


const API_URL = process.env.NEXT_PUBLIC_REACT_APP_API

const getToken = async (authorizationCode: string) => {
    const res = await fetch(`${API_URL}/oauth/token-exchange`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(authorizationCode)
    })
    return res.json()
}



export default async function Callback({searchParams}: any){
    const userData = await getToken(searchParams.code)
    
    console.log(userData)


    return (
        <div className="bg-black min-h-screen w-full">
            <h1 className="text-white">Callback Route Reached</h1>

            
            
        </div>
    )
}