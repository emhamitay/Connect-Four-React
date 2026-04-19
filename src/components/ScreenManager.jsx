// בס"ד
/**
 * 📘 Screen & ScreenManager Components (Combined File)
 *
 * This file provides a simple way to manage screen-like navigation in a React app
 * without using a routing library (like React Router). It's ideal for games, forms,
 * or multi-step interfaces.
 *
 * ✅ Components:
 * 
 * 1. <Screen /> - A logical wrapper for each screen section. It does not render any
 *    actual DOM element – just passes the content through.
 *
 * 2. <ScreenManager /> - Controls which <Screen /> should be visible based on the
 *    currentScreen prop. Only the matching screen will be rendered.
 *
 * 🛠 Usage Example:
 * 
 * const [currentScreen, setCurrentScreen] = useState("Start");
 * 
 * <ScreenManager currentScreen={currentScreen}>
 *   <Screen screenName="Start"><StartScreen /></Screen>
 *   <Screen screenName="Game"><GameScreen /></Screen>
 * </ScreenManager>
 */

import React from 'react';

/** 
 * 📍 Screen Component
 * Lightweight wrapper that defines a "screen" in the application.
 * It does not add any HTML elements – useful for organization only.
 */
export function Screen({ screenName, children }) {
  return <>{children}</>; // Just returns children without modifying the DOM
}

/** 
 * 📍 ScreenManager Component
 * Renders only the child <Screen /> that matches the `currentScreen` prop.
 */
export function ScreenManager({ children, currentScreen }) {
  // Ensure children is always treated as an array
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <>
      {childArray.map((child, index) => {
        // Get the screenName prop from each <Screen />
        const screenName = child.props?.screenName;

        // If it matches the current screen, render it
        if (screenName === currentScreen) {
          return (
            <div key={index} className="screen">
              {child}
            </div>
          );
        }

        // Otherwise, render nothing
        return null;
      })}
    </>
  );
}
