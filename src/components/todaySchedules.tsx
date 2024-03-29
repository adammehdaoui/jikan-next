"use client"

import { fetchSchedules } from "@/app/api/jikan/schedules"
import AnimeData from "@/models/AnimeData"
import { SchedulesActions } from "@/models/SchedulesActions"
import { clsx } from "clsx"
import { Unbounded } from "next/font/google"
import { useCallback, useEffect, useMemo, useReducer } from "react"
import { toast } from "sonner"

const unbounded = Unbounded({ subsets: ["latin"], weight: ["500"] })

type SchedulesObject = {
  data: AnimeData[]
  loading: boolean
}

const reducer = (state: SchedulesObject, action: SchedulesActions) => {
  switch (action.type) {
    case "UPDATE_DATA":
      return { ...state, data: action.payload }

    case "UPDATE_LOADING":
      return { ...state, loading: action.payload }
  }
}

const elements = 9

export default function TodaySchedules() {
  const [schedulesState, dispatch] = useReducer(reducer, {
    data: [],
    loading: true,
  })

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("EN-en", { weekday: "long" }).toLowerCase(),
    [],
  )

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchSchedules(today, 1, elements)
      dispatch({ type: "UPDATE_DATA", payload: data })
      dispatch({ type: "UPDATE_LOADING", payload: false })
    } catch (error) {
      toast.error(
        "Too many calls to Jikan API, please wait a few seconds and refresh the page.",
      )
    }
  }, [today])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <div className="bg-heaven-green text-heaven-white mt-10 rounded-2xl w-card-width h-full pb-5 max-w-4xl lg:h-card-height lg:w-full lg:ml-5 lg:mt-0 lg:pb-0">
      <div className="flex justify-center">
        <h2 className={`mt-6 text-xl ${unbounded.className}`}>TODAY</h2>
      </div>
      <div className="mt-6 w-5/6 mx-auto">
        {schedulesState.loading
          ? new Array(elements)
              .fill(0)
              .map((_, index) => (
                <div
                  key={`loading-${index}`}
                  className={clsx(
                    "rounded-full bg-heaven-white h-4 mt-6 blur-2xl animate-pulse",
                    index % 2 == 0 ? "w-1/2" : "w-2/3",
                  )}
                ></div>
              ))
          : schedulesState.data.map((item, index) => (
              <div key={`${item.title}—${index}`} className="mt-3">
                <span className={unbounded.className}>{item.title}</span>
                <span className={`ml-2 ${unbounded.className}`}>
                  {item.broadcast.string}
                </span>
              </div>
            ))}
      </div>
    </div>
  )
}
