// בס"ד
/**
 * 📘 RadioGroup Component
 * 
 * This component serves as a reusable wrapper for a group of <RadioOption /> components.
 * It uses React Context to pass down shared props like:
 * - `legend` (group label and input name)
 * - `value` (currently selected radio id)
 * - `onChange` (callback to update selected value)
 * 
 * ✅ Features:
 * - Accessible: uses <fieldset> and <legend>
 * - Context-powered: children don't need to manually receive props
 * - Easy to customize and scale
 * 
 * 🛠 Usage Example:
 * 
 * <RadioGroup
 *   legend="Game Mode"
 *   value={selectedOption}
 *   onChange={(e) => setSelectedOption(e.target.id)}
 * >
 *   <RadioOption id="easy" value="Easy Mode" />
 *   <RadioOption id="hard" value="Hard Mode" />
 * </RadioGroup>
 */

import { createContext } from 'react';
import { Children } from 'react';

// Create context to share data with RadioOption children
export const LegendContext = createContext();

export default function RadioGroup({ children , legend, value, onChange }) {
    return (
        // Use <fieldset> for semantic grouping of radio inputs
        <fieldset className="space-y-3">
            
            {/* Provide the context to all child RadioOption components */}
            <LegendContext.Provider value={{
                legend: legend,
                value: value,
                onChange: onChange
            }}>
                
                {/* <legend> is visually hidden but improves accessibility */}
                <legend className="sr-only">{legend}</legend>

                {/* Render all children (RadioOptions), each wrapped in a <div> */}
                {Children.map(children, (child, index) => (
                    <div key={index}>{child}</div>
                ))}
            </LegendContext.Provider>
        </fieldset>
    );
}