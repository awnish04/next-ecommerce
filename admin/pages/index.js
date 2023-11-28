import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <Layout>
      <div className="text-blue-950 gap-2 flex items-center justify-end">
        <h2>
          Hello, <b>{session?.user?.name}</b>{" "}
        </h2>

        <img
          src={session?.user?.image}
          alt=""
          className="w-8 h-8 rounded-full overflow-hidden"
        />
      </div>
    </Layout>
  );
}
