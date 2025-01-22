import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"


export default async function() {
    let session=await getServerSession(authOptions)
    return <div>
        Dashboard{JSON.stringify(session.user.id)}
    </div>
}