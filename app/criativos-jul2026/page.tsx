import Link from "next/link"
import s from "./roteiro.module.css"
import { creatives } from "./data"

export default function CriativosIndexPage() {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <div className={`${s.col} ${s.fade}`}>
          <p className={s.eyebrow}>Checkmat Brentwood · Julho 2026</p>
          <h1 className={s.h1}>
            Criativos
            <span className={s.sub}>Roteiros de gravação, prontos pra usar</span>
          </h1>
          <p className={s.lede}>
            Escolhe abaixo qual criativo você vai gravar. Cada um tem as falas, a direção e a
            montagem, tudo passo a passo.
          </p>
        </div>
      </header>

      <div className={s.col}>
        <section className={s.section}>
          <div className={s.cardGrid}>
            {creatives.map((c) => (
              <Link key={c.slug} href={`/criativos-jul2026/${c.slug}`} className={s.card}>
                <span className={s.cardTag}>Pronto pra gravar</span>
                <h2 className={s.cardTitle}>{c.title}</h2>
                <p className={s.cardSubtitle}>{c.subtitle}</p>
                <div className={s.cardMeta}>
                  <span>{c.duration}</span>
                  <span>{c.format}</span>
                </div>
                <div className={s.cardArrow}>Ver roteiro →</div>
              </Link>
            ))}
          </div>
        </section>

        <footer className={s.footer}>
          <span>Checkmat Brentwood · Fujiex Tech Performance</span>
          <span>
            {creatives.length === 1
              ? "1 criativo disponível"
              : `${creatives.length} criativos disponíveis`}
          </span>
        </footer>
      </div>
    </div>
  )
}
