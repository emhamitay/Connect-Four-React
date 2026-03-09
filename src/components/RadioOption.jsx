/**
 * 📘 Reusable RadioOption Component
 * 
 * This component is designed to be used inside a <RadioGroup /> component.
 * It renders a custom-styled radio input with full accessibility and visual feedback.
 * 
 * ✅ Features:
 * - Automatically receives `name`, `value`, and `onChange` from the context (RadioGroup)
 * - Custom styling using Tailwind CSS
 * - Supports disabled options (via `enable=false` logic - can be extended)
 * - Cursor and hover effects to simulate button-like experience
 * 
 * 🛠 Usage Example:
 * 
 * <RadioGroup
 *   legend="Game Mode"
 *   value={selectedOption}
 *   onChange={(e) => setSelectedOption(e.target.id)}
 * >
 *   <RadioOption id="easy" value="Easy Mode" />
 *   <RadioOption id="hard" value="Hard Mode" rightValue="🔥" />
 * </RadioGroup>
 * 
 * This component must be used inside a <RadioGroup />.
 */

import { useContext } from 'react';
import { LegendContext } from './RadioGroup.jsx';

export default function RadioOption({ id, value, rightValue = '' }) {
    // Get the context values from the parent RadioGroup
    const context = useContext(LegendContext);
    const onChange = context.onChange;        // Callback when selection changes
    const currentValue = context.value;       // Currently selected option ID
    const legend = context.legend;            // Used as the name attribute

    // Safety check: This component must be inside a RadioGroup
    if (!legend) {
        console.error("RadioOption must be used within a RadioGroup");
        return null;
    }

    // Use the legend (group title) as the name for the radio input
    const name = legend.replace(/\s+/g, '-').toLowerCase();

    return (
        <div>
            <label
                htmlFor={id}
                // Tailwind classes:
                // - cursor-pointer: shows hand cursor on hover
                // - flex layout and spacing
                // - border and background color based on selection
                className={
                    "cursor-pointer flex items-center justify-between gap-4 rounded border p-3 text-sm font-medium shadow-sm transition-colors hover:bg-gray-50 " +
                    (currentValue === id
                        ? "border-blue-600 ring-1 ring-blue-600 bg-blue-50"
                        : "border-gray-300 bg-white")
                }
            >
                {/* Left label (main value) */}
                <p className="text-gray-700">{value}</p>

                {/* Optional right-side value (e.g., icon or score) */}
                <p className="text-gray-900">{rightValue}</p>

                {/* The actual hidden radio input */}
                <input
                    type="radio"
                    name={name}
                    value={value}
                    id={id}
                    className="sr-only"
                    checked={currentValue === id}
                    onChange={onChange}
                />
            </label>
        </div>
    );
}
