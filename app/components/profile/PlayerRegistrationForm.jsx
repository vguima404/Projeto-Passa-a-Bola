import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";

function maskCPF(rawCpf) {
  const cpf = (rawCpf || "").replace(/\D/g, "").slice(0, 11);
  if (!cpf) return "";
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (m, a, b, c, d) =>
    d ? `${a}.${b}.${c}-${d}` : `${a}.${b}.${c}`
  );
}



function PlayerRegistrationForm({ initial = {}, onSave, onCancel }) {
  const [name, setName] = useState(initial.name || "Meu Perfil");
  const [email, setEmail] = useState(initial.email || "");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(initial.photoUrl || null);
  const [cpf, setCpf] = useState(initial.cpf || "");
  const [position, setPosition] = useState(initial.position || "");
  const [socials, setSocials] = useState(initial.socials || { instagram: "", facebook: "", tiktok: "" });
  const [achievements, setAchievements] = useState(initial.achievements || []);
  const [matches, setMatches] = useState(initial.matches || []);
  const [teamName, setTeamName] = useState(initial.team?.name || "");
  const [teamMembersInput, setTeamMembersInput] = useState((initial.team?.members || []).join(", "));
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!photoFile) return;
    const doUpload = async () => {
      try {
        const API_BASE =
          process.env.NEXT_PUBLIC_API_BASE_URL ||
          (process.env.NODE_ENV === "development"
            ? "http://127.0.0.1:5000"
            : "https://projeto-passa-a-bola.onrender.com");
        const form = new FormData();
        form.append("image", photoFile);
        const res = await fetch(`${API_BASE}/upload-image`, { method: "POST", body: form });
        const ct = res.headers.get("content-type") || "";
        let data;
        if (ct.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(`Resposta não-JSON (${res.status}): ${text.substring(0,200)}`);
        }
        if (data.success && data.link) {
          setPhotoPreview(data.link);
        } else {
          console.error("Upload falhou:", data);
          alert(`${data.message || "Falha no upload da imagem"}${data.detail ? "\n" + data.detail : ""}`);
          setPhotoPreview(null);
        }
      } catch (err) {
        console.error("Erro upload imagem", err);
        alert(`Erro ao enviar imagem: ${err.message || err}`);
        setPhotoPreview(null);
      }
    };
    doUpload();
  }, [photoFile]);

  const defaultBadges = ["MVP", "Artilheira", "Muralha", "Fair Play"];

  function toggleBadge(b) {
    setAchievements((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }

  function addCustomBadge(name) {
    if (!name) return;
    if (!achievements.includes(name)) setAchievements((p) => [...p, name]);
  }

  function addMatch(match) {
    setMatches((p) => [match, ...p]);
  }

  // handleCPFBlur removido, não há mais validação

  function parseTeamCPFs(text) {
    return text
      .split(/[\,\n;]/)
      .map((s) => s.replace(/\D/g, "").slice(0, 11))
      .filter(Boolean)
      .map(maskCPF);
  }

  async function handleCreateTeam() {
    // Não há mais validação de CPF, apenas estrutura visual
    // FUTURO: aqui você faria verificação em backend se esses CPFs já existem como jogadoras
    // e então criaria o time. Por enquanto, simulamos criação local:
    setSaving(true);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    alert("Time criado localmente (integração com backend necessária para persistência).");
    // se quiser, atribua ao estado local:
    // setTeamName(...); setTeamMembersInput(...);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const newErrors = {};
  if (!name) newErrors.name = "Nome obrigatório";
  if (!cpf) newErrors.cpf = "CPF é necessário para perfil de jogadora";

  setErrors(newErrors);
  if (Object.keys(newErrors).length) return;

    setSaving(true);

    // prepare profile object
    const updated = {
      name,
      email,
      photoUrl: photoPreview,
      cpf,
      position,
      socials,
      achievements,
      matches,
      team: teamName ? { name: teamName, members: parseTeamCPFs(teamMembersInput) } : null,
    };

    // Simular upload/validação
    await new Promise((r) => setTimeout(r, 800));

    setSaving(false);
    onSave && onSave(updated);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-xl rounded-2xl p-6 space-y-6">
      <section className="grid md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-1 flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-purple-600 flex items-center justify-center">
            {photoPreview ? (
              <img src={photoPreview} alt="preview" className="w-full h-full object-cover" />
            ) : (
              <FaUser className="text-gray-300 text-4xl" />
            )}
          </div>
          <label className="mt-3 text-sm text-gray-600 w-full text-center">
            Upload da foto
            <input
              accept="image/*"
              onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
              type="file"
              className="hidden"
            />
            <div className="mt-2">
              <button
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                {photoPreview ? "Trocar imagem" : "Selecionar imagem"}
              </button>
            </div>
          </label>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm text-gray-600">Nome</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded-lg p-2" />
            {errors.name && <div className="text-red-600 text-sm mt-1">{errors.name}</div>}
          </div>
          <div>
            <label className="block text-sm text-gray-600">E-mail</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="w-full border rounded-lg p-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600">CPF <span className="text-xs text-gray-400">(obrigatório)</span></label>
            {initial.cpf ? (
              <div className="w-full border rounded-lg p-2 bg-gray-100 text-gray-500 cursor-not-allowed">{initial.cpf}</div>
            ) : (
              <input
                value={maskCPF(cpf)}
                onChange={e => {
                  // Aceita qualquer valor, mas só mantém números e até 11 dígitos
                  const raw = e.target.value.replace(/\D/g, "").slice(0, 11);
                  setCpf(raw);
                }}
                placeholder="000.000.000-00"
                className="w-full border rounded-lg p-2"
              />
            )}
            {errors.cpf && <div className="text-red-600 text-sm mt-1">{errors.cpf}</div>}
          </div>
        </div>
      </section>

      {/* position / socials */}
      <section className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-600">Posição</label>
          <select value={position} onChange={(e)=>setPosition(e.target.value)} className="w-full border rounded-lg p-2">
            <option value="">Selecione</option>
            <option>Goleira</option>
            <option>Zagueira</option>
            <option>Meia</option>
            <option>Atacante</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600">Instagram (url)</label>
          <input value={socials.instagram} onChange={(e)=>setSocials(s=>({...s, instagram: e.target.value}))} className="w-full border rounded-lg p-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600">Facebook / TikTok (url)</label>
          <input value={socials.facebook} onChange={(e)=>setSocials(s=>({...s, facebook: e.target.value}))} className="w-full border rounded-lg p-2 mb-2" />
          <input value={socials.tiktok} onChange={(e)=>setSocials(s=>({...s, tiktok: e.target.value}))} className="w-full border rounded-lg p-2" />
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Conquistas</h4>
        <div className="flex flex-wrap gap-2 mb-3">
          {defaultBadges.map((b) => (
            <button
              key={b}
              type="button"
              onClick={()=>toggleBadge(b)}
              className={`px-3 py-1 text-sm rounded-lg border ${achievements.includes(b) ? "bg-purple-600 text-white" : "bg-white text-gray-700"}`}
            >
              {b}
            </button>
          ))}
        </div>
        <AddCustomBadge onAdd={addCustomBadge} />
      </section>

      {/* Histórico de Partidas (form de adicionar + listagem) */}
      <section className="bg-white p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Histórico de Partidas</h4>
        <AddMatchForm onAdd={addMatch} />
        <ul className="mt-4 space-y-2">
          {matches.map((m, i) => (
            <li key={i} className="flex justify-between items-center bg-gray-50 p-2 rounded">
              <div>
                <div className="text-sm text-gray-600">{m.date} • {m.competition}</div>
                <div className="font-semibold">{m.opponent}</div>
              </div>
              <div className={`font-bold ${m.goalsFor > m.goalsAgainst ? "text-green-600" : m.goalsFor < m.goalsAgainst ? "text-red-600" : "text-gray-700"}`}>
                {m.goalsFor} x {m.goalsAgainst}
              </div>
            </li>
          ))}
        </ul>
      </section>
      

      {/* Criar Time */}
      <section className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">Criar Time</h4>
        <p className="text-sm text-gray-500 mb-2">Informe o nome do time e os CPFs das jogadoras (separados por vírgula ou nova linha).</p>
        <input value={teamName} onChange={(e)=>setTeamName(e.target.value)} placeholder="Nome do time" className="w-full border rounded-lg p-2 mb-3" />
        <textarea value={teamMembersInput} onChange={(e)=>setTeamMembersInput(e.target.value)} placeholder="000.000.000-00, 111.111.111-11" className="w-full border rounded-lg p-2 mb-3" rows={3} />
        <div className="flex gap-3">
          <button type="button" onClick={handleCreateTeam} disabled={saving} className="px-4 py-2 bg-purple-600 text-white rounded-lg">
            {saving ? "Criando..." : "Criar Time (simulado)"}
          </button>
          <div className="text-sm text-gray-500 self-center">Validação real dependerá do backend.</div>
        </div>
      </section>

      {/* actions */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg bg-gray-200">Cancelar</button>
        <button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-purple-600 text-white">{saving ? "Salvando..." : "Salvar Jogadora"}</button>
      </div>
    </form>
  );
}

function AddCustomBadge({ onAdd }) {
  const [v, setV] = useState("");
  return (
    <div className="flex gap-2">
      <input
        value={v}
        onChange={(e) => setV(e.target.value)}
        placeholder="Adicionar conquista personalizada"
        className="w-full border rounded-lg p-2"
      />
      <button
        type="button"
        onClick={() => {
          onAdd(v);
          setV("");
        }}
        className="px-3 py-1 bg-gray-200 rounded-lg"
      >
        Adicionar
      </button>
    </div>
  );
}

function AddMatchForm({ onAdd }) {
  const [opponent, setOpponent] = useState("");
  const [date, setDate] = useState("");
  const [goalsFor, setGoalsFor] = useState("");
  const [goalsAgainst, setGoalsAgainst] = useState("");
  const [competition, setCompetition] = useState("Copa Passa a Bola");

  function submit() {
    if (!opponent || !date || goalsFor === "" || goalsAgainst === "") {
      alert("Preencha todos os campos da partida.");
      return;
    }
    onAdd({ opponent, date, goalsFor: Number(goalsFor), goalsAgainst: Number(goalsAgainst), competition });
    setOpponent(""); setDate(""); setGoalsFor(""); setGoalsAgainst("");
  }

  return (
    <div className="grid md:grid-cols-4 gap-2 mb-2">
      <input value={date} onChange={(e)=>setDate(e.target.value)} type="date" className="border rounded-lg p-2 md:col-span-1" />
      <input value={opponent} onChange={(e)=>setOpponent(e.target.value)} placeholder="Adversário" className="border rounded-lg p-2 md:col-span-1" />
      <input value={goalsFor} onChange={(e)=>setGoalsFor(e.target.value)} type="number" placeholder="Gols (eu)" className="border rounded-lg p-2 md:col-span-1" />
      <input value={goalsAgainst} onChange={(e)=>setGoalsAgainst(e.target.value)} type="number" placeholder="Gols (adversário)" className="border rounded-lg p-2 md:col-span-1" />
      <input value={competition} onChange={(e)=>setCompetition(e.target.value)} placeholder="Competição" className="border rounded-lg p-2 md:col-span-3" />
      <div className="md:col-span-1 flex items-center">
        <button type="button" onClick={submit} className="px-3 py-2 bg-purple-600 text-white rounded-lg">Adicionar partida</button>
      </div>
    </div>
  );
}

export default PlayerRegistrationForm;