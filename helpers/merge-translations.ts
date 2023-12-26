import fs from 'fs';

export function mergeTranslations(language = 'en') {
	const json: Record<string, object> = {};
	const dir = fs.readdirSync(process.cwd() + `/locales/${language}/`);
	for (const filename of dir) {
		if (filename.endsWith('.json')) {
			const namespace = filename.replace('.json', '');
			const jsonFile = fs.readFileSync(process.cwd() + `/locales/${language}/${filename}`, 'utf-8');
			const jsonParsed = JSON.parse(jsonFile) as object;

			json[namespace] = jsonParsed;
		}
	}

	return json;
}
