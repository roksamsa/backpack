import { getServerSession } from "next-auth";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(req: Request) {
    const session = await getServerSession(options);

    if (!session) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    return new Response(JSON.stringify(session.user), { status: 200 });
}
