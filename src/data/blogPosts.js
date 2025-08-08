// Simple blog dataset. You can add, edit, or remove posts here.
// Each post renders at /blog/:slug and can be opened in a new tab from the Blog list.

export const blogCategories = [
  { id: 'projects', name: 'Projects', icon: 'fas fa-folder' },
  { id: 'youtube', name: 'YouTube', icon: 'fab fa-youtube' },
  { id: 'coding', name: 'Coding', icon: 'fas fa-code' },
  { id: 'organization', name: 'Organization', icon: 'fas fa-layer-group' }
];

export const blogPosts = [
  {
    id: 1,
    slug: 'portfolio-refresh-2025',
    title: 'Portfolio Refresh: New Projects, New Look',
    category: 'projects',
    tags: ['vue', 'vite', 'design'],
    createdAt: '2025-01-01T09:00:00Z',
    excerpt:
      'A quick overview of the latest changes across my site: improved navbar, projects grid, and a new featured YouTube section.',
    content: `
      <p>I gave my site a refresh to make navigation faster and the content easier to browse.</p>
      <ul>
        <li>Horizontal navbar on desktop</li>
        <li>Featured YouTube section with carousels</li>
        <li>Projects updated with a clear “Working On” section</li>
      </ul>
      <p>More improvements coming soon.</p>
    `,
  },
  {
    id: 2,
    slug: 'strudel-live-coding-shorts',
    title: 'Strudel Live Coding: New Shorts',
    category: 'youtube',
    tags: ['shorts', 'music', 'live-coding'],
    createdAt: '2024-12-26T18:30:00Z',
    excerpt:
      'Published a few Strudel live-coding shorts. These are quick jams and experiments while I learn.',
    content: `
      <p>I added a set of Strudel shorts to the YouTube section with thumbnails and quick links.</p>
      <p>They’re a fun way to keep the momentum going while learning.</p>
    `,
  },
  {
    id: 3,
    slug: 'downloader-dev-notes',
    title: 'Working On: Cross‑Platform Downloader',
    category: 'coding',
    tags: ['python', 'gui', 'tooling'],
    createdAt: '2024-12-20T14:00:00Z',
    excerpt:
      'Notes from building a downloader with queueing, pause/resume, and a simple UI. WIP with steady progress.',
    content: `
      <p>The downloader supports queued tasks, progress tracking, and a simple interface.</p>
      <p>Next up: better error handling and a small settings panel.</p>
    `,
  },
];

export function findPostBySlug(slug) {
  return blogPosts.find((p) => p.slug === slug);
}


