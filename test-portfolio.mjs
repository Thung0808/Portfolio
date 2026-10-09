import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { createServer } from 'vite';

const server = await createServer({
  mode: 'production',
  optimizeDeps: { noDiscovery: true, include: [] },
  server: { middlewareMode: true },
  appType: 'custom',
});

try {
  const { PROFILE, PROJECTS, SKILLS, EXPERIENCE, PUBLICATIONS } = await server.ssrLoadModule('/constants.ts');
  assert.equal(PROFILE.resume, '/Portfolio/PhungTrongHung_Resume.pdf');
  assert.ok(existsSync(new URL(`./public/${PROFILE.resume.split('/').pop()}`, import.meta.url)));
  assert.deepEqual(PROJECTS.map(project => project.repository), [
    'https://github.com/uef-edu/uef-lms-rag',
    'https://github.com/uef-edu/uef-office',
    'https://github.com/hungpt-uef/meeting-summarizer',
  ]);
  assert.equal(new Set(PROJECTS.map(project => project.id)).size, PROJECTS.length);
  for (const language of ['vi', 'en']) {
    assert.ok(PROFILE.role[language] && PROFILE.bio[language]);
    for (const project of PROJECTS) {
      assert.ok(project[language].role && project[language].description);
      assert.equal(project[language].highlights.length, 3);
    }
    assert.ok(EXPERIENCE.every(experience => experience[language].description));
    assert.ok(PUBLICATIONS.every(publication => publication[language].status));
  }
  assert.ok(SKILLS.every(skill => skill.technologies.length > 0 && !('level' in skill)));
  console.log('Portfolio content, bilingual data, project links, and production CV path: passed.');
} finally {
  await server.close();
}
