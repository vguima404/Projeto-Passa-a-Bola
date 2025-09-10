
const CampoTexto = (props) => {

  const aoDigitado = (e) => {
    props.aoAlterado(e.target.value);
  }

  return (
    <div className="gap-3 font-[family-name:var(--font-poppins)] flex flex-col mb-2.5">
      <label className=" text-2xl mb-1">{props.label}</label>
      <input className="shadow-[var(--shadow-6)] text-black text-base p-2.5 rounded bg-white border-2 border-purple-500" type={props.type || "text"} placeholder={props.placeholder} required={props.obrigatorio} value={props.valor} onChange={aoDigitado}/>
    </div>
  );
}

export default CampoTexto;