'use client'
import Image from 'next/image'
import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

function mulberry32(seed:number){
  return function(){
    let t=(seed+=0x6d2b79f5)
    t=Math.imul(t^(t>>>15),t|1)
    t^=t+Math.imul(t^(t>>>7),t|61)
    return((t^(t>>>14))>>>0)/4294967296
  }
}

export default function HomePage() {
  const prefersReduced = useReducedMotion()
  const rng = useMemo(()=>mulberry32(42),[])

  const hearts = useMemo(()=> {
    const count = 26
    const arr = Array.from({length: count}).map((_,i)=>{
      const left = rng()*100
      const top = rng()*100
      const size = 16 + Math.floor(rng()*18)
      const opacity = 0.25 + rng()*0.55
      const drift = 28 + rng()*40
      const xdrift = 10 + rng()*30
      const duration = 6 + rng()*6
      const delay = rng()*3
      return { id:i, left:`${left}%`, top:`${top}%`, size, opacity, drift, xdrift, duration, delay }
    })
    return arr
  },[rng])

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <Image
          src="/invite-background.jpg"
          alt=""
          priority
          quality={80}
          fill
          sizes="100vw"
          className="object-cover"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      </div>

      {!prefersReduced && hearts.map(h=>(
        <motion.span
          key={h.id}
          className="absolute select-none will-change-transform"
          style={{
            left: h.left,
            top: h.top,
            fontSize: `${h.size}px`,
            color: 'rgba(244,114,182,.92)',
            textShadow: '0 2px 8px rgba(244,114,182,.45)'
          }}
          animate={{
            y: [0, -h.drift, 0],
            x: [0, h.xdrift, 0, -h.xdrift*0.7, 0],
            opacity: [h.opacity*0.6, h.opacity, h.opacity*0.6],
            scale: [0.95, 1.12, 0.95],
            rotate: [0, 6, 0, -6, 0]
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'easeInOut'
          }}
        >🔥</motion.span>
      ))}

      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .5 }}
        className="relative mx-4 w-full max-w-md rounded-3xl
          bg-[#f3ead7]/70
          border border-amber-200/40
          p-7 text-center
          shadow-2xl
          backdrop-blur-2xl
          pt-[calc(1.2rem+env(safe-area-inset-top))]
          pb-[calc(1.2rem+env(safe-area-inset-bottom))]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 rounded-3xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,.35), rgba(243,234,215,.7))'
          }}
        />

        <h1 className="text-xl font-bold text-amber-700">
          GoodFellas Грүппийн
        </h1>
        <p className="text-sm text-neutral-700">
          Шинэ жилийн арга хэмжээ 🎄
        </p>

        <div className="mt-6 space-y-3 text-left">
          {[
            ['17:30 – 18:00', 'Цуглах'],
            ['18:00 – 18:30', 'Нээлт болон хүндэтгэлийн зоог'],
            ['18:30 – 19:00', 'Багийн хуваарилалт'],
            ['19:00 – 21:30', 'Эхний 3 тоглолт'],
            ['21:30 – 22:00', 'Азтан шалгаруулах (2 азтан)'],
            ['22:00 – 01:00', 'Сүүлийн тоглолтууд'],
            ['01:00', 'Шагнал гардуулах'],
          ].map(([time, title], i) => (
            <details
              key={i}
              className="rounded-xl bg-white/60 border border-amber-200/30 p-3"
            >
              <summary className="flex items-center justify-between font-medium text-gray-800 dark:text-gray-200">
                <span>⏰ {time} — {title}</span>
              </summary>
            </details>
          ))}
        </div>

        <div className="mt-8 border-t border-white/30 pt-4 text-center dark:border-white/10">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            📍 Хаана: Brigade E-Sports
          </p>
          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            ⏰ Хэзээ: 2025.12.27 · 18:00
          </p>
        </div>

        <div className="mt-4 p-4 rounded-lg bg-white/50 text-gray-800 dark:bg-black/30 dark:text-gray-200">
          <p>💰 ТАКС: 90,000₮</p>
          <p>🏦 Банк: Голомт банк</p>
          <p>🆔 Данс: IBAN 44001500 2705109882</p>
          <p>👤 Нэр: Мягмарнаран</p>
        </div>
      </motion.section>
    </main>
  )
}
