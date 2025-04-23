export default function Profile ({email } : {
    email  : string 
}) {
    const inittialLetter = email.split("")[0].toUpperCase()
    return (
        <div className="bg-violet-500 font-bold text-white size-10 cursor-pointer rounded-full flex items-center justify-center text-4xl">
            <h1>{inittialLetter}</h1>
        </div>
    )
}