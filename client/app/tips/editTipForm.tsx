



export default function EditTipForm(){
    return (
        <div className="w-[700px] mx-auto bg-slate-500">

            <div className="mx-auto flex flex-col bg-red-200 p-8 m-8">
                <form className="flex justify-evenly gap-6">
                    <input type="text" />
                    <button type="submit" className="bg-white hover:bg-slate-100">Edit Tip</button>
                </form>
            </div>

        </div>
    )
}