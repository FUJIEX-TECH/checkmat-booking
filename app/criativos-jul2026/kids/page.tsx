import Link from "next/link"
import type { Metadata } from "next"
import s from "../roteiro.module.css"

export const metadata: Metadata = {
  title: "Roteiro Kids & Família — Checkmat Brentwood",
}

export default function KidsPage() {
  return (
    <div className={s.wrap}>
      <header className={s.header}>
        <div className={`${s.col} ${s.fade}`}>
          <Link href="/criativos-jul2026" className={s.backLink}>
            ← Todos os criativos
          </Link>
          <p className={s.eyebrow}>Checkmat Brentwood · Roteiro de criativo</p>
          <h1 className={s.h1}>
            Kids &amp; Família
            <span className={s.sub}>Criativo 2 · Pais e filhos · pronto pra gravar</span>
          </h1>
          <p className={s.lede}>
            Três tomadas curtas, cerca de 30 segundos. Foco só nos pais, um público por vez.
          </p>
          <div className={s.chips}>
            <span className={s.chip}>Vertical 9:16</span>
            <span className={s.chip}>~30 segundos</span>
            <span className={s.chip}>Selfie + b-roll</span>
            <span className={s.chip}>Voz do Thiago</span>
          </div>
        </div>
      </header>

      <div className={s.col}>
        <div className={s.note}>
          Grava olhando <b>direto na lente</b>, com energia alta. Pode repetir cada tomada{" "}
          <b>2 ou 3 vezes</b> que a gente escolhe a melhor.
          <div className={s.legend}>
            <span>
              <i className={`${s.dot} ${s.dotSay}`} /> Vermelho = o que você <b>fala</b> (em
              inglês)
            </span>
            <span>
              <i className={`${s.dot} ${s.dotDo}`} /> Cinza = direção, não fala
            </span>
          </div>
        </div>

        {/* TAKES */}
        <section className={s.section}>
          <div className={s.secHead}>
            <h2>As 3 tomadas</h2>
            <span className={s.rule} />
          </div>
          <div className={s.takes}>
            <article className={s.take}>
              <div className={s.takeTop}>
                <span className={s.takeNo}>TAKE 1</span>
                <span className={s.takeRole}>Gancho + oferta · parado, tatame ao fundo</span>
              </div>
              <div className={s.takeBody}>
                <div className={s.variant}>
                  <span className={s.variantTag}>Versão A · chamada direta aos pais</span>
                  <p className={s.sayLabel}>Fala isso</p>
                  <p className={s.say}>
                    “Attention, Brentwood parents with kids ages 4 and up! Your child&apos;s first
                    Jiu-Jitsu class here at Checkmat Brentwood is{" "}
                    <span className={s.free}>completely free</span>. No credit card, and we
                    provide all the gear.”
                  </p>
                </div>
                <div className={s.variant}>
                  <span className={`${s.variantTag} ${s.variantTagB}`}>
                    Versão B · gancho pela dor (pra testar)
                  </span>
                  <p className={s.sayLabel}>Fala isso</p>
                  <p className={s.say}>
                    “Is your kid glued to a screen? In one class, we can start changing that.
                    Their first Jiu-Jitsu class at Checkmat Brentwood is{" "}
                    <span className={s.free}>completely free</span>, no credit card required.”
                  </p>
                </div>
                <p className={s.doNote}>
                  <b>Direção:</b> chama os pais direto, com a idade (“4 and up”). É o gancho que
                  mais funcionou até hoje, então mantém a estrutura.
                </p>
              </div>
            </article>

            <article className={s.take}>
              <div className={s.takeTop}>
                <span className={s.takeNo}>TAKE 2</span>
                <span className={s.takeRole}>
                  Tira o medo dos pais · mostra crianças treinando ao fundo
                </span>
              </div>
              <div className={s.takeBody}>
                <p className={s.sayLabel}>Fala isso</p>
                <p className={s.say}>
                  “Never done martial arts before? Perfect, that&apos;s most of our kids. In a
                  safe and fun environment, they&apos;ll build real confidence, discipline, and
                  make new friends, on the mat, not on a screen.”
                </p>
                <p className={s.doNote}>
                  <b>Direção:</b> tom acolhedor, como quem tranquiliza um pai preocupado. Mostra
                  as crianças treinando, sorrindo.
                </p>
              </div>
            </article>

            <article className={s.take}>
              <div className={s.takeTop}>
                <span className={s.takeNo}>TAKE 3</span>
                <span className={s.takeRole}>
                  Autoridade + chamada · close, aponta pra baixo no fim
                </span>
              </div>
              <div className={s.takeBody}>
                <p className={s.sayLabel}>Fala isso</p>
                <p className={s.say}>
                  “I&apos;m Thiago Gaia, black belt champion, and I personally coach every kids
                  class. Tap ‘Learn More’, book your child&apos;s{" "}
                  <span className={s.free}>free class</span>, and let&apos;s get them moving this
                  week.”
                </p>
                <p className={s.doNote}>
                  <b>Direção:</b> olha firme na lente, sorriso no final e aponta pra baixo (onde
                  fica o botão).
                </p>
              </div>
            </article>
          </div>
        </section>

        {/* TIMELINE */}
        <section className={s.section}>
          <div className={s.secHead}>
            <h2>Como fica montado</h2>
            <span className={s.rule} />
          </div>
          <div className={s.tlScroll}>
            <table className={s.table}>
              <thead>
                <tr>
                  <th>Tempo</th>
                  <th>Imagem</th>
                  <th>Fala</th>
                  <th>Texto na tela</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={s.tc}>0–3s</td>
                  <td className={s.k}>Close, energia alta</td>
                  <td>T1 · gancho</td>
                  <td className={s.ost}>BRENTWOOD PARENTS</td>
                </tr>
                <tr>
                  <td className={s.tc}>3–9s</td>
                  <td className={s.k}>Thiago + tatame</td>
                  <td>T1 · oferta</td>
                  <td className={s.ost}>Kids 4+ · 1st Class FREE · No credit card</td>
                </tr>
                <tr>
                  <td className={s.tc}>9–18s</td>
                  <td className={s.k}>B-roll de crianças treinando</td>
                  <td>T2</td>
                  <td className={s.ost}>No experience needed</td>
                </tr>
                <tr>
                  <td className={s.tc}>18–22s</td>
                  <td className={s.k}>Thiago falando</td>
                  <td>T2 · final</td>
                  <td className={s.ost}>Confidence · Discipline · New friends</td>
                </tr>
                <tr>
                  <td className={s.tc}>22–27s</td>
                  <td className={s.k}>Close Thiago</td>
                  <td>T3</td>
                  <td className={s.ost}>Black Belt Champion</td>
                </tr>
                <tr>
                  <td className={s.tc}>27–30s</td>
                  <td className={s.k}>Aponta pra baixo</td>
                  <td>T3 · CTA</td>
                  <td className={s.ost}>BOOK YOUR CHILD&apos;S FREE CLASS</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CHECKLIST + TIPS */}
        <section className={s.section}>
          <div className={s.secHead}>
            <h2>Pra gravar junto</h2>
            <span className={s.rule} />
          </div>
          <div className={s.grid2}>
            <div className={s.panel}>
              <h3>B-roll (10 a 15s soltos)</h3>
              <ul className={s.list}>
                <li>
                  Crianças em fila fazendo a saudação de início de aula{" "}
                  <small>mostra disciplina e respeito</small>
                </li>
                <li>Coach ajudando uma criança numa técnica, de perto</li>
                <li>
                  Duas crianças treinando e sorrindo <small>ambiente leve, não competitivo</small>
                </li>
                <li>
                  Um pai ou mãe assistindo e sorrindo na arquibancada{" "}
                  <small>prova social pros pais que assistem o anúncio</small>
                </li>
              </ul>
            </div>
            <div className={s.panel}>
              <h3>Dicas rápidas</h3>
              <ul className={`${s.list} ${s.listTips}`}>
                <li>Fala direto com quem decide: o pai ou a mãe, não a criança</li>
                <li>Mantém o foco só em kids neste vídeo, sem misturar aula de adulto</li>
                <li>Grava de dia ou com boa luz, lapela se tiver</li>
                <li>Olha na lente, não na telinha do celular</li>
                <li>Legenda grande na tela a gente adiciona na edição</li>
              </ul>
            </div>
          </div>
        </section>

        <footer className={s.footer}>
          <span>Checkmat Brentwood · Fujiex Tech Performance</span>
          <span>Criativo 2 · Kids &amp; Família</span>
        </footer>
      </div>
    </div>
  )
}
