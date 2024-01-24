import TopList from "@/components/topList"
import Loading from "@/components/UI/loading"
import { Suspense } from "react"

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Loading />
        <TopList />
      </Suspense>
    </>
  )
}
