"use client"

import Arrow from "@/components/interface/arrow"
import MenuItem from "@/components/interface/menuItem"
import Brand from "@/components/layout/brand"
import { useSession } from "@/contexts/sessionContext"
import Image from "next/image"
import Link from "next/link"

export default function Header({
  changeVisible,
}: {
  changeVisible: () => void
}) {
  const { session } = useSession()

  const pfp =
    session && session.user && session.user.image != undefined
      ? session.user.image
      : "/assets/pfps/luffyGear5.png"

  const handleFocus = () => {
    changeVisible()
  }

  return (
    <header className="fixed top-0 w-full bg-gradient-to-r from-heaven-blue via-heaven-blue to-heaven-green pb-4 z-30">
      <div className="flex flex-wrap ml-2 sm:ml-20">
        <Link href="/">
          <Brand />
        </Link>
        <div className="flex flex-wrap mt-5 text-heaven-white text-lg">
          <MenuItem route="/top" text="Top" />
          <MenuItem route="/schedules" text="Schedules" />
          <MenuItem route="/about" text="About" />
        </div>

        <div className="hidden sm:flex mt-3 ml-auto mr-20">
          <Image
            src="/assets/svg/search.svg"
            width={500}
            height={500}
            alt="search"
            className="w-6 mr-4"
          />
          <Image
            src={pfp}
            width={500}
            height={500}
            alt="connected user"
            className="w-10 rounded-full"
            priority={true}
          />
          <button onClick={handleFocus}>
            <Arrow />
          </button>
        </div>
      </div>
    </header>
  )
}
