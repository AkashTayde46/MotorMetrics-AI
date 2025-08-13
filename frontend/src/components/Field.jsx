export default function Field({ label, type = "text", value, onChange, placeholder }) {
  return (
    <div className="field">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border rounded px-3 py-2 w-full"
      />
    </div>
  );
}
