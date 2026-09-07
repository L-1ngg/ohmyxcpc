"""Inspect the published PDF artifacts, including named link destinations."""
import json
from pathlib import Path

import pymupdf
from pypdf import PdfReader

root = Path(__file__).resolve().parent.parent
directory = root / 'content/public/pdfs'
manifest = json.loads((directory / 'manifest.json').read_text())
results = []
failures = []
for target in manifest['targets']:
    path = directory / Path(target['pdf']['url']).name
    doc = pymupdf.open(path)
    reader = PdfReader(path)
    destinations = reader.named_destinations
    links = 0
    for index, page in enumerate(reader.pages):
        for annotation in page.get('/Annots', []):
            annotation = annotation.get_object()
            action = annotation.get('/A')
            destination = annotation.get('/Dest')
            if action and action.get('/S') == '/GoTo':
                destination = action.get('/D')
            if destination is None:
                continue
            destination = destination.get_object()
            if isinstance(destination, str):
                if destination not in destinations:
                    failures.append(f'{path.name}:{index + 1}: unknown destination {destination}')
                elif reader.get_destination_page_number(destinations[destination]) is None:
                    failures.append(f'{path.name}:{index + 1}: destination has no page')
            elif isinstance(destination, list):
                if not destination or reader.get_page_number(destination[0].get_object()) is None:
                    failures.append(f'{path.name}:{index + 1}: invalid destination page')
            links += 1
    fonts = set()
    for index, page in enumerate(doc):
        for font in page.get_fonts():
            fonts.add(font[3])
            if font[2] == 'Type3':
                failures.append(f'{path.name}:{index + 1}: Type3 font')
        for block in page.get_text('dict', flags=0)['blocks']:
            for line in block.get('lines', []):
                for span in line['spans']:
                    x0, y0, x1, y1 = span['bbox']
                    if x0 < -1 or y0 < -1 or x1 > page.rect.width + 1 or y1 > page.rect.height + 1:
                        failures.append(f'{path.name}:{index + 1}: text outside page: {span["text"][:60]}')
                    if '\ufffd' in span['text']:
                        failures.append(f'{path.name}:{index + 1}: replacement character')
    for _, title, page in doc.get_toc():
        if not 1 <= page <= len(doc):
            failures.append(f'{path.name}: invalid outline page for {title}')
    if target['id'] == 'all':
        text = ''.join(page.get_text() for page in doc)
        for expected in ['OhMyXCPC', 'Templates-XCPC', 'WIDA', 'Nemesis', 'SMU_inch']:
            if expected not in text:
                failures.append(f'{path.name}: missing attribution {expected}')
    results.append({'target': target['id'], 'pages': len(doc), 'outline': len(doc.get_toc()), 'internalLinks': links, 'fonts': sorted(fonts)})
    doc.close()

output = root / 'pdf/verification'
output.mkdir(parents=True, exist_ok=True)
(output / 'pdf-checks.json').write_text(json.dumps({'results': results, 'failures': failures}, ensure_ascii=False, indent=2) + '\n')
print(json.dumps({'pdfs': len(results), 'pages': sum(item['pages'] for item in results), 'failures': failures}, ensure_ascii=False))
raise SystemExit(bool(failures))
