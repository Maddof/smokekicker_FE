/**
 * Displays a list of regular subscription items
 *
 * @param {Array} items - Array of subscription items
 */
export default function SubscriptionItemsList({ items = [] }) {
  return (
    <>
      {items.length > 0 ? (
        <ul className="mb-2 list-disc pl-5 text-sm">
          {items.map((item) => (
            <li key={item.id || `item-${Math.random()}`}>
              {item.product?.name || "Unknown product"} x {item.quantity || 1}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground pl-1 text-sm italic">
          Inga prenumerationsartiklar
        </p>
      )}
    </>
  );
}
