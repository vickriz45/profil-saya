import { useState } from "react";
import "./App.css";

const profil = {
  nama: "Vicky",
  bio: "Saya berasal dari Kota Bekasi, Jawa Barat.",
  skills: ["HTML", "CSS", "JavaScript", "React"],
};

function Skill({ nama }) {
  return <li>{nama}</li>;
}

export default function App() {
  const [gelap, setGelap] = useState(false);

  return (
    <div className={gelap ? "halaman gelap" : "halaman"}>
      <header>
        <h1>Halo, saya {profil.nama} 👋</h1>
        <p>{profil.bio}</p>
        <button onClick={() => setGelap(!gelap)}>Ubah Tema</button>
      </header>

      <section>
        <h2>Skill</h2>
        <ul>
          {profil.skills.map((s) => (
            <Skill key={s} nama={s} />
          ))}
        </ul>
      </section>
    </div>
  );
}