import { readFile, writeFile, mkdir } from 'fs/promises';
import path from "path";

async function splitCombinedFile(combinedFile, outputDir) {
    try {
        // Проверяем и создаем директорию, если её нет
        await mkdir(outputDir, { recursive: true });

        const content = await readFile(combinedFile, 'utf8');

        const fileSections = content
            // Разделяем содержимое на файлы по заголовку `# filename.md`
            .split(/\r?\n# (.+?)\.md\r?\n/)
            // Пропускаем начальный пустой элемент
            .slice(1);

        for (let i = 0; i < fileSections.length; i += 2) {
            const filename = fileSections[i];
            // Убираем разделитель в конце
            const fileContent = fileSections[i + 1]
                .replace(/---\n*?$/g, '')
                .trim()

            await writeFile(path.join(outputDir, `${filename}.md`), fileContent, 'utf8');
            console.log(`Файл сохранён: ${filename}.md`);
        }
    } catch(error) {
        console.error('Ошибка при разделении файла:', error);
    }
}

splitCombinedFile('TRANSLATE_ME.md', './done');
