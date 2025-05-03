import React from 'react'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Session } from 'next-auth'
import Header from './nav-header'

const LandinPageHero = ({ session }: { session: Session | null }) => {
    return (
        <div className="">
            <Header session={session} />

            <div className="relative isolate grainy">
                <svg
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 size-full [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-gray-200"
                >
                    <defs>
                        <pattern
                            x="50%"
                            y={-1}
                            id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                            width={200}
                            height={200}
                            patternUnits="userSpaceOnUse"
                        >
                            <path d="M100 200V.5M.5 .5H200" fill="none" />
                        </pattern>
                    </defs>
                    <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                        <path
                            d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
                            strokeWidth={0}
                        />
                    </svg>
                    <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
                </svg>
                <div className="mx-auto max-w-7xl px-6 py-24 sm:py-10 lg:flex lg:items-center lg:gap-x-10 lg:px-8 ">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                        <div className="flex">
                            <Badge color='sky' className='px-4'>
                                <span className="font-semibold text-slate-600">Limited Launch Special</span>
                                <span aria-hidden="true" className="h-4 w-px bg-gray-900/10" />
                                <Link href="#" className="flex items-center gap-x-1">
                                    <span aria-hidden="true" className="absolute inset-0" />
                                    50% off first course
                                    <ChevronRightIcon aria-hidden="true" className="-mr-2 size-5 text-gray-400" />
                                </Link>
                            </Badge>
                        </div>
                        <h1 className="text-5xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-7xl">
                            Learn Anything at the Perfect Pace, Just for You
                        </h1>
                        <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                            <div
                                style={{
                                    clipPath:
                                        'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                }}
                                className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#96b3f4] to-[#69b5ac] opacity-30"
                            />
                        </div>
                        <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                            KURO AI analyzes your learning style, knowledge gaps, and goals to create personalized learning paths that adapt in real-time.
                        </p>
                        <div className="mt-10 flex items-center gap-x-6">
                            <Button
                                color='sky'
                                href="/home"
                            >
                                Build Your Learning Path
                            </Button>
                            <Button href="/working">
                                See how it works <span aria-hidden="true">→</span>
                            </Button>
                        </div>
                    </div>
                    <div className="mt-16 sm:mt-24 lg:mt-0 lg:shrink-0 lg:grow">
                        <svg role="img" viewBox="0 0 366 729" className="mx-auto w-[22.875rem] max-w-full drop-shadow-xl">
                            <title>App screenshot</title>
                            <defs>
                                <clipPath id="2ade4387-9c63-4fc4-b754-10e687a0d332">
                                    <rect rx={36} width={316} height={684} />
                                </clipPath>
                            </defs>
                            <path
                                d="M363.315 64.213C363.315 22.99 341.312 1 300.092 1H66.751C25.53 1 3.528 22.99 3.528 64.213v44.68l-.857.143A2 2 0 0 0 1 111.009v24.611a2 2 0 0 0 1.671 1.973l.95.158a2.26 2.26 0 0 1-.093.236v26.173c.212.1.398.296.541.643l-1.398.233A2 2 0 0 0 1 167.009v47.611a2 2 0 0 0 1.671 1.973l1.368.228c-.139.319-.314.533-.511.653v16.637c.221.104.414.313.56.689l-1.417.236A2 2 0 0 0 1 237.009v47.611a2 2 0 0 0 1.671 1.973l1.347.225c-.135.294-.302.493-.49.607v377.681c0 41.213 22 63.208 63.223 63.208h95.074c.947-.504 2.717-.843 4.745-.843l.141.001h.194l.086-.001 33.704.005c1.849.043 3.442.37 4.323.838h95.074c41.222 0 63.223-21.999 63.223-63.212v-394.63c-.259-.275-.48-.796-.63-1.47l-.011-.133 1.655-.276A2 2 0 0 0 366 266.62v-77.611a2 2 0 0 0-1.671-1.973l-1.712-.285c.148-.839.396-1.491.698-1.811V64.213Z"
                                fill="#4B5563"
                            />
                            <path
                                d="M16 59c0-23.748 19.252-43 43-43h246c23.748 0 43 19.252 43 43v615c0 23.196-18.804 42-42 42H58c-23.196 0-42-18.804-42-42V59Z"
                                fill="#343E4E"
                            />
                            <foreignObject
                                width={316}
                                height={1500}
                                clipPath="url(#2ade4387-9c63-4fc4-b754-10e687a0d332)"
                                transform="translate(24 24)"
                            >
                                <Image height={800} width={1000} alt="" src="/app-mobile-demo.png" />
                            </foreignObject>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandinPageHero