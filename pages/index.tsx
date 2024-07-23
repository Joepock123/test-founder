import { fetcher } from "@/lib/utils";
import { Inter } from "next/font/google";
import useSWR from "swr";
import { RefundDecorated } from "./api/types/types";
import { TableRefunds } from "@/components/TableRefunds";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, error } = useSWR<RefundDecorated[]>("/api/refunds", fetcher);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {error && <p>{error?.message}</p>}

      {data?.length ? <TableRefunds refunds={data} /> : "No data"}
    </main>
  );
}
