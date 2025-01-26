import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"


export default async function() {
    let session :any=await getServerSession(authOptions)
    return <div className="flex">
        Dashboard of UserName: <p className="font-bold">{JSON.stringify(session.user.name)}</p>
    </div>
}