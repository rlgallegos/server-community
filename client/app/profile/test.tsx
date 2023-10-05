import store from "@/authorization"


export default function Test(){
    console.log('test')
    console.log(store.getState())
    return <div>
        Test
    </div>
}