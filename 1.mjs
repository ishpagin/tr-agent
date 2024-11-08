import { readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';

async function combineFiles(inputDir, outputFile) {
  const files = await readdir(inputDir);
  let combinedContent = '';

  for (const file of files) {
    if (path.extname(file) === '.md') {
      const content = await readFile(path.join(inputDir, file), 'utf8');
      combinedContent += `# ${file}\n`;
      combinedContent += content.trim();
      combinedContent += '\n\n---\n\n';
    }
  }

  await writeFile(outputFile, combinedContent.trim(), 'utf8');
  console.log(`Все файлы объединены в ${outputFile}`);
}

combineFiles('./src', './done/TRANSLATE_ME.md')
    .catch(error => console.error('Ошибка при объединении файлов:', error));
