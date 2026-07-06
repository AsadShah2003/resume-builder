const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        processDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('useGlobalContext')) {
        console.log(`Replacing in ${fullPath}`);
        
        // Replace import
        content = content.replace(
          /import\s*{\s*useGlobalContext\s*}\s*from\s*['"](?:@\/|\.\.\/|\.\/)*app\/Context\/store['"];?/g,
          'import { useResumeStore } from "@/lib/store/useResumeStore";'
        );
        
        // This is a naive replacement, but for the destructured usage it might be tricky.
        // E.g. const { user, setUser } = useGlobalContext();
        // Since Zustand returns the whole state or a selector, a simple replacement like
        // const { user, setUser } = useResumeStore(); would work if we don't pass a selector!
        // But Zustand with no selector is discouraged, though it works.
        // Let's just replace useGlobalContext() with useResumeStore()
        content = content.replace(/useGlobalContext\(\)/g, 'useResumeStore()');
        
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
