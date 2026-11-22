import { useEffect, useState } from "react";
import "./App.css";

// ====== EDIT DATA DI SINI SAJA ======
const profil = {
  nama: "Vicky Rizkyanto",
  peran: "Mahasiswa",
  foto: "/foto.jpg",
  ringkas: "Saya Mahasiswa Politeknik Negeri Madiun.",
  tentang: [
    "Saya adalah Mahasiswa dari Politeknik Negeri Madiun, berada di jurusan Teknik dan program studi Teknologi Rekayasa Perangkat Lunak",
    "Di dunia pemrograman, saya suka menjelajah hal-hal baru, dan saya suka menjadi Front End Development.",
  ],
  skills: {
    Frontend: ["Belum di isi"],
    Tools: ["Belum di isi"],
  },
  proyek: [
    {
      judul: "Website Profil (contoh)",
      deskripsi: "Website profil satu halaman dengan mode gelap dan filter proyek.",
      kategori: "Web",
      teknologi: ["React", "Vite", "CSS"],
      demo: "#",
      github: "#",
    },
    {
      judul: "To-Do List (contoh)",
      deskripsi: "Aplikasi catatan tugas dengan tambah, hapus, dan tandai selesai.",
      kategori: "Belajar",
      teknologi: ["JavaScript", "DOM"],
      demo: "#",
      github: "#",
    },
    {
      judul: "Aplikasi Cuaca (contoh)",
      deskripsi: "Menampilkan cuaca kota yang dicari memakai fetch API.",
      kategori: "Belajar",
      teknologi: ["React", "API"],
      demo: "#",
      github: "#",
    },
  ],
  kontak: {
    email: "vickyrizkyanto45@gmail.com",
    github: "https://github.com/vickriz45",
    linkedin: "#",
  },
};

const menu = [
  { id: "tentang", label: "Tentang" },
  { id: "skill", label: "Skill" },
  { id: "proyek", label: "Proyek" },
  { id: "kontak", label: "Kontak" },
];

function ambilTemaAwal() {
  try {
    const simpan = localStorage.getItem("tema");
    if (simpan) return simpan;
  } catch {
    // abaikan jika storage tidak tersedia
  }
  return window.matchMedia("(prefers-color-scheme: light)").matches
    ? "terang"
    : "gelap";
}

function Navbar({ aktif, tema, gantiTema }) {
  return (
    <header className="navbar">
      <a href="#atas" className="logo">
        {profil.nama}
      </a>
      <nav aria-label="Menu utama">
        {menu.map((m) => (
          <a
            key={m.id}
            href={`#${m.id}`}
            className={aktif === m.id ? "aktif" : ""}
          >
            {m.label}
          </a>
        ))}
      </nav>
      <button
        className="tombol-tema"
        onClick={gantiTema}
        aria-label="Ganti tema"
      >
        {tema === "gelap" ? "Mode terang" : "Mode gelap"}
      </button>
    </header>
  );
}

function KartuProyek({ p }) {
  return (
    <article className="proyek">
      <div className="proyek-atas">
        <h3>{p.judul}</h3>
        <span className="kategori">{p.kategori}</span>
      </div>
      <p>{p.deskripsi}</p>
      <ul className="teknologi">
        {p.teknologi.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <div className="tautan">
        <a href={p.demo} target="_blank" rel="noreferrer">
          Lihat demo
        </a>
        <a href={p.github} target="_blank" rel="noreferrer">
          Kode di GitHub
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [tema, setTema] = useState(ambilTemaAwal);
  const [aktif, setAktif] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [fotoGagal, setFotoGagal] = useState(false);

  // Terapkan tema ke halaman & simpan pilihan
  useEffect(() => {
    document.documentElement.dataset.tema = tema;
    try {
      localStorage.setItem("tema", tema);
    } catch {
      // abaikan
    }
  }, [tema]);

  // Sorot menu sesuai bagian yang sedang terlihat
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAktif(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    menu.forEach((m) => {
      const el = document.getElementById(m.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const kategori = ["Semua", ...new Set(profil.proyek.map((p) => p.kategori))];
  const proyekTampil =
    filter === "Semua"
      ? profil.proyek
      : profil.proyek.filter((p) => p.kategori === filter);

  return (
    <>
      <Navbar
        aktif={aktif}
        tema={tema}
        gantiTema={() => setTema(tema === "gelap" ? "terang" : "gelap")}
      />

      <main id="atas">
        <section className="hero">
          <div className="hero-teks">
            <p className="peran">{profil.peran}</p>
            <h1>{profil.nama}</h1>
            <p className="ringkas">{profil.ringkas}</p>
            <div className="aksi">
              <a href="#proyek" className="btn utama">
                Lihat proyek
              </a>
              <a href="#kontak" className="btn">
                Hubungi saya
              </a>
            </div>
          </div>

          <div className="foto">
            {fotoGagal ? (
              <span className="foto-awal" aria-hidden="true">
                {profil.nama[0]}
              </span>
            ) : (
              <img
                src={profil.foto}
                alt={`Foto ${profil.nama}`}
                onError={() => setFotoGagal(true)}
              />
            )}
          </div>
        </section>

        <section id="tentang" className="bagian">
          <h2>Tentang saya</h2>
          <div className="teks">
            {profil.tentang.map((t) => (
              <p key={t}>{t}</p>
            ))}
          </div>
        </section>

        <section id="skill" className="bagian">
          <h2>Skill</h2>
          <div className="grup-skill">
            {Object.entries(profil.skills).map(([grup, daftar]) => (
              <div key={grup}>
                <h3>{grup}</h3>
                <ul className="teknologi">
                  {daftar.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="proyek" className="bagian">
          <h2>Proyek</h2>
          <div className="filter" role="group" aria-label="Filter proyek">
            {kategori.map((k) => (
              <button
                key={k}
                className={filter === k ? "chip aktif" : "chip"}
                onClick={() => setFilter(k)}
              >
                {k}
              </button>
            ))}
          </div>
          <div className="daftar-proyek">
            {proyekTampil.map((p) => (
              <KartuProyek key={p.judul} p={p} />
            ))}
          </div>
        </section>

        <section id="kontak" className="bagian">
          <h2>Kontak</h2>
          <p className="teks">
            Tertarik bekerja sama atau ingin ngobrol? Kirim email, saya balas
            secepatnya.
          </p>
          <div className="aksi">
            <a href={`mailto:${profil.kontak.email}`} className="btn utama">
              Kirim email
            </a>
            <a href={profil.kontak.github} target="_blank" rel="noreferrer" className="btn">
              GitHub
            </a>
            <a href={profil.kontak.linkedin} target="_blank" rel="noreferrer" className="btn">
              LinkedIn
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {profil.nama}. Dibuat dengan React.
        </p>
      </footer>
    </>
  );
}
