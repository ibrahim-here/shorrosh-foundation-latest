# Syntax Error Fix Guide

## Error Message
```
'import' and 'export' may only appear at the top level. (5239:0)
export default App;
```

## Likely Cause
This error typically means there's a missing closing brace `}` somewhere in the file, causing the `export` statement to appear inside a function instead of at the top level.

## Quick Fix Steps

### Step 1: Clear Cache
```bash
# Stop the dev server (Ctrl+C)
# Delete node_modules/.vite folder
rm -rf node_modules/.vite
# Or on Windows:
rmdir /s /q node_modules\.vite

# Restart dev server
npm run dev
```

### Step 2: If that doesn't work, check for missing braces

The file structure should be:
```javascript
// Imports at top
import React from 'react';
// ... more imports

// Component definitions
const EmailCollectionModal = () => { ... };
const DonationItemsPage = () => { ... };
// ... more components

const ShorroshFoundation = () => {
  // State and functions
  
  // Page component definitions (inside ShorroshFoundation)
  const HomePage = () => { ... };
  const AboutPage = () => { ... };
  // ... more page components
  
  const Footer = () => ( ... );
  
  // Main return
  return (
    <div>
      {/* All the page routing */}
      <Footer />
    </div>
  );
}; // <-- ShorroshFoundation closes here

function App() {
  return <ShorroshFoundation />;
}

export default App; // <-- This should be at top level
```

### Step 3: Manual Check
If the cache clear doesn't work, manually verify:

1. Every `{` has a matching `}`
2. Every `(` has a matching `)`
3. Every `[` has a matching `]`

Use your IDE's bracket matching feature (usually clicking on a bracket highlights its pair).

### Step 4: Use a Linter
```bash
# Install ESLint if not already installed
npm install --save-dev eslint

# Run ESLint
npx eslint src/App.jsx
```

## Most Common Locations for Missing Braces

Based on recent changes:

1. **RestaurantsPage** (line ~4375-4572) - Check the Denny's section
2. **Featured Products Section** (line ~3662-3780) - Check the product cards
3. **DonationItemsPage** (line ~2041-2330) - Check the Restaurant Partnership section

## Nuclear Option: Revert Recent Changes

If nothing works, revert the last commit:
```bash
git log --oneline -5  # See recent commits
git revert HEAD  # Revert last commit
```

Then re-apply changes one at a time to find the problematic section.

## Prevention

Always use:
- Auto-formatting (Prettier)
- Bracket pair colorization in VS Code
- ESLint for real-time error detection

## Need Help?

If the error persists:
1. Copy the entire error stack trace
2. Check which line number is mentioned
3. Look at that line and 20-30 lines before it
4. Count opening and closing braces manually
