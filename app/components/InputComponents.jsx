import React from "react";

export function TextInput({ label, value, onChange, placeholder, required = false, readOnly = false, maxLength, type = "text", ...props }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        readOnly={readOnly}
        maxLength={maxLength}
        className={`w-full border rounded-lg p-3 ${readOnly ? 'bg-gray-100' : 'focus:outline-none focus:ring-2 focus:ring-purple-500'}`}
        placeholder={placeholder}
        {...props}
      />
    </div>
  );
}

export function CepInput({ value, onChange, onBuscar, required = false }) {
  return (
    <div>
      <label className="block text-gray-700 font-semibold mb-2">CEP</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={onChange}
          required={required}
          maxLength={9}
          className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="00000-000"
        />
        <button
          type="button"
          onClick={onBuscar}
          className="bg-purple-600 text-white px-4 rounded-lg hover:bg-purple-700 transition"
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
