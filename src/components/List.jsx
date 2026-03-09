import { useState } from 'react';
import clsx from 'clsx';

// List component:
// Receives an array of `items` and a callback `onChange`.
// Renders a list (<ul>) of ListItem components, passing each item's id and name.
// Usage:
// <List items={itemsArray} onChange={handleSelect} />
export default function List({ items, onChange }) {
  return (
    <ul className="space-y-1">
      {items.map((item) => (
        <ListItem key={item._id} onChange={onChange} id={item._id}>
          {item.game_name}
        </ListItem>
      ))}
    </ul>
  );
}

// ListItem component:
// Renders a single clickable list item (<li> with an <a> inside).
// Props:
// - children: content/text to display inside the link (usually game name)
// - onChange: function to call when item is clicked, receives the id as argument
// - id: unique identifier for the item
// Features:
// - Highlights on mouse hover using CSS classes (managed with state and clsx)
// - Calls `onChange(id)` when clicked, preventing default link behavior
export function ListItem({ children, onChange, id }) {
  const [mouseHover, setMouseHover] = useState(false);

  return (
    <li>
      <a
        href="#"
        className={clsx(
          "block rounded-lg px-4 py-2 text-sm font-medium text-gray-500",
          { "bg-gray-100": mouseHover, "text-gray-700": mouseHover }
        )}
        onMouseEnter={() => setMouseHover(true)} // highlight on hover
        onMouseLeave={() => setMouseHover(false)} // remove highlight on leave
        onClick={(e) => {
          e.preventDefault(); // prevent page jump on clicking <a href="#">
          onChange(id);       // notify parent about clicked item id
        }}
      >
        {children}
      </a>
    </li>
  );
}
