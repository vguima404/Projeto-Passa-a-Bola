export default function ProfilePurchaseHistory() {
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold text-purple-600">Histórico de Compras</h3>
      <ul className="space-y-3">
        <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
          <span>Camisa oficial Passa a Bola</span>
          <span className="text-gray-500">10/09/2025</span>
        </li>
        <li className="p-4 bg-gray-50 rounded-lg shadow-sm flex justify-between">
          <span>Ingresso Copa Passa a Bola</span>
          <span className="text-gray-500">02/09/2025</span>
        </li>
      </ul>
    </div>
  );
}