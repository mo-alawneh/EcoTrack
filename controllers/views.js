import path from 'path';
import { fileURLToPath } from 'url';

export const startViews = (request, response) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    response.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
};