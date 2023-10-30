



export default function EditTipForm(){
    return (
        <div className="w-[700px] mx-auto border border-accent bg-secondary">

            <form className="flex justify-evenly gap-6 py-4">
                <input className="bg-accent px-2" type="text" />
                <button type="submit" className="bg-accent hover:bg-slate-100 px-4 py-2 border border-black">Edit Tip</button>
            </form>

        </div>
    )
}